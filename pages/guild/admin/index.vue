<template>
  <div id="guild">
    <h1 class="title title-default">
      {{ currentPlayer.getGuild().name }}
    </h1>

    <guild-menu />

    <h1 class="subtitle text-center">
      {{ $t('guild.admin.title') }}
    </h1>
    <ul>
      <li>
        <a
          href="#"
          @click.prevent="getRequesters()"
        >{{ $t('guild.admin.menu.requester') }}</a>
      </li>
      <li>
        <a
          href="#"
          @click.prevent="getMembers()"
        >{{ $t('guild.admin.menu.fired') }}</a>
      </li>
      <li>
        <a
          href="#"
          @click.prevent="manageSettings()"
        >{{ $t('guild.admin.menu.settings') }}</a>
      </li>

      <template v-if="currentPlayer.getGuildRank() === settings.guild.ROLE_ADMIN">
        <li>
          <a
            href="#"
            @click.prevent="manageRanks()"
          >{{ $t('guild.admin.menu.rank') }}</a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="manageGenerals()"
          >{{ $t('guild.admin.menu.general') }}</a>
        </li>
      </template>
    </ul>

    <h1
      v-if="page"
      class="subtitle text-center"
    >
      {{ $t(`guild.admin.titles.pages.${page}`) }}
    </h1>

    <template v-if="page === pages.requesters || page === pages.members || page === pages.general">
      <b-table
        :fields="getGuildPlayersColumns()"
        :items="guildPlayers"
      >
        <template v-slot:cell(name)="data">
          <router-link :to="`/player/info/${data.item.id}`">
            <img :src="data.item.image_path" />
            {{ data.value }}
          </router-link>
        </template>

        <template v-slot:cell(action-accept)="data">
          <b-button
            variant="primary"
            size="sm"
            @click="runAction('accept', data.item)"
          >
            {{ $t('guild.admin.player.request.accept') }}
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="runAction('decline', data.item)"
          >
            {{ $t('guild.admin.player.request.decline') }}
          </b-button>
        </template>

        <template v-slot:cell(action-fired)="data">
          <b-button
            variant="danger"
            size="sm"
            @click="runAction('fired', data.item)"
          >
            {{ $t('guild.admin.player.fired') }}
          </b-button>
        </template>

        <template v-slot:cell(action)="data">
          <b-button-group>
            <b-modal
              hide-header
              @ok="runAction(settings.guild.ROLE_PLAYER, data.item)"
              :id="`role-player-${data.item.id}`"
            >
              {{ $t('modal.confirm.title') }}
            </b-modal>

            <b-button
              variant="info"
              size="sm"
              :disabled="data.item.rank.role === settings.guild.ROLE_PLAYER"
              v-b-modal="`role-player-${data.item.id}`"
            >
              {{ ranks[settings.guild.ROLE_PLAYER] }}
            </b-button>

            <b-modal
              @ok="runAction(settings.guild.ROLE_MODO, data.item)"
              :id="`role-modo-${data.item.id}`"
            >
              {{ $t('modal.confirm.title') }}
            </b-modal>

            <b-button
              variant="warning"
              size="sm"
              :disabled="data.item.rank.role === settings.guild.ROLE_MODO"
              v-b-modal="`role-modo-${data.item.id}`"
            >
              {{ ranks[settings.guild.ROLE_MODO] }}
            </b-button>

            <b-modal
              @ok="runAction(settings.guild.ROLE_ADMIN, data.item)"
              :id="`role-admin-${data.item.id}`"
            >
              {{ $t('modal.confirm.title') }}
            </b-modal>

            <b-button
              variant="danger"
              size="sm"
              :disabled="data.item.rank.role === settings.guild.ROLE_ADMIN"
              v-b-modal="`role-admin-${data.item.id}`"
            >
              {{ ranks[settings.guild.ROLE_ADMIN] }}
            </b-button>
          </b-button-group>
        </template>
      </b-table>
    </template>

    <template v-if="page === pages.settings">
      <b-form>
        <b-form-group
          :label="$t('form.history')"
          :label-cols-lg="3"
        >
          <b-form-textarea
            v-model="guild.history"
            :autosize="{minRows: 2,maxRows: 8}"
            :class="{ 'is-invalid': submitted && $v.guild.history.$error }"
          />
          <div
            v-if="submitted && !$v.guild.history.required"
            class="invalid-feedback"
          >
            {{ $t('form.required') }}
          </div>
        </b-form-group>
        <b-form-group
          :label="$t('form.message')"
          :label-cols-lg="3"
        >
          <b-form-textarea
            v-model="guild.message"
            :autosize="{minRows: 2,maxRows: 8}"
          />
        </b-form-group>
        <b-button
          variant="primary"
          @click.prevent="handleSettingsSubmit()"
          block
        >
          {{ $t('save') }}
        </b-button>
      </b-form>
    </template>

    <template v-if="page === pages.ranks">
      <b-form>
        <b-form-group
          :label="$t('form.ranks.player')"
          :label-cols-lg="3"
        >
          <b-form-input
            v-model="ranks.ROLE_PLAYER"
            :class="{ 'is-invalid': submitted && $v.guild.history.$error }"
          />
          <div
            v-if="submitted && !$v.guild.history.required"
            class="invalid-feedback"
          >
            {{ $t('form.required') }}
          </div>
          <div
            v-if="submitted && !$v.guild.history.isUniq"
            class="invalid-feedback"
          >
            {{ $t('form.mustBeUniq') }}
          </div>
        </b-form-group>
        <b-form-group
          :label="$t('form.ranks.modo')"
          :label-cols-lg="3"
        >
          <b-form-input
            v-model="ranks.ROLE_MODO"
            :class="{ 'is-invalid': submitted && $v.guild.history.$error }"
          />
          <div
            v-if="submitted && !$v.guild.history.required"
            class="invalid-feedback"
          >
            <span v-if="!$v.player.email.required">{{ $t('form.required') }}</span>
            <span v-if="!$v.player.email.email">{{ $t('form.invalidEmail') }}</span>
          </div>
        </b-form-group>
        <b-form-group
          :label="$t('form.ranks.admin')"
          :label-cols-lg="3"
        >
          <b-form-input
            v-model="ranks.ROLE_ADMIN"
            :class="{ 'is-invalid': submitted && $v.guild.history.$error }"
          />
          <div
            v-if="submitted && !$v.guild.history.required"
            class="invalid-feedback"
          >
            <span v-if="!$v.player.email.required">{{ $t('form.required') }}</span>
            <span v-if="!$v.player.email.email">{{ $t('form.invalidEmail') }}</span>
          </div>
        </b-form-group>
        <b-button
          variant="primary"
          @click.prevent="handleRanksSubmit()"
          block
        >
          {{ $t('save') }}
        </b-button>
      </b-form>
    </template>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {mapGetters} from 'vuex';
  import {
    not,
    required,
    sameAs,
  } from 'vuelidate/lib/validators';
  import settings from '~/config/general.config';
  import api from '~/services/api';
  import MessagesMixin from '~/components/mixins/messages';
  import PlayersMixin from '~/components/mixins/players';
  import GuildMenu from '~/components/guild/menu';

  export default {
    middleware: 'auth',
    mixins: [
      MessagesMixin,
      PlayersMixin,
    ],
    components: {
      GuildMenu,
    },
    head() {
      if (this.currentPlayer.guild_player && this.currentPlayer.getGuild()) {
        return {
          title: this.currentPlayer.getGuild().name,
        };
      }

      return {
        title: this.$t('guild'),
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    data() {
      return {
        settings,
        submitted: false,
        guildPlayers: [],
        page: null,
        pages: {
          requesters: 1,
          members: 2,
          ranks: 3,
          general: 4,
          settings: 5,
        },
        guild: {
          history: '',
          message: '',
        },
        ranks: {
          ROLE_PLAYER: '',
          ROLE_MODO: '',
          ROLE_ADMIN: '',
        },
      };
    },
    validations: {
      guild: {
        history: {required},
      },
      ranks: {
        ROLE_PLAYER: {
          required,
          isUniq: not(sameAs('ROLE_MODO')) && not(sameAs('ROLE_ADMIN')),
        },
        ROLE_MODO: {
          required,
          isUniq: not(sameAs('ROLE_PLAYER')) && not(sameAs('ROLE_ADMIN')),
        },
        ROLE_ADMIN: {
          required,
          isUniq: not(sameAs('ROLE_PLAYER')) && not(sameAs('ROLE_MODO')),
        },
      },
    },
    methods: {
      getGuildPlayersColumns() {
        const columns = [
          {
            label: this.$t('name'),
            key: 'name',
          },
          {
            label: this.$t('level'),
            key: 'level',
          },
        ];

        if (this.page === this.pages.requesters) {
          columns.push({
            label: this.$t('guild.action'),
            key: 'action-accept',
          });
        }

        if (this.page === this.pages.members || this.page === this.pages.general) {
          columns.push({
            label: this.$t('guild.rank'),
            key: 'rank_name',
          });
          columns.push({
            label: this.$t('guild.stats.zeni'),
            key: 'zeni',
          });
          columns.push({
            label: this.$t('guild.stats.location'),
            key: 'location',
          });
        }

        if (this.page === this.pages.members) {
          columns.push({
            label: this.$t('guild.action'),
            key: 'action-fired',
          });
        }

        if (this.page === this.pages.general) {
          columns.push({
            label: this.$t('guild.action'),
            key: 'action',
          });
        }

        return columns;
      },

      async getRequesters() {
        this.page = this.pages.requesters;
        this.guildPlayers = [];
        await api.getGuildRequesters().then((res) => {
          res.data.players.forEach((guildPlayer) => {
            const player = this.getPlayer(guildPlayer.player);
            const result = {
              id: player.id,
              guild_player: guildPlayer.id,
              level: player.level,
              name: player.name,
              image_path: player.getImagePath(),
            };

            this.guildPlayers.push(result);
          });
        });

        return this.guildPlayers;
      },
      async getMembers() {
        this.page = this.pages.members;
        this.guildPlayers = [];
        await api.getGuildMembers().then((res) => {
          res.data.players.forEach((guildPlayer) => {
            const player = this.getPlayer(guildPlayer.player);
            if (player.id !== this.currentPlayer.id) {
              const result = {
                id: player.id,
                guild_player: guildPlayer.id,
                level: player.level,
                name: player.name,
                rank_name: guildPlayer.rank.name,
                image_path: player.getImagePath(),
                zeni: guildPlayer.zeni,
                location: `${guildPlayer.player.map.name} ( ${guildPlayer.player.x} / ${guildPlayer.player.y})`,
              };

              this.guildPlayers.push(result);
            }
          });
        });

        return this.guildPlayers;
      },

      async manageSettings() {
        this.guild.history = this.currentPlayer.getGuild().history;
        this.guild.message = this.currentPlayer.getGuild().message;
        this.page = this.pages.settings;
      },

      async manageRanks() {
        this.setRanks();
        this.page = this.pages.ranks;
      },

      setRanks() {
        const {ranks} = this.currentPlayer.getGuild();
        this.ranks[this.settings.guild.ROLE_PLAYER] = _.find(
          ranks,
          {role: this.settings.guild.ROLE_PLAYER},
        ).name;
        this.ranks[this.settings.guild.ROLE_MODO] = _.find(
          ranks,
          {role: this.settings.guild.ROLE_MODO},
        ).name;
        this.ranks[this.settings.guild.ROLE_ADMIN] = _.find(
          ranks,
          {role: this.settings.guild.ROLE_ADMIN},
        ).name;
      },

      async manageGenerals() {
        this.setRanks();
        this.page = this.pages.general;
        this.guildPlayers = [];
        await api.getGuildMembers().then((res) => {
          res.data.players.forEach((guildPlayer) => {
            const player = this.getPlayer(guildPlayer.player);
            if (player.id !== this.currentPlayer.id) {
              const result = {
                id: player.id,
                guild_player: guildPlayer.id,
                level: player.level,
                name: player.name,
                rank: guildPlayer.rank,
                rank_name: guildPlayer.rank.name,
                image_path: player.getImagePath(),
                zeni: guildPlayer.zeni,
                location: `${guildPlayer.player.map.name} ( ${guildPlayer.player.x} / ${guildPlayer.player.y})`,
              };

              this.guildPlayers.push(result);
            }
          });
        });

        return this.guildPlayers;
      },

      async runAction(what, player) {
        this.$nuxt.$loading.start();
        let errorMessage;
        let successMessage;
        switch (what) {
        case 'decline':
        case 'accept':
          await api.adminRequest(player.guild_player, what === 'accept').then((res) => {
            successMessage = this.handleMessages(res.data);
            this.$store.dispatch('fetchPlayer');
            this.getRequesters();
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
          break;
        case 'fired':
          await api.adminFired(player.guild_player).then((res) => {
            successMessage = this.handleMessages(res.data);
            this.$store.dispatch('fetchPlayer');
            this.getMembers();
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
          break;
        case this.settings.guild.ROLE_PLAYER:
        case this.settings.guild.ROLE_MODO:
        case this.settings.guild.ROLE_ADMIN:
          await api.adminGeneral(player.guild_player, {what}).then(() => {
            successMessage = this.$t('guild.admin.saved');
            this.$store.dispatch('fetchPlayer');
            this.manageGenerals();
          }).catch((err) => {
            errorMessage = this.$t(err.response.data.error);
          });
          break;
        default:
          return;
        }

        if (successMessage) {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: successMessage,
          });
          this.$nuxt.$loading.finish();
        }

        if (errorMessage) {
          this.$notify({
            group: 'error',
            title: this.$t('notice.error'),
            text: errorMessage,
          });
          this.$nuxt.$loading.error();
        }
      },

      handleSettingsSubmit() {
        this.submitted = true;
        this.$v.guild.$touch();
        if (this.$v.guild.$invalid) {
          return;
        }

        this.$nuxt.$loading.start();
        api.adminSettings({guild_settings: this.guild}).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('guild.admin.saved'),
          });
          this.$store.dispatch('fetchPlayer');
        }).catch((err) => {
          if (err.response.data.error) {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: err.response.data.error,
            });
          } else {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: this.$t('notice.generic'),
            });
          }
        });
        this.$nuxt.$loading.finish();
        this.submitted = false;
      },

      handleRanksSubmit() {
        this.submitted = true;
        this.$v.ranks.$touch();
        if (this.$v.ranks.$invalid) {
          return;
        }

        this.$nuxt.$loading.start();
        api.adminRanks({guild_ranks: this.ranks}).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('guild.admin.saved'),
          });
          this.$store.dispatch('fetchPlayer');
        }).catch((err) => {
          if (err.response.data.error) {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: err.response.data.error,
            });
          } else {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: this.$t('notice.generic'),
            });
          }
        });
        this.$nuxt.$loading.finish();
        this.submitted = false;
      },
    },
  };
</script>
