<template>
  <div class="account">
    <h1 class="title title-quest">
      {{ $t('account.quest.title') }}
    </h1>

    <div v-if="playerQuests.length">
      <quest-display
        v-for="playerQuest in playerQuests"
        :key="playerQuest.id"
        :quest="playerQuest.quest"
        :player-quest="playerQuest"
        :player-objects="playerObjects"
      />
    </div>
    <div v-else>
      {{ $t('game.quest.empty') }}
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import api from '~/services/api';
  import QuestDisplay from '~/components/quest/display';

  export default {
    middleware: 'auth',
    components: {
      QuestDisplay,
    },
    head() {
      return {
        title: this.$t('account.quest.title'),
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    data() {
      return {
        playerQuests: [],
        playerObjects: {},
      };
    },
    asyncData({store}) {
      if (!store.state.player.connected) {
        return {};
      }

      return api.getQuests().then((res) => ({
        playerQuests: res.data.player_quests,
        playerObjects: res.data.player_objects,
      }));
    },
  };
</script>
