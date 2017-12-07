<template>
    <div class="quest">
        <div class="quest-title">
            <img :src="`/images/avatars/npc_quest/${quest.image}`" />
            <span v-html="$t('game.quest.presentation.title', {npcName: quest.npc_name, x: quest.x, y: quest.y, mapName: quest.map.name, title: quest.name})"></span>
        </div>
        <div class="quest-content">
            <p>
                <template v-for="line in quest.history.split('\n')">{{ line }}<br></template>
            </p>

            <dl>
                <dt>{{ $t('game.quest.give.title') }}</dt>
                <dd v-for="npcNeeded in quest.npcs_needed">
                    {{ npcNeeded.number }} {{ $t(npcNeeded.race.name) }}
                </dd>
                <dd v-for="objectNeeded in quest.objects_needed">
                    {{ objectNeeded.number }} {{ objectNeeded.object.name }}
                </dd>
                <dd v-for="npcObjectNeeded in quest.npc_objects_needed">
                    {{ $t('game.quest.needed.npcObjects', {number: npcObjectNeeded.number, name: npcObjectNeeded.npc_object.name, list: getRaces(npcObjectNeeded.npc_object.races).join(', ')}) }}
                </dd>

                <dt>{{ $t('game.quest.gain.title') }}</dt>
                <dd v-for="gainObject in quest.gain_objects">
                    {{ gainObject.number }} {{ gainObject.object.name }}
                </dd>
                <dd>
                    {{ $t('game.quest.gain.zeni', {zeni: quest.gain_zeni}) }}
                </dd>
                <dd>
                    {{ $t('game.quest.gain.battlePoints', {bp: quest.gain_battle_points}) }}
                </dd>
            </dl>

            <p><strong>{{ $t('requirements.name') }}</strong></p>
            <requirements :data="quest.requirements" />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Requirements from '~/components/utils/requirements';

    export default {
        components: {
            Requirements,
        },
        props: {
            quest: {
                type: Object,
                required: true,
            },
            playerQuest: {
                type: Object,
                required: false,
            },
        },
        methods: {
            getRaces(data) {
                const races = [];
                data.forEach((d) => {
                    races.push(this.$t(d.name));
                });

                return races;
            },

        },
    };
</script>
