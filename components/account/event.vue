<template>
  <div class="event">
    <template v-if="player.isPlayer() && event.event_type.name === 'player'">
      <router-link
        class="pull-left"
        :to="`/player/info/${player.id}`"
      >
        <img :src="player.getImagePath()">
      </router-link>
    </template>
    <template v-else-if="player && !player.isPlayer()">
      <img
        class="pull-left"
        :src="player.getImagePath()"
      >
    </template>
    <template v-else-if="event.event_type.name === 'bank'">
      <img
        class="pull-left"
        src="/images/buildings/bank.png"
      >
    </template>

    <div class="event-body">
      <span class="event-meta pull-right">{{ $moment(event.created_at).format('lll') }}</span>
      <h4 class="event-title">
        <template v-if="event.event_type.name === 'player'">
          <strong v-if="isReceived">
            {{ $t('events.event.received', {name: getPlayer(event.player).getDisplayName()}) }}
          </strong>
          <template v-else>
            {{ player.getDisplayName() }}
          </template>
        </template>
        <strong v-else-if="event.event_type.name === 'bank'">{{ $t('game.bank.event.name') }}</strong>
      </h4>
      <p class="summary">
        <template v-if="event.event_type.name === 'player'">
          {{ getPlayer(event.player).getDisplayName() }}
        </template>

        {{ $t(event.message, event.parameters) }}
      </p>
    </div>
  </div>
</template>

<script>
  import Players from '~/components/mixins/players';

  export default {
    mixins: [Players],
    props: {
      event: {
        type: Object,
        required: true,
      },
      target: {
        type: Object,
        required: false,
        default: () => {},
      },
      isReceived: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      player() {
        return this.getPlayer(this.target);
      },
    },
  };
</script>
