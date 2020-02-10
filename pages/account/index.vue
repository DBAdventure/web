<template>
  <div>
    <h1 class="title title-home">
      {{ $t('menu.dashboard') }}
    </h1>

    <div class="events">
      <h2 class="subtitle text-center">
        {{ $t('events.target') }}
      </h2>
      <template v-if="events.target.length === 0">
        <p class="text-center">
          {{ $t('events.nothing') }}
        </p>
      </template>
      <template v-else>
        <table class="table table-filter">
          <tbody>
            <tr
              v-for="event in events.target"
              :key="event.id"
            >
              <td>
                <player-event
                  :event="event"
                  :target="event.player"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

    <div class="events">
      <h2 class="subtitle text-center">
        {{ $t('events.player') }}
      </h2>
      <template v-if="events.player.length === 0">
        <p class="text-center">
          {{ $t('events.nothing') }}
        </p>
      </template>
      <template v-else>
        <table class="table table-filter">
          <tbody>
            <tr
              v-for="event in events.player"
              :key="event.id"
            >
              <td>
                <player-event
                  :event="event"
                  :target="event.target"
                  is-received
                />
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '~/services/api';
  import PlayerEvent from '~/components/account/event';

  export default {
    middleware: 'auth',
    head() {
      return {
        title: this.$t('account.title'),
      };
    },
    components: {
      PlayerEvent,
    },
    data() {
      return {
        events: {
          target: [],
          player: [],
        },
      };
    },
    asyncData({store}) {
      if (!store.state.player.connected) {
        return {};
      }

      return api.getEvents().then((res) => ({
        events: res.data,
      })).catch(() => {});
    },
  };
</script>
