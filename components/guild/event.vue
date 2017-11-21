<template>
    <div class="event">
        <template v-if="player.isPlayer() && event.event_type.name === 'player'">
            <router-link class="pull-left" :to="`/player/info/${player.id}`"><img :src="player.getImagePath()" /></router-link>
        </template>
        <template v-else-if="player && !player.isPlayer()">
            <img class="pull-left" :src="player.getImagePath()"/>
        </template>

        <div class="event-body">
            <span class="event-meta pull-right">{{ $moment(event.created_at).format('lll') }}</span>
            <h4 class="event-title">
                <template v-if="event.event_type.name === 'player'">
                    {{ getPlayer(event.player).name }}
                </template>
            </h4>
            <p class="summary">
                <template v-if="event.event_type.name === 'player'">
                    {{ getPlayer(event.player).name }}
                </template>

                {{ $t(event.message, event.parameters) }}
            </p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
