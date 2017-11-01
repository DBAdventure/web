<template>
    <table>
        <tbody>
            <tr>
                <td>
                    <img :src="target.getInventoryImagePath()" :alt="target.getDisplayName()" :title="target.getDisplayName()" />
                </td>
                <td>
                    <div class="stats">
                        <h1>{{ $t('miscellaneous.title') }}</h1>
                        <p v-html="$t('miscellaneous.name', {name: target.getDisplayName()})"></p>

                        <p v-if="$store.state.player.connected">
                            <router-link :to="{path: '/account/inbox', query: {write: target.id}}">
                                <img :src="target.getActionImagePath('write')" :alt="$t('inbox.write')" :title="$t('inbox.write')" />
                            </router-link>
                        </p>

                        <p v-if="target.side" v-html="$t('miscellaneous.side', {side: $t(target.side.name)})"></p>
                        <p v-if="target.race" v-html="$t('miscellaneous.race', {race: $t(target.race.name)})"></p>
                        <p v-if="target.level" v-html="$t('miscellaneous.level', {level: target.level})"></p>

                        <p v-if="target.target">
                            {{ $t('miscellaneous.search') }}
                            <router-link :to="`/player/info/${target.target.id}`">{{ target.target.getDisplayName() }}</router-link>
                        </p>

                        <dl>
                            <dt>{{ $t('miscellaneous.killed.all') }}</dt>
                            <dd v-html="$t('miscellaneous.killed.good', {nb: target.nb_kill_good})"></dd>
                            <dd v-html="$t('miscellaneous.killed.bad', {nb: target.nb_kill_bad})"></dd>
                            <dd v-html="$t('miscellaneous.killed.npc', {nb: target.nb_kill_npc})"></dd>
                        </dl>

                        <p v-if="target.last_login" v-html="$t('miscellaneous.lastConnection', {date: $moment(target.last_login).format('ll') })"></p>
                    </div>
                </td>
            </tr>
        </tbody>
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
                target: {},
                selectedPlayer: null,
            };
        },
        created() {
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
