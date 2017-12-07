<template>
    <div class="account">
        <h1 class="title title-quest">{{ $t('account.quest.title') }}</h1>

        <div v-for="playerQuest in playerQuests">
            <p v-html="$t('game.quest.presentation.title', {npcName: playerQuest.quest.npc_name, x: playerQuest.quest.x, y: playerQuest.quest.y, mapName: playerQuest.quest.map.name, title: playerQuest.quest.name})"></p>
            <p>
                <template v-for="line in playerQuest.quest.history.split('\n')">{{ line }}<br></template>
            </p>

            <dl>
                <dt>{{ $t('game.quest.presentation.give.title') }}</dt>
                <dd v-for="npcNeeded in playerQuest.quest.npcs_needed">
                    {{ npcNeeded.number }} {{ $t(npcNeeded.race.name) }}
                </dd>
                <dd v-for="objectNeeded in playerQuest.quest.objects_needed">
                    {{ objectNeeded.number }} {{ objectNeeded.object.name }}
                </dd>
                <dd v-for="npcObjectNeeded in playerQuest.quest.npc_objects_needed">
                    {{ $t('game.quest.needed.npcObjects', {number: npcObjectNeeded.number, name: npcObjectNeeded.npc_object.name, list: getRaces(npcObjectNeeded.npc_object.races).join(', ')}) }}
                </dd>
                <dt>
                    {{ $t('game.quest.presentation.gain.title') }}
                </dt>
                <dd v-for="gainObject in playerQuest.quest.gain_objects">
                    {{ gainObject.number }} {{ gainObject.object.name }}
                </dd>
                <dd>
                    {{ $t('game.quest.gain.zeni', {zeni: playerQuest.quest.gain_zeni}) }}
                </dd>
                <dd>
                    {{ $t('game.quest.gain.battlePoints', {bp: playerQuest.quest.gain_battle_points}) }}
                </dd>
            </dl>

            <p><strong>{{ $t('requirements.name') }}</strong></p>
            <requirements :data="playerQuest.quest.requirements" />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import QuestMixin from '~/components/mixins/quest';

    export default {
        middleware: 'auth',
        mixins: [
            QuestMixin,
        ],
        head() {
            return {
                title: this.$t('account.quest.title'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                playerQuests: [],
            };
        },
        asyncData({store}) {
            if (!store.state.player.connected) {
                return {};
            }

            return api.getQuests().then(res => ({
                playerQuests: res.data,
            })).catch(() => {});
        },
    };
</script>
