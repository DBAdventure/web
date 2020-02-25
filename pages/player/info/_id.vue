<template>
  <div>
    <h1 class="title title-default">
      {{ $t('miscellaneous.title') }}
    </h1>

    <div class="pull-left">
      <img
        :src="target.getInventoryImagePath()"
        :alt="target.getDisplayName()"
        :title="target.getDisplayName()"
      >
    </div>
    <div class="player-stats pull-right">
      <h2>Infos principales</h2>

      <p
        class="pull-right"
        v-if="$store.state.player.connected"
      >
        <router-link :to="{path: '/account/inbox', query: {write: target.id}}">
          <img
            :src="target.getActionImagePath('write')"
            :alt="$t('inbox.write')"
            :title="$t('inbox.write')"
          >
        </router-link>
      </p>

      <p v-html="$t('miscellaneous.name', {name: target.getDisplayName()})" />

      <p
        v-if="target.side"
        v-html="$t('miscellaneous.side', {side: $t(target.side.name), sideClass: target.side.name})"
      />
      <p
        v-if="target.race"
        v-html="$t('miscellaneous.race', {race: $t(target.race.name), raceClass: target.race.name})"
      />
      <p
        v-if="target.level"
        v-html="$t('miscellaneous.level', {level: target.level})"
      />

      <p v-if="target.target">
        {{ $t('miscellaneous.search') }}
        <router-link :to="`/player/info/${target.target.id}`">
          {{ target.target.getDisplayName() }}
        </router-link>
      </p>
      <p
        v-if="target.last_login"
        v-html="$t('miscellaneous.lastConnection', {date: $moment(target.last_login).format('ll') })"
      />

      <h2>{{ $t('miscellaneous.killed.all') }}</h2>
      <p v-html="$t('miscellaneous.killed.good', {nb: target.nb_kill_good})" />
      <p v-html="$t('miscellaneous.killed.bad', {nb: target.nb_kill_bad})" />
      <p v-html="$t('miscellaneous.killed.npc', {nb: target.nb_kill_npc})" />

      <template v-if="target.history">
        <h2>Histoire</h2>
        <p>{{ target.history })</p>
      </template>
    </div>
  </div>
</template>

<script>
  import Player from '~/lib/player';
  import api from '~/services/api';

  export default {
    head() {
      return {
        title: this.$t('miscellaneous.title'),
      };
    },
    data() {
      return {
        target: {},
        selectedPlayer: null,
      };
    },
    created() {
      this.target = new Player(this.selectedPlayer);
    },
    asyncData({params, error}) {
      return api.getPlayerInfo(params.id).then((res) => ({
        selectedPlayer: res.data.player,
      })).catch(() => {
        error({
          message: 'error.not.found.player',
          statusCode: 404,
        });
      });
    },
  };
</script>
