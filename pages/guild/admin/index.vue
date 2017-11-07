<template>
    <div id="guild">
        <h1 class="title title-default">{{ currentPlayer.getGuild().name }}</h1>

        <guild-menu />

        <h1 class="subtitle text-center">{{ $t('guild.admin.title') }}</h1>
        <ul>
            <li>
                <a href="#">{{ $t('guild.admin.menu.requester') }}</a>
            </li>
            <li>
                <a href="#">{{ $t('guild.admin.menu.fired') }}</a>
            </li>

            <template v-if="currentPlayer.getGuildRank() === settings.guild.ROLE_ADMIN">
                <li>
                    <a href="#">{{ $t('guild.admin.menu.rank') }}</a>
                </li>
                <li>
                    <a href="#">{{ $t('guild.admin.menu.general') }}</a>
                </li>
            </template>
        </ul>


        <!-- Fired -->
        <Table :columns="guildPlayersColumns()" :data="selectedGuildPlayers"></Table>
        <!-- <table class="table table-stripped">
             <thead>
             <tr>
             <th>{{ 'name' | trans }}</th>
             <th>{{ 'level' | trans }}</th>
             <th>{{ 'guild.rank' | trans }}</th>
             <th>{{ 'guild.stats.location' | trans }}</th>
             <th>{{ 'guild.action' | trans }}</th>
             </tr>
             </thead>
             <tbody>
             <tr>
             <td>
             <router-link class="pull-left" :to="`/player/info/${player.id}`"><img :src="guildPlayer.player.getImagePath()" /></router-link>
             </td>
             <td>{{ guildPlayer.player.level }}</td>
             <td>{{ guildPlayer.rank.name }}</td>
             <td>{{ guildPlayer.player.map.name | trans }} ( {{ guildPlayer.player.x }} / {{ guildPlayer.player.y }} )</td>
             <td>
             <!-- <a href="{{ path('guild.admin.fired', {"id": guildPlayer.id}) }}">{{ 'guild.admin.player.fired' | trans }}</a> -->
        <!-- </td>
             </tr>
             </tbody>
             </table> -->
        <!-- Requester -->
        <!-- <table class="table table-stripped">
             <thead>
             <tr>
             <th>{{ 'name' | trans }}</th>
             <th>{{ 'level' | trans }}</th>
             <th>{{ 'guild.stats.location' | trans }}</th>
             <th>{{ 'guild.action' | trans }}</th>
             </tr>
             </thead>
             <tbody>
             <tr>
             <td>
             <router-link class="pull-left" :to="`/player/info/${player.id}`"><img :src="guildPlayer.player.getImagePath()" /></router-link>
             </td>
             <td>{{ guildPlayer.player.level }}</td>
             <td>{{ guildPlayer.player.map.name | trans }} ( {{ guildPlayer.player.x }} / {{ guildPlayer.player.y }} )</td>
             <td>
             <!-- <a href="{{ path('guild.admin.requester.decision', {"id": guildPlayer.id, "decision": "accept"}) }}">{{ 'guild.admin.player.request.accept' | trans }}</a>
             <a href="{{ path('guild.admin.requester.decision', {"id": guildPlayer.id, "decision": "decline"}) }}">{{ 'guild.admin.player.request.decline' | trans }}</a> -->
        <!-- </td>
             </tr>
             </tbody>
             </table> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import settings from '~/config/general.config';
    import api from '~/services/api';
    import PlayersMixin from '~/components/mixins/players';
    import GuildMenu from '~/components/guild/menu';

    export default {
        middleware: 'auth',
        mixins: [
            PlayersMixin,
        ],
        components: {
            GuildMenu,
        },
        head() {
            if (this.currentPlayer.guild_player && this.currentPlayer.getGuild()) {
                return {
                    title: this.currentPlayer.getGuild().name,
                };
            }

            return {
                title: this.$t('guild'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                settings,
                selectedGuild: null,
                selectedGuildPlayers: [],
                guilds: [],
            };
        },
        methods: {
            guildPlayersColumns() {
                return [
                    {
                        title: this.$t('name'),
                        render: (h, params) => h(
                            'router-link',
                            {
                                props: {
                                    to: `/player/info/${params.row.id}`,
                                },
                                domProps: {
                                    innerHTML: `<img src="${params.row.image_path}"/> ${params.row.name}`,
                                },
                            },
                        ),
                    },
                    {
                        title: this.$t('level'),
                        key: 'level',
                        width: 70,
                        align: 'center',
                    },
                ];
            },
            async getRequesters() {
                this.guildPlayers = {};
                await api.getGuildRequesters().then((res) => {
                    res.data.players.forEach((guildPlayer) => {
                        const player = this.getPlayer(guildPlayer.player);
                        const result = {
                            id: player.id,
                            level: player.level,
                            name: player.name,
                            image_path: player.getImagePath(),
                        };

                        this.guildPlayers.push(result);
                    });
                });

                return this.guildPlayers;
            },
        },
    };
</script>
