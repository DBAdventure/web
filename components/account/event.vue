<template>
    <div class="event">
        <template v-if="target.isPlayer && event.event_type.name === 'player'">
            <a class="pull-left" href="{{ path('player.info', {"id": target.id}) }}" target="_blank">
                <img :src="target.imagePath" />
            </a>
        </template>
        <template v-else-if="target && !target.isPlayer">
            <img class="pull-left" :src="target.imagePath"/>
        </template>
        <template v-else-if="event.event_type.name === 'bank'">
            <img class="pull-left" src="/images/buildings/bank.png" />
        </template>

        <div class="event-body">
            <span class="event-meta pull-right">{{ $moment(event.createdAt).format('ll') }}</span>
            <h4 class="event-title">
                <template v-if="event.event_type.name === 'player'">
                    <template v-if="isReceived">
                        {{ target.displayName }}
                    </template>
                    <strong v-else>{{ event.target.displayName }} received:</strong>
                </template>
                <strong v-else-if="event.event_type.name === 'bank'">{{ $trans('game.bank.event.name') }}</strong>
            </h4>
            <p class="summary">
                <template v-if="event.event_type.name === 'player'">
                    {{ event.player.name }}
                </template>

                {{ $trans(event.message, event.parameters) }}
            </p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
};
</script>
