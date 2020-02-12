<template>
  <div>
    <template v-if="type === 'teleport'">
      <template
        v-for="move in availableMoves"
        v-if="me.forbidden_teleport !== move"
      >
        <a
          :key="move"
          href="#"
          @click.prevent="runAction('teleport', move)"
        >
          {{ $t('game.teleport.link', {where: $t(`game.teleport.where.${move}`)}) }}
        </a>
        <br :key="move" />
      </template>
    </template>

    <template v-if="type === 'shop'">
      <div
        class="text-left"
        v-html="$t('game.shop.text', {player: me.name, name: building.name})"
      />
      <Table
        :columns="shopColumns()"
        :data="objects"
        width="630"
        stripe
        border
      />
    </template>

    <template v-if="type === 'wanted'">
      <div
        class="text-left"
        v-html="$t('game.wanted.text', {player: me.name, name: building.name, minimalAmount: objects.minimalAmount})"
      />

      <p v-if="me.zeni < objects.minimalAmount">
        {{ $t('game.wanted.not.enough.zeni') }}
      </p>
      <form
        @submit.prevent="wanted(wantedTarget, wantedBounty)"
        v-else
      >
        <div class="form-group row">
          <label for="amount" class="col-sm-4 col-form-label">{{ $t('game.wanted.amount') }}</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="amount"
              placeholder="0"
              name="amount"
              v-model="wantedBounty"
            >
          </div>
        </div>
        <div class="form-group row">
          <label for="target" class="col-sm-4 col-form-label">{{ $t('game.wanted.target') }}</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="target"
              name="target"
              v-model="wantedTarget"
            >
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-default"
        >
          {{ $t('form.wanted.setprice') }}
        </button>
      </form>
    </template>

    <template v-if="type === 'bank'">
      <div
        class="text-left"
        v-html="$t('game.bank.text', {name: building.name, goldBar: goldBar})"
      />

      <p v-html="$t('game.bank.deposit')" />
      <Input
        v-model="depositAmount"
        number
      >
      <Button
        slot="append"
        icon="archive"
        @click.prevent="runAction('deposit', depositAmount)"
      />
      </Input>

      <p v-html="$t('game.bank.withdraw')" />
      <Input
        v-model="withdrawAmount"
        number
      />
      <Button
        slot="append"
        icon="upload"
        @click.prevent="runAction('withdraw', withdrawAmount)"
      />
      </Input>
    </template>
    <template v-if="type ==='magic'">
      <div
        class="text-left"
        v-html="$t('game.magic.text', {player: me.name, name: building.name})"
      />

      <Table
        :columns="shopSpellColumns()"
        :data="objects"
        width="630"
        stripe
        border
      />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import {EventBus} from '~/lib/bus';
  import {isEmpty} from '~/lib/utils';
  import Wanted from '~/lib/wanted';
  import Requirements from '~/components/utils/requirements';
  import ObjectDescription from '~/components/object/description';
  import MessagesMixin from '~/components/mixins/messages';
  import api from '~/services/api';

  export default {
    mixins: [
      MessagesMixin,
    ],
    props: {
      building: {
        type: Object,
        required: true,
      },
      objects: {
        type: [Array, Object],
        required: false,
        default: () => [],
      },
      me: {
        type: Object,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        availableMoves: ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'],
        withdrawAmount: 0,
        depositAmount: 0,
        goldBank: this.objects.zeni,
        wantedTarget: '',
        wantedBounty: 0,
      };
    },
    computed: {
      goldBar() {
        return !isEmpty(this.goldBank) ? this.goldBank : 0;
      },
    },
    methods: {
      async runAction(what, data) {
        let errorMessage;
        let successMessage;
        switch (what) {
        case 'buy':
          await api.buyObject(this.building.id, data).then((res) => {
            successMessage = this.handleMessages(res.data);
            this.$store.dispatch('fetchPlayer');
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
          break;
        case 'buySpell':
          await api.buySpell(this.building.id, data).then((res) => {
            successMessage = this.handleMessages(res.data);
            this.$store.dispatch('fetchPlayer');
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
          break;
        case 'teleport':
          await api.teleport(this.building.id, data).then(() => {
            EventBus.$emit('reload-map');
            this.$store.dispatch('fetchPlayer');
          }).catch(() => {
            errorMessage = this.$t('error.teleport.forbidden');
          });
          break;
        case 'deposit':
          await api.deposit(this.building.id, data).then((res) => {
            successMessage = this.handleMessages(res.data);
            this.$store.dispatch('fetchPlayer');
            this.goldBank = res.data.parameters.goldBank;
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
          break;
        case 'withdraw':
          await api.withdraw(this.building.id, data).then((res) => {
            successMessage = this.handleMessages(res.data);
            this.$store.dispatch('fetchPlayer');
            this.goldBank = res.data.parameters.goldBank;
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
          break;
        default:
          return;
        }

        if (successMessage) {
          this.$Notice.success({
            title: this.$t('notice.success'),
            desc: successMessage,
          });
        }

        if (errorMessage) {
          this.$Notice.error({
            title: this.$t('notice.error'),
            desc: errorMessage,
          });
        }
      },

      shopColumns() {
        return [
          {
            align: 'center',
            width: 90,
            render: (h, params) => h(
              'div',
              {
                domProps: {
                  innerHTML: `<img src="/images/objects/${params.row.image}"/>`,
                },
              },
            ),
          },
          {
            title: this.$t('object.description'),
            key: 'description',
            render: (h, params) => h(
              'div',
              [
                h(
                  'p',
                  [
                    h(
                      'strong',
                      params.row.name,
                    ),
                  ],
                ),
                h(
                  ObjectDescription,
                  {
                    props: {
                      object: params.row,
                    },
                  },
                ),
              ],
            ),
          },
          {
            title: this.$t('object.price'),
            width: 80,
            key: 'price',
            align: 'center',
          },
          {
            title: this.$t('object.weight'),
            width: 65,
            key: 'weight',
            align: 'center',
          },
          {
            title: this.$t('object.action'),
            width: 90,
            align: 'center',
            render: (h, params) => h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.runAction('buy', params.row.id);
                  },
                },
              },
              this.$t('building.shop.buy'),
            ),
          },
        ];
      },
      shopSpellColumns() {
        return [
          {
            title: this.$t('object.name'),
            align: 'center',
            width: 150,
            render: (h, params) => h(
              'strong',
              this.$t(`spells.${params.row.name}.name`),
            ),
          },
          {
            title: this.$t('object.description'),
            key: 'description',
            render: (h, params) => h(
              'div',
              [
                this.$t(`spells.${params.row.name}.descriptionRp`),
                h(
                  Requirements,
                  {
                    props: {
                      data: params.row.requirements,
                    },
                  },
                ),
              ],
            ),
          },
          {
            title: this.$t('object.price'),
            width: 70,
            key: 'price',
            align: 'center',
          },
          {
            title: this.$t('object.action'),
            width: 90,
            align: 'center',
            render: (h, params) => h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.runAction('buySpell', params.row.id);
                  },
                },
              },
              this.$t('building.shop.buy'),
            ),
          },
        ];
      },

      wanted(wantedTarget, wantedBounty){
        const bounty = new Wanted(wantedTarget, wantedBounty);

        api.wanted(this.building.id, bounty).then((res) => {
            successMessage = this.handleMessages(res.data);
            this.$store.dispatch('fetchPlayer');
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
      },
    },
  };
</script>
