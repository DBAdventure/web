<template>
  <div class="text-left">
    <quest-display
      :quest="quest"
      :player-quest="playerQuest"
      :player-objects="playerObjects"
      v-model="questResult"
    />

    <b-button
      variant="primary"
      size="sm"
      v-if="playerQuest === null"
      @click.prevent="runAction('talk')"
    >
      {{ $t('game.quest.accept') }}
    </b-button>


    <b-button
      variant="primary"
      size="sm"
      v-if="playerQuest !== null && playerQuest.is_in_progress && questResult"
      @click.prevent="runAction('talk')"
    >
      {{ $t('game.quest.return') }}
    </b-button>
  </div>
</template>

<script>
  import {EventBus} from '~/lib/bus';
  import api from '~/services/api';
  import MessagesMixin from '~/components/mixins/messages';
  import QuestDisplay from '~/components/quest/display';

  export default {
    components: {
      QuestDisplay,
    },
    mixins: [
      MessagesMixin,
    ],
    props: {
      quest: {
        type: Object,
        required: true,
      },
      playerQuest: {
        type: Object,
        required: false,
        default: () => {},
      },
      playerObjects: {
        type: Object,
        required: false,
        default: () => {},
      },
    },
    data() {
      return {
        questResult: false,
      };
    },
    methods: {
      async runAction(what) {
        switch (what) {
        case 'talk':
          await api.askQuest(this.quest.id).then((res) => {
            res.data.messages.forEach((msg) => {
              this.$notify({
                group: 'success',
                title: this.$t('notice.success'),
                text: this.handleMessages(msg),
              });
            });
            EventBus.$emit('reload-map');
          }).catch((err) => {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: this.$t(err.response.data.error),
            });
          });
          break;
        default:
        }
      },
    },
  };
</script>
