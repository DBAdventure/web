<template>
  <div id="guild">
    <h1 class="title title-default">
      {{ $t('guilds') }}
    </h1>

    <Table
      :columns="guildsColumns()"
      :data="guildsData()"
    />

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
        <Button @click.prevent="join(selectedGuild.id)">
          {{ $t('guild.join') }}
        </Button>
      </div>
      <h2 class="little-title">
        {{ $t('guild.membersList') }}
      </h2>
      <Table
        :columns="guildPlayersColumns()"
        :data="selectedGuildPlayers"
      />
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
      guildsColumns() {
        const columns = [
          {
            title: this.$t('name'),
            key: 'name',
          },
          {
            title: this.$t('guild.shortName'),
            key: 'short_name',
          },
          {
            title: this.$t('guild.buttons.view'),
            width: 75,
            render: (h, params) => h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.selectGuild(params.row);
                  },
                },
              },
              this.$t('guild.buttons.view'),
            ),
          },
        ];

        if (!this.currentPlayer.guild_player) {
          columns.push({
            title: this.$t('guild.buttons.join'),
            render: (h, params) => h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.joinGuild(params.row.id);
                  },
                },
              },
              this.$t('guild.buttons.join'),
            ),
          });
        }

        return columns;
      },
      guildsData() {
        return this.guilds;
      },
      guildPlayersColumns() {
        return [
          {
            title: this.$t('name'),
            render: (h, params) => h(
              'router-link',
              {
                props: {
                  to: `/player/info/${params.row.id}`,
                },
                domProps: {
                  innerHTML: `<img src="${params.row.image_path}"/> ${params.row.name}`,
                },
              },
            ),
          },
          {
            title: this.$t('level'),
            key: 'level',
            width: 70,
            align: 'center',
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
          this.$Notice.success({
            title: this.$t('notice.success'),
            desc: this.$t('guild.request.created'),
          });
          this.$router.push('/guild');
        }).catch(() => {
          this.$Notice.error({
            title: this.$t('notice.error'),
            desc: this.$t('notice.generic'),
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
