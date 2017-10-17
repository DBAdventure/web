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
                <router-link to="/account/inbox?write=guild">
                    {{ $t('guild.send.message') }}
                </router-link>
            </li>
            <li>
                <router-link to="/ranking?type=guild">
                    {{ $t('guild.ranking.intra') }}
                </router-link>
            </li>
        </ul>
        <p class="bottom">
            <a href="#" @click.prevent="leaveGuild()">{{ $t('guild.leave') }}</a> -
            <router-link to="/guild/list">{{ $t('guild.viewOthers') }}</router-link>
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import settings from '~/config/general.config';

    export default {
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                settings,
            };
        },
        methods: {
            leaveGuild() {

            },
        },
    };
</script>
