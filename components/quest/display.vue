<template>
  <div class="quest">
    <div class="quest-title">
      <img :src="`/images/avatars/npc_quest/${quest.image}`">
      <span v-html="$t('game.quest.presentation.title', {npcName: quest.npc_name, x: quest.x, y: quest.y, mapName: quest.map.name, title: quest.name})" />
    </div>
    <div class="quest-content">
      <p>
        <template v-for="(line, index) in quest.history.split('\n')">
          <span
            v-html="line"
            :key="`line-${index}`"
          />
          <br :key="`br-${index}`">
        </template>
      </p>

      <dl>
        <dt>{{ $t('game.quest.give.title') }}</dt>
        <dd
          v-for="npcNeeded in quest.npcs_needed"
          :key="npcNeeded.id"
        >
          <template v-if="playerQuest && playerQuest.is_in_progress">
            {{ playerQuest.npcs[npcNeeded.race.id] || 0 }} /
          </template>
          {{ npcNeeded.number }} {{ $t(npcNeeded.race.name) }}
        </dd>
        <dd
          v-for="objectNeeded in quest.objects_needed"
          :key="objectNeeded.id"
        >
          <template v-if="playerQuest && playerObjects && playerQuest.is_in_progress">
            {{ findInInventory(objectNeeded.object) }} /
          </template>
          {{ objectNeeded.number }} {{ objectNeeded.object.name }}
        </dd>
        <dd
          v-for="npcObjectNeeded in quest.npc_objects_needed"
          :key="npcObjectNeeded.id"
        >
          <template v-if="playerQuest && playerQuest.is_in_progress">
            {{ playerQuest.npc_objects[npcObjectNeeded.npc_object.id] || 0 }} /
          </template>
          {{ $t('game.quest.needed.npcObjects', {
            number: npcObjectNeeded.number,
            name: npcObjectNeeded.npc_object.name,
            list: getRaces(npcObjectNeeded.npc_object.races).join(', ')
          })
          }}
        </dd>

        <template v-if="quest.gain_objects.length > 0 && quest.gain_zeni > 0 && quest.gain_battle_points > 0">
          <dt>{{ $t('game.quest.gain.title') }}</dt>
          <dd
            v-for="gainObject in quest.gain_objects"
            :key="gainObject.id"
          >
            {{ gainObject.number }} {{ gainObject.object.name }}
          </dd>
          <dd>
            {{ $t('game.quest.gain.zeni', {zeni: quest.gain_zeni}) }}
          </dd>
          <dd>
            {{ $t('game.quest.gain.battlePoints', {bp: quest.gain_battle_points}) }}
          </dd>
        </template>
      </dl>

      <requirements :data="quest.requirements" />

      <p
        class="quest-status"
        v-if="playerQuest"
      >
        <span v-html="$t('game.quest.status.text')" />
        <span v-html="$t(`game.quest.status.${playerQuest.status}`)" />
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import _ from 'lodash';
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
        default: () => {},
      },
      playerObjects: {
        type: Object,
        required: false,
        default: () => ({}),
      },
    },
    beforeMount() {
      this.checkQuestResult();
    },
    methods: {
      checkQuestResult() {
        if (!this.playerQuest) {
          return false;
        }

        let canBeDone = true;
        this.quest.npcs_needed.forEach((obj) => {
          if (this.playerQuest.npcs[obj.race.id] < obj.number) {
            canBeDone = false;
          }
        });
        this.quest.npc_objects_needed.forEach((obj) => {
          if (this.playerQuest.npc_objects[obj.npc_object.id] < obj.number) {
            canBeDone = false;
          }
        });
        this.quest.objects_needed.forEach((obj) => {
          if (this.findInInventory(obj.object) < obj.number) {
            canBeDone = false;
          }
        });

        this.$emit('input', canBeDone);
        return canBeDone;
      },
      findInInventory(object) {
        let number = 0;
        let result;
        Object.values(this.playerObjects).forEach((playerObjects) => {
          result = _.result(
            _.find(
              playerObjects,
              (obj) => (obj.object.id === object.id),
            ),
            'number',
          );

          if (result) {
            number = result;
          }
        });
        return number;
      },
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
