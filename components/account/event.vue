<template>
    <div class="event">
        <template v-if="player.isPlayer() && event.event_type.name === 'player'">
            <router-link class="pull-left" :to="`/player/info/${player.id}`"><img :src="player.getImagePath()" /></router-link>
        </template>
        <template v-else-if="player && !player.isPlayer()">
            <img class="pull-left" :src="player.getImagePath()"/>
        </template>
        <template v-else-if="event.event_type.name === 'bank'">
            <img class="pull-left" src="/images/buildings/bank.png" />
        </template>

        <div class="event-body">
            <span class="event-meta pull-right">{{ $moment(event.createdAt).format('lll') }}</span>
            <h4 class="event-title">
                <template v-if="event.event_type.name === 'player'">
                    <strong v-if="isReceived">{{ displayPlayerName(event.player) }} received:</strong>
                    <template v-else>
                        {{ player.getDisplayName() }}
                    </template>
                </template>
                <strong v-else-if="event.event_type.name === 'bank'">{{ $trans('game.bank.event.name') }}</strong>
            </h4>
            <p class="summary">
                <template v-if="event.event_type.name === 'player'">
                    {{ displayPlayerName(event.player) }}
                </template>

                {{ $trans(event.message, event.parameters) }}
            </p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Player from '~/lib/player';

export default {
    props: {
        event: {
            type: Object,
            required: true,
        },
        target: {
            type: Object,
            required: false,
        },
        isReceived: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            player: new Player(this.target),
        };
    },
    methods: {
        displayPlayerName(eventPlayer) {
            const player = new Player(eventPlayer);
            return player.getDisplayName();
        },
    },
};
</script>
