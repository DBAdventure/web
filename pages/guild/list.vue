<template>
  <div id="guild">
    <h1 class="title title-default">
      {{ $t('guilds') }}
    </h1>

    <b-table
      :fields="getGuildsColumns()"
      :items="guildsData()"
    >
      <template v-slot:cell(view)="data">
        <b-button
          variant="primary"
          size="sm"
          @click="selectGuild(data.item)"
        >
          {{ $t('guild.buttons.view') }}
        </b-button>
      </template>

      <template v-slot:cell(join)="data">
        <b-button
          variant="primary"
          size="sm"
          @click="joinGuild(data.item.id)"
        >
          {{ $t('guild.buttons.join') }}
        </b-button>
      </template>
    </b-table>

    <div
      v-if="selectedGuild"
      class="guild-description"
    >
      <h1 class="subtitle text-center">
        {{ selectedGuild.shortName }} {{ selectedGuild.name }}
      </h1>
      <div class="creator">
        <p>
          {{ $t('guild.createdBy') }}
          <router-link :to="`/player/info/${getPlayer(selectedGuild.created_by).id}`">
            <img :src="getPlayer(selectedGuild.created_by).getImagePath()">
            {{ selectedGuild.created_by.name }}
          </router-link>
        </p>
      </div>

      <h2 class="little-title">
        {{ $t('guild.history') }}
      </h2>
      <template v-for="(line, index) in selectedGuild.history.split('\n')">
        {{ line }}
        <br :key="index">
      </template>

      <div v-if="!currentPlayer.guild_player">
        <b-button
          variant="primary"
          size="sm"
          @click.prevent="joinGuild(selectedGuild.id)"
        >
          {{ $t('guild.join') }}
        </b-button>
      </div>

      <h2 class="little-title">
        {{ $t('guild.membersList') }}
      </h2>

      <b-table
        :fields="getGuildPlayersColumns()"
        :items="selectedGuildPlayers"
      >
        <template v-slot:cell(name)="data">
          <router-link
            :to="`/player/info/${data.item.id}`"
          >
            <img :src="`${data.item.image_path}`" />
            {{ data.value }}
          </router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import api from '~/services/api';
  import PlayersMixin from '~/components/mixins/players';

  export default {
    middleware: 'auth',
    mixins: [
      PlayersMixin,
    ],
    head() {
      return {
        title: this.$t('guild.join'),
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    data() {
      return {
        selectedGuild: null,
        selectedGuildPlayers: [],
        guilds: [],
      };
    },
    methods: {
      getGuildsColumns() {
        const columns = [
          {
            label: this.$t('name'),
            key: 'name',
          },
          {
            label: this.$t('guild.shortName'),
            key: 'short_name',
          },
          {
            label: this.$t('guild.buttons.view'),
            key: 'view',
          },
        ];

        if (!this.currentPlayer.guild_player) {
          columns.push({
            label: this.$t('guild.buttons.join'),
            key: 'join',
          });
        }

        return columns;
      },
      guildsData() {
        return this.guilds;
      },
      getGuildPlayersColumns() {
        return [
          {
            label: this.$t('name'),
            key: 'name',
          },
          {
            label: this.$t('level'),
            key: 'level',
          },
        ];
      },
      selectGuild(guild) {
        this.selectedGuildPlayers = [];
        if (this.selectedGuild && guild.id === this.selectedGuild.id) {
          this.selectedGuild = null;
        } else {
          guild.players.forEach((guildPlayer) => {
            if (guildPlayer.enabled) {
              const player = this.getPlayer(guildPlayer.player);
              const result = {
                id: player.id,
                level: player.level,
                name: player.name,
                image_path: player.getImagePath(),
              };

              this.selectedGuildPlayers.push(result);
            }
          });
          this.selectedGuild = guild;
        }
      },
      joinGuild(id) {
        api.joinGuild(id).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('guild.request.created'),
          });
          this.$router.push('/guild');
        }).catch(() => {
          this.$notify({
            group: 'error',
            title: this.$t('notice.error'),
            text: this.$t('notice.generic'),
          });
        });
      },
    },
    asyncData({store}) {
      if (!store.state.player.connected) {
        return {};
      }

      return api.getGuilds().then((res) => (
        {
          guilds: res.data.guilds,
        }
      )).catch(() => {});
    },
  };
</script>
