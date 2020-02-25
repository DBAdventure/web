<template>
  <div id="guild">
    <h1 class="title title-default">
      {{ currentPlayer.getGuild().name }}
    </h1>

    <guild-menu />

    <h1 class="subtitle text-center">
      {{ $t('guild.title.members') }}
    </h1>
    <b-table
      :fields="getMembersColumns()"
      :items="getGuildPlayers"
    >
      <template v-slot:cell(name)="data">
        <router-link :to="`/player/info/${data.item.id}`">
          <img :src="data.item.image_path"/>
          {{ data.value }}
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import api from '~/services/api';
  import PlayerMixin from '~/components/mixins/players';
  import GuildMenu from '~/components/guild/menu';

  export default {
    middleware: [
      'auth',
      'guild',
    ],
    mixins: [
      PlayerMixin,
    ],
    components: {
      GuildMenu,
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    head() {
      return {
        title: this.currentPlayer.getGuild().name,
      };
    },
    data() {
      return {
        getGuildPlayers: [],
      };
    },
    async mounted() {
      await api.getGuildMembers().then((res) => {
        res.data.players.forEach((guildPlayer) => {
          const player = this.getPlayer(guildPlayer.player);
          const result = {
            id: player.id,
            level: player.level,
            name: player.name,
            rank_name: guildPlayer.rank.name,
            image_path: player.getImagePath(),
            zeni: guildPlayer.zeni,
            location: `${guildPlayer.player.map.name} ( ${guildPlayer.player.x} / ${guildPlayer.player.y})`,
          };

          this.getGuildPlayers.push(result);
        });
      });
    },
    methods: {
      getMembersColumns() {
        return [
          {
            label: this.$t('name'),
            key: 'name',
          },
          {
            label: this.$t('level'),
            key: 'level',
          },
          {
            label: this.$t('guild.rank'),
            key: 'rank_name',
          },
          {
            label: this.$t('guild.stats.zeni'),
            key: 'zeni',
          },
          {
            label: this.$t('guild.stats.location'),
            key: 'location',
          },
        ];
      },
    },
  };
</script>
