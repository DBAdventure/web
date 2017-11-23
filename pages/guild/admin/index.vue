<template>
    <div id="guild">
        <h1 class="title title-default">{{ currentPlayer.getGuild().name }}</h1>

        <guild-menu />

        <h1 class="subtitle text-center">{{ $t('guild.admin.title') }}</h1>
        <ul>
            <li>
                <a href="#" @click.prevent="getRequesters()">{{ $t('guild.admin.menu.requester') }}</a>
            </li>
            <li>
                <a href="#" @click.prevent="getMembers()">{{ $t('guild.admin.menu.fired') }}</a>
            </li>
            <li>
                <a href="#" @click.prevent="manageSettings()">{{ $t('guild.admin.menu.settings') }}</a>
            </li>

            <template v-if="currentPlayer.getGuildRank() === settings.guild.ROLE_ADMIN">
                <li>
                    <a href="#" @click.prevent="manageRanks()">{{ $t('guild.admin.menu.rank') }}</a>
                </li>
                <li>
                    <a href="#" @click.prevent="manageAdmins()">{{ $t('guild.admin.menu.general') }}</a>
                </li>
            </template>
        </ul>

        <h1 v-if="page" class="subtitle text-center">{{ $t(`guild.admin.titles.pages.${page}`) }}</h1>

        <template v-if="page === pages.requester || page === pages.members">
            <Table :columns="guildPlayersColumns()" :data="guildPlayers"></Table>
        </template>
        <template v-if="page == pages.settings">
            <Form ref="settingsForm" id="settings-form" :rules="settingsRules" :model="guild" :label-width="150">
                <FormItem :label="$t('form.history')" prop="history">
                    <Input v-model="guild.history" type="textarea" :autosize="{minRows: 2,maxRows: 8}"></Input>
                </FormItem>
                <FormItem :label="$t('form.message')" prop="message">
                    <Input v-model="guild.message" type="textarea" :autosize="{minRows: 2,maxRows: 8}"></Input>
                </FormItem>
                <Button type="primary" @click.prevent="handleSettingsSubmit()" long>{{ $t('save') }}</Button>
            </Form>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import settings from '~/config/general.config';
    import api from '~/services/api';
    import MessagesMixin from '~/components/mixins/messages';
    import PlayersMixin from '~/components/mixins/players';
    import GuildMenu from '~/components/guild/menu';

    export default {
        middleware: 'auth',
        mixins: [
            MessagesMixin,
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
                guildPlayers: [],
                page: null,
                pages: {
                    requesters: 1,
                    members: 2,
                    ranks: 3,
                    admin: 4,
                    settings: 5,
                },
                guild: {
                    history: '',
                    message: '',
                },
                settingsRules: {
                    history: [
                        {type: 'string', required: true},
                    ],
                    message: [
                        {type: 'string', required: false},
                    ],
                },
            };
        },
        methods: {
            guildPlayersColumns() {
                const columns = [
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

                if (this.page === this.pages.requesters) {
                    columns.push({
                        title: this.$t('guild.action'),
                        align: 'center',
                        render: (h, params) => h(
                            'div',
                            [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.runAction('accept', params.row);
                                            },
                                        },
                                    },
                                    this.$t('guild.admin.player.request.accept'),
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.runAction('decline', params.row);
                                            },
                                        },
                                    },
                                    this.$t('guild.admin.player.request.decline'),
                                ),
                            ],
                        ),
                    });
                }

                if (this.page === this.pages.members) {
                    columns.push({
                        title: this.$t('guild.rank'),
                        key: 'rank_name',
                    });
                    columns.push({
                        title: this.$t('guild.stats.zeni'),
                        key: 'zeni',
                        align: 'center',
                    });
                    columns.push({
                        title: this.$t('guild.stats.location'),
                        key: 'location',
                    });
                    columns.push({
                        title: this.$t('guild.action'),
                        align: 'center',
                        render: (h, params) => h(
                            'div',
                            [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.runAction('fired', params.row);
                                            },
                                        },
                                    },
                                    this.$t('guild.admin.player.fired'),
                                ),
                            ],
                        ),
                    });
                }

                return columns;
            },

            async getRequesters() {
                this.page = this.pages.requesters;
                this.guildPlayers = [];
                await api.getGuildRequesters().then((res) => {
                    res.data.players.forEach((guildPlayer) => {
                        const player = this.getPlayer(guildPlayer.player);
                        const result = {
                            id: player.id,
                            guild_player: guildPlayer.id,
                            level: player.level,
                            name: player.name,
                            image_path: player.getImagePath(),
                        };

                        this.guildPlayers.push(result);
                    });
                });

                return this.guildPlayers;
            },
            async getMembers() {
                this.page = this.pages.members;
                this.guildPlayers = [];
                await api.getGuildMembers().then((res) => {
                    res.data.players.forEach((guildPlayer) => {
                        const player = this.getPlayer(guildPlayer.player);
                        if (player.id !== this.currentPlayer.id) {
                            const result = {
                                id: player.id,
                                guild_player: guildPlayer.id,
                                level: player.level,
                                name: player.name,
                                rank_name: guildPlayer.rank.name,
                                image_path: player.getImagePath(),
                                zeni: guildPlayer.zeni,
                                location: `${this.$t(guildPlayer.player.map.name)} ( ${guildPlayer.player.x} / ${guildPlayer.player.y})`,
                            };

                            this.guildPlayers.push(result);
                        }
                    });
                });

                return this.guildPlayers;
            },

            async manageSettings() {
                this.guild.history = this.currentPlayer.getGuild().history;
                this.guild.message = this.currentPlayer.getGuild().message;
                this.page = this.pages.settings;
            },

            async runAction(what, player) {
                this.$Loading.start();
                let errorMessage;
                let successMessage;
                switch (what) {
                    case 'decline':
                    case 'accept':
                        await api.adminRequest(player.guild_player, what === 'accept').then((res) => {
                            successMessage = this.handleMessages(res.data);
                            this.$store.dispatch('fetchPlayer');
                            this.getRequesters();
                        }).catch((err) => {
                            errorMessage = this.$t(err.response.data.error);
                        });
                        break;
                    case 'fired':
                        await api.adminFired(player.guild_player).then((res) => {
                            successMessage = this.handleMessages(res.data);
                            this.$store.dispatch('fetchPlayer');
                            this.getMembers();
                        }).catch((err) => {
                            errorMessage = this.$t(err.response.data.error);
                        });
                        break;
                    default:
                        return;
                }

                if (successMessage) {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: successMessage,
                    });
                    this.$Loading.finish();
                }

                if (errorMessage) {
                    this.$Notice.error({
                        title: this.$t('notice.error'),
                        desc: errorMessage,
                    });
                    this.$Loading.error();
                }
            },

            handleSettingsSubmit() {
                this.$refs.settingsForm.validate((valid) => {
                    if (valid) {
                        this.$Loading.start();
                        api.adminSettings({guild_settings: this.guild}).then(() => {
                            this.$Notice.success({
                                title: this.$t('notice.success'),
                                desc: this.$t('guild.admin.saved'),
                            });
                            this.$store.dispatch('fetchPlayer');
                        }).catch((err) => {
                            if (err.response.data.error) {
                                this.$Notice.error({
                                    title: this.$t('notice.error'),
                                    desc: err.response.data.error,
                                });
                            } else {
                                this.$Notice.error({
                                    title: this.$t('notice.error'),
                                    desc: this.$t('notice.generic'),
                                });
                            }
                        });
                        this.$Loading.finish();
                    }
                });
            },
        },
    };
</script>
