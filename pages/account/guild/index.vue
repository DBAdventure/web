<template>
    <div id="guild">
        <template v-if="!currentPlayer.guild_player">
            <h1 class="title title-default">{{ $t('guilds') }}</h1>

            <p class="text-center">
                {{ $t('guild.not.guilded') }}
            </p>

            <ul>
                <li>
                    <router-link to="/account/guild/create">
                        {{ $t('guild.create') }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/account/guild/list">
                        {{ $t('guild.view') }}
                    </router-link>
                </li>
            </ul>
        </template>
        <template v-else>
            <h1 class="title title-default">{{ currentPlayer.getGuild().name }}</h1>
            <template v-if="!currentPlayer.getGuild().enabled">
                {{ $t('guild.not.enabled') }}
            </template>
            <template v-else-if="!currentPlayer.guild_player.enabled">
                {{ $t('guild.player.not.enabled') }}
            </template>
            <template v-else>
                <div class="top">
                    <guild-menu />
                    <p class="bottom">Leave guild - View other guilds</p>
                </div>

                <template v-if="currentPlayer.getGuild().message">
                    <h1 class="title title-guild-message">{{ $t('guild.message') }}</h1>
                    <p v-for="line in currentPlayer.getGuild().message.split('\n')">{{ line }}</p>
                </template>
            </template>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import GuildMenu from '~/components/account/guild/menu';

    export default {
        middleware: 'auth',
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
    };
</script>
