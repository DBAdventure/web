<template>
    <div>
        <h1 class="title title-default">{{ app.user.guildPlayer.guild.name }}</h1>

        <guild-menu />

        <table class="table table-stripped">
            <thead>
                <tr>
                    <th>{{ $t('name') }}</th>
                    <th>{{ $t('level') }}</th>
                    <th>{{ $t('guild.rank') }}</th>
                    <th>{{ $t('guild.stats.zeni') }}</th>
                    <th>{{ 'guild.stats.killed.good' | trans }}</th>
                    <th>{{ 'guild.stats.killed.bad' | trans }}</th>
                    <th>{{ 'guild.stats.killed.npc' | trans }}</th>
                    <th>{{ 'guild.stats.location' | trans }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="guildPlayer in guildPlayers">
                    <td>
                        <router-link class="pull-left" :to="`/player/info/${player.id}`"><img :src="guildPlayer.player.getImagePath()" /></router-link>
                    </td>
                    <td>{{ guildPlayer.player.level }}</td>
                    <td>{{ guildPlayer.rank.name }}</td>
                    <td>{{ guildPlayer.zeni }}</td>
                    <td>{{ guildPlayer.player.nbKillGood }}</td>
                    <td>{{ guildPlayer.player.nbKillBad }}</td>
                    <td>{{ guildPlayer.player.nbKillNpc }}</td>
                    <td>{{ $t(guildPlayer.player.map.name) }} ( {{ guildPlayer.player.x }} / {{ guildPlayer.player.y }} )</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/ecmascript-6">
    import GuildMenu from '~/components/account/guild/menu';

    export default {
        components: {
            GuildMenu,
        },
    };
</script>
