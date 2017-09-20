<template>
    <ul>
        <li v-if="currentPlayer.guild_player.rank.modo || currentPlayer.guild_player.rank.admin">
            <router-link to="/account/guild/admin">
                {{ $t('guild.admin.title') }}
            </router-link>
        </li>

        <li>
            <router-link to="/account/guild/members">
                {{ $t('guild.members') }}
            </router-link>
        </li>
        <li>
            <router-link to="/account/guild/members?requester">
                {{ $t('guild.requester') }}
            </router-link>
        </li>
        <li>
            <router-link to="/account/guild/events">
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
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
    };
</script>
