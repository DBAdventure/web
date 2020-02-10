<template>
    <div class="top">
        <ul class="list-dots">
            <li v-if="currentPlayer.getGuildRank() === settings.guild.ROLE_MODO || currentPlayer.getGuildRank() === settings.guild.ROLE_ADMIN">
                <router-link to="/guild/admin">
                    {{ $t('guild.admin.title') }}
                </router-link>
            </li>

            <li>
                <router-link to="/guild/members">
                    {{ $t('guild.members') }}
                </router-link>
            </li>
            <li>
                <router-link to="/guild/requester">
                    {{ $t('guild.requester') }}
                </router-link>
            </li>
            <li>
                <router-link to="/guild/events">
                    {{ $t('guild.events') }}
                </router-link>
            </li>
            <li>
                <router-link to="/ranking?type=guild">
                    {{ $t('guild.ranking.intra') }}
                </router-link>
            </li>
        </ul>

        <div class="bottom">
            <Poptip
                confirm
                :title="$t('modal.confirm.guild.leave')"
                @on-ok="leaveGuild()"
            >
                <a
                    href="#"
                    @click.prevent=""
                >{{ $t('guild.leave') }}</a>
            </Poptip>
            -
            <router-link to="/guild/list">
                {{ $t('guild.viewOthers') }}
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import settings from '~/config/general.config';
    import api from '~/services/api';
    import ErrorMixin from '~/components/mixins/error';

    export default {
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        mixins: [
            ErrorMixin,
        ],
        data() {
            return {
                settings,
            };
        },
        methods: {
            async leaveGuild() {
                this.$Loading.start();
                await api.leaveGuild().then((res) => {
                    const messages = res.data.messages.map((e) => this.$t(e));
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: messages.join('\n'),
                    });
                    this.$Loading.finish();
                    this.$router.push('/guild', {force: true});
                }).catch(() => {
                    this.raiseError();
                });

                this.$store.dispatch('fetchPlayer');
            },
        },
    };
</script>
