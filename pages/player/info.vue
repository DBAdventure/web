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
                        <router-link to="`/inbox/write/${target.id}`">
                            <img :src="target.getActionImagePath('write')" :alt="$t('inbox.write.him')" title="$t('inbox.write.him')" />
                        </router-link>
                    </p>

                    <p>{{ $t('miscellaneous.side') }} {{ $t(target.side.name) }}</p>
                    <p>{{ $t('miscellaneous.race') }} {{ $t(target.race.name) }}</p>
                    <p v-html="$t('miscellaneous.level', {level: target.level})"></p>

                    <p v-if="target.target !== null">
                        {{ $t('miscellaneous.search') }}
                        <router-link to="`/player/info/${target.target.id}`">{{ target.target.getDisplayName() }}</router-link>
                    </p>

                    <p>
                        {{ $t('miscellaneous.killed.all') }}
                        <ul>
                            <li>{{ $t('miscellaneous.killed.good', {nb: target.nbKillGood}) }}</li>
                            <li>{{ $t('miscellaneous.killed.bad', {nb: target.nbKillBad}) }}</li>
                            <li>{{ $t('miscellaneous.killed.npc', {nb: target.nbKillNpc}) }}</li>
                        </ul>
                    </p>

                    <p>{{ $t('miscellaneous.last.connection', {date: target.lastLogin}) }}</p>
                </div>
            </td>
        </tr>
    </table>
</template>

<script type="text/ecmascript-6">
import Player from '~/lib/player';

export default {
    head: {
        title: 'Player information',
    },
    data() {
        return {
            target: new Player(),
        };
    },
};
</script>
