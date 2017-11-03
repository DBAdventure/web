<template>
    <div id="guild">
        <h1 class="title title-default">{{ currentPlayer.getGuild().name }}</h1>

        <guild-menu />

        <table class="table table-filter">
            <tbody>
                <tr v-for="event in events.target">
                    <td>
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
                                <span class="event-meta pull-right">{{ $moment(event.created_at).format('lll') }}</span>
                                <h4 class="event-title">
                                    <template v-if="event.event_type.name === 'player'">
                                        <strong v-if="isReceived">{{ displayPlayerName(event.player) }} received:</strong>
                                        <template v-else>
                                            {{ player.getDisplayName() }}
                                        </template>
                                    </template>
                                    <strong v-else-if="event.event_type.name === 'bank'">{{ $t('game.bank.event.name') }}</strong>
                                </h4>
                                <p class="summary">
                                    <template v-if="event.event_type.name === 'player'">
                                        {{ displayPlayerName(event.player) }}
                                    </template>

                                    {{ $t(event.message, event.parameters) }}
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/ecmascript-6">
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
                guildEvents: [],
            };
        },
        async mounted() {
            await api.getGuildEvents().then((res) => {
                res.data.players.forEach((guildPlayer) => {
                    const player = this.getPlayer(guildPlayer.player);
                    const result = {
                        id: player.id,
                        level: player.level,
                        name: player.name,
                        rank_name: guildPlayer.rank.name,
                        image_path: player.getImagePath(),
                        zeni: guildPlayer.zeni,
                        location: `${this.$t(guildPlayer.player.map.name)} ( ${guildPlayer.player.x} / ${guildPlayer.player.y})`,
                    };

                    this.guildEvents.push(result);
                });
            });
        },
    };
</script>
