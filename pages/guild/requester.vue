<template>
  <div id="guild">
    <h1 class="title title-default">
      {{ currentPlayer.getGuild().name }}
    </h1>

    <guild-menu />

    <h1 class="subtitle text-center">
      {{ $t('guild.title.requesters') }}
    </h1>

    <b-table
      :fields="getRequestersColumns()"
      :items="guildPlayers"
    >
      <template v-slot:cell(name)="data">
        <router-link :to="`/player/info/${data.item.id}`">
          <img :src="data.item.image_path" />
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
        guildPlayers: [],
      };
    },
    async mounted() {
      await api.getGuildRequesters().then((res) => {
        res.data.players.forEach((guildPlayer) => {
          const player = this.getPlayer(guildPlayer.player);
          const result = {
            id: player.id,
            level: player.level,
            name: player.name,
            image_path: player.getImagePath(),
          };

          this.guildPlayers.push(result);
        });
      });
    },
    methods: {
      getRequestersColumns() {
        return [
          {
            label: this.$t('name'),
            key: 'name',
          },
          {
            title: this.$t('level'),
            key: 'level',
          },
        ];
      },
    },
  };
</script>
