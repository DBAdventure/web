<template>
    <table>
        <tr>
            <td>
                <img :src="target.getInventoryImagePath()" :alt="target.getDisplayName()" :title="target.getDisplayName()" />
            </td>
            <td>
                <div class="stats">
                    <h1>{{ $t('miscellaneous.title') }}</h1>
                    <p>{{ $t('miscellaneous.name', {name: target.getDisplayName()}) }}</p>

                    <p v-if="$store.state.player.connected">
                        <router-link :to="`/inbox/write/${target.id}`">
                            <img :src="target.getActionImagePath('write')" :alt="$t('inbox.write')" :title="$t('inbox.write')" />
                        </router-link>
                    </p>

                    <p v-if="target.side">{{ $t('miscellaneous.side', {side: $t(target.side.name)}) }}</p>
                    <p v-if="target.race">{{ $t('miscellaneous.race', {race: $t(target.race.name)}) }}</p>
                    <p v-if="target.level">{{ $t('miscellaneous.level', {race: target.level}) }}</p>

                    <p v-if="target.target">
                        {{ $t('miscellaneous.search') }}
                        <router-link :to="`/player/info/${target.target.id}`">{{ target.target.getDisplayName() }}</router-link>
                    </p>

                    <p>
                        {{ $t('miscellaneous.killed.all') }}
                        <ul>
                            <li>{{ $t('miscellaneous.killed.good', {nb: target.nb_kill_good}) }}</li>
                            <li>{{ $t('miscellaneous.killed.bad', {nb: target.nb_kill_bad}) }}</li>
                            <li>{{ $t('miscellaneous.killed.npc', {nb: target.nb_kill_npc}) }}</li>
                        </ul>
                    </p>

                    <p v-if="target.last_login">{{ $t('miscellaneous.lastConnection', {date: target.last_login}) }}</p>
                </div>
            </td>
        </tr>
    </table>
</template>

<script type="text/ecmascript-6">
    import Player from '~/lib/player';
    import api from '~/services/api';

    export default {
        head() {
            return {
                title: this.$t('miscellaneous.title'),
            };
        },
        data() {
            return {
                target: new Player(),
                selectedPlayer: {},
            };
        },
        mounted() {
            this.target = new Player(this.selectedPlayer);
        },
        asyncData({params, error}) {
            return api.getPlayerInfo(params.id).then(res => ({
                selectedPlayer: res.data.player,
            })).catch(() => {
                error({
                    message: 'error.not.found.player',
                    statusCode: 404,
                });
            });
        },
    };
</script>
