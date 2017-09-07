<template>
    <div>
        <h1 class="title title-home">{{ $t('dashboard') }}</h1>

        <div class="events">
            <h2 class="subtitle text-center">
                {{ $t('events.target') }}
            </h2>
            <table class="table table-filter">
                <tbody>
                    <tr v-for="event in events.target">
                        <td>
                            <player-event :event="event" :target="event.player" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="events">
            <h2 class="subtitle text-center">
                {{ $t('events.player') }}
            </h2>
            <table class="table table-filter">
                <tbody>
                    <tr v-for="event in events.player">
                        <td>
                            <player-event :event="event" :target="event.target" is-received />
                        </td>
                    </tr>
                </tbody>
            </table>
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
        async mounted() {
            await api.getEvents().then((res) => {
                this.events = res.data;
            });
        },
    };
</script>
