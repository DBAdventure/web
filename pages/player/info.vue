<template>
    <table>
        <tr>
            <td>
                <img :src="target.inventoryImagePath" :alt="target.displayName" :title="target.displayName" />
            </td>
            <td>
                <div class="stats">
                    <h1>{{ $trans('miscellaneous.title') }}</h1>
                    <p>{{ $trans('miscellaneous.name', {name: target.displayName}) }}</p>

                    <p v-if="$store.state.player.connected">
                        <router-link to="`/inbox/write/${target.id}`">
                            <img :src="target.actionImagePath('write')" :alt="$trans('inbox.write.him')" title="$trans('inbox.write.him')" />
                        </router-link>
                    </p>

                    <p>{{ $trans('miscellaneous.side') }} {{ $trans(target.side.name) }}</p>
                    <p>{{ $trans('miscellaneous.race') }} {{ $trans(target.race.name) }}</p>
                    <p v-html="$trans('miscellaneous.level', {level: target.level})"></p>

                    <p v-if="target.target !== null">
                        {{ $trans('miscellaneous.search') }}
                        <router-link to="`/player/info/${target.target.id}`">{{ target.target.displayName }}</router-link>
                    </p>

                    <p>
                        {{ $trans('miscellaneous.killed.all') }}
                        <ul>
                            <li>{{ $trans('miscellaneous.killed.good', {nb: target.nbKillGood}) }}</li>
                            <li>{{ $trans('miscellaneous.killed.bad', {nb: target.nbKillBad}) }}</li>
                            <li>{{ $trans('miscellaneous.killed.npc', {nb: target.nbKillNpc}) }}</li>
                        </ul>
                    </p>

                    <p>{{ $trans('miscellaneous.last.connection', {date: target.lastLogin}) }}</p>
                </div>
            </td>
        </tr>
    </table>
</template>

<script type="text/ecmascript-6">
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
