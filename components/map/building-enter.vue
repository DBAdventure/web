<template>
    <div>
        <template v-if="type === 'teleport'">
            <template v-for="move in availableMoves" v-if="me.forbidden_teleport !== move">
                <a href="#" @click.prevent="runAction('teleport', move)">
                    {{ $t('game.teleport.link', {where: $t(`game.teleport.where.${move}`)}) }}
                </a>
                <br>
            </template>
        </template>

        <template v-if="type === 'shop'">
            <div class="text-left" v-html="$t('game.shop.text', {player: me.name, name: $t(`buildings.${building.name}`) })"></div>
            <Table :columns="shopColumns()" :data="objects"></Table>
        </template>

        <template v-if="type === 'wanted'">
            <div class="text-left" v-html="$t('game.wanted.text', {player: me.name, name: building.name, minimalAmount: objects.minimalAmount})"></div>

            <p v-if="me.zeni < objects.minimalAmount">{{ $t('game.wanted.not.enough.zeni') }}</p>
            <form class="form-inline" @submit.prevent="wanted()" v-else>
                <div class="form-group">
                    <label for="amount">{{ $t('game.wanted.amount') }}</label>
                    <input type="text" class="form-control" id="amount" placeholder="0" name="amount"/>
                </div>
                <div class="form-group">
                    <label for="amount">{{ $t('game.wanted.target') }}</label>
                    <input type="text" class="form-control" id="target" name="target"/>
                </div>
                <button type="submit" class="btn btn-default">{{ $t('form.wanted.setprice') }}</button>
            </form>
        </template>

        <template v-if="type === 'bank'">
            <div class="text-left" v-html="$t('game.bank.text', {player: me.name, name: building.name, goldBar: goldbar})"></div>

            <p v-html="$t('game.bank.deposit')" />
            <form class="form-inline" method="post" @submit.prevent="deposit()">
                <div class="form-group">
                    <input class="form-control" placeholder="0" type="text" name="deposit"/>
                </div>
                <button type="submit" class="btn btn-default">{{ $t('form.bank.deposit') }}</button>
            </form>

            <p v-html="$t('game.bank.withdraw')"/>
            <form class="form-inline" method="post" @submit.prevent="withdraw()">
                <div class="form-group">
                    <input class="form-control" placeholder="0" type="text" name="withdraw"/>
                </div>
                <button type="submit" class="btn btn-default">{{ $t('form.bank.withdraw') }}</button>
            </form>
        </template>
        <template v-if="type ==='magic'">
            <div class="text-left" v-html="$t('game.bank.text', {player: me.name, name: building.name})"></div>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>{{ $t('price') }}</th>
                        <th>{{ $t('requirements') }}</th>
                        <th>{{ $t('name') }}</th>
                        <th>{{ $t('description') }}</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="object in objects">
                        <td>{{ object.price }}</td>
                        <td>{{ helper.displayRequirements(object) }}</td>
                        <td>{{ $t(`$t{object.name}.name`) }}</td>
                        <td>{{ $t(`$t{object.name}.description`) }}
                            <stats :data="object.bonus" v-if="object.bonus" />
                        </td>
                        <td>
                            {% if me.hasSpell(object) %}
                            {{ $t('building.shop.already.purchased.spell') }}
                            {% elseif object.price > me.zeni %}
                            {{ $t('building.shop.no.zeni') }}
                            {% else %}
                            <a class="btn btn-default" href="{{ path('building.spell.buy', {"building_id": building.id, "spell_id": object.id})}}">{{ $t('building.shop.buy') }}</a>
                            {% endif %}
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import {isEmpty} from '~/lib/utils';
    import Stats from '~/components/objects/stats';
    import api from '~/services/api';

    export default {
        components: {
            Stats,
        },
        props: {
            building: {
                type: Object,
                required: true,
            },
            objects: {
                type: [Array, Object],
                required: false,
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
            };
        },
        computed: {
            goldBar() {
                return !isEmpty(this.objects.zeni) ? this.objects.zeni : 0;
            },
        },
        methods: {
            async runAction(what, data) {
                let errorMessage;
                let successMessage;
                switch (what) {
                    case 'buy':
                        await api.buyObject(this.building.id, data).then((res) => {
                            successMessage = res.data.message;
                            this.$store.dispatch('fetchPlayer');
                        }).catch((err) => {
                            errorMessage = err.response.data.error;
                        });
                        break;
                    case 'teleport':
                        await api.teleport(this.building.id, data).then(() => {
                            this.$store.state.game.mapReload = true;
                            this.$store.dispatch('fetchPlayer');
                        }).catch(() => {
                            errorMessage = this.$t('error.teleport.forbidden');
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
                        title: this.$t('object.name'),
                        align: 'center',
                        width: 90,
                        render: (h, params) => h(
                            'strong',
                            this.$t(`objects.${params.row.name}.name`),
                        ),
                    },
                    {
                        title: this.$t('object.price'),
                        width: 70,
                        key: 'price',
                        align: 'center',
                    },
                    {
                        title: this.$t('object.weight'),
                        width: 80,
                        key: 'weight',
                        align: 'center',
                    },
                    {
                        title: this.$t('object.description'),
                        key: 'description',
                        render: (h, params) => h(
                            'div',
                            [
                                this.$t(`objects.${params.row.name}.description`),
                                h(
                                    Stats,
                                    {
                                        props: {
                                            data: params.row.bonus,
                                        },
                                    },
                                ),
                            ],
                        ),
                    },
                    {
                        title: this.$t('object.action'),
                        width: 70,
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
        },
    };
</script>
