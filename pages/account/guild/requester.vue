<template>
    <div id="guild">
        <h1 class="title title-default">{{ currentPlayer.getGuild().name }}</h1>

        <guild-menu />

        <Table :columns="requestersColumns()" :data="guildPlayers"></Table>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import PlayerMixin from '~/components/mixins/players';
    import GuildMenu from '~/components/account/guild/menu';

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
                guildPlayers: [],
            };
        },
        async mounted() {
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
        },
        methods: {
            requestersColumns() {
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
        },
    };
</script>
