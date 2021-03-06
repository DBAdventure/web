<template>
  <div class="map">
    <h1 class="title title-map">
      {{ $t('map.title') }}
    </h1>

    <div class="map-container text-center">
      <table
        class="map"
        border="0"
        cellspacing="0"
        cellpadding="0"
        :width="(borders.xEnd - (borders.xStart - 1)) * 100 + 25"
      >
        <thead>
          <tr>
            <th class="map-refresh">
              <a
                href="#"
                @click.prevent="loadMap"
                id="refresh"
                :title="$t('map.refresh')"
              />
            </th>
            <th
              v-for="index in borderXRange"
              :key="index"
            >
              {{ index }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="y in borderYRange"
            :key="y"
          >
            <th class="map-y">
              {{ y }}
            </th>
            <td
              v-for="x in borderXRange"
              :key="x"
              :background="`/media/${map[x][y]['file']}`"
              class="text-center"
            >
              <image-render
                v-for="building in itemsList(items.buildings, x, y)"
                :key="building.entity.id"
                :x="x"
                :y="y"
                :image="`/images/buildings/${building.entity.image}`"
                :title="building.entity.name"
              />

              <template v-if="itemsList(items.players, x, y).length > 2">
                <template v-if="currentPlayer.x == x && currentPlayer.y == y">
                  <image-render
                    :x="x"
                    :y="y"
                    :image="currentPlayer.getImagePath()"
                    :title="currentPlayer.getDisplayName()"
                  />
                </template>
                <image-render
                  :x="x"
                  :y="y"
                  image="/images/avatars/players/group.png"
                  :title="groupNames(itemsList(items.players, x, y))"
                />
              </template>
              <template v-else>
                <image-render
                  v-for="player in itemsList(items.players, x, y)"
                  :key="player.entity.id"
                  :x="x"
                  :y="y"
                  :image="getPlayer(player.entity).getImagePath()"
                  :title="getPlayer(player.entity).getDisplayName()"
                />
              </template>

              <image-render
                v-for="object in itemsList(items.objects, x, y)"
                :key="object.entity.map_object_type.id"
                :x="x"
                :y="y"
                :image="`/images/objects/map/${object.entity.map_object_type.image}`"
                :title="$t(`objects.${object.entity.map_object_type.name}`)"
              />

              <image-render
                v-for="quest in itemsList(items.quests, x, y)"
                :key="quest.id"
                :x="x"
                :y="y"
                :image="`/images/avatars/npc_quest/${quest.entity.image}`"
                :title="quest.entity.npc_name"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!action">
      <b-button
        size="sm"
        variant="primary"
        @click.prevent="runAction('heal', currentPlayer.id)"
        v-if="currentPlayer.health < currentPlayer.total_max_health && currentPlayer.action_points >= settings.player.HEAL_ACTION"
      >
        <img
          :src="currentPlayer.getActionImagePath('heal')"
          :alt="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})"
          :title="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})"
        >
        {{ $t('map.action.self.heal', {'AP': settings.player.HEAL_ACTION}) }}
      </b-button>
      <b-button
        size="sm"
        variant="primary"
        @click.prevent="runAction('spell', currentPlayer.id)"
        v-if="currentPlayer.action_points >= settings.player.SPELL_ACTION"
      >
        <img
          :src="currentPlayer.getActionImagePath('spell')"
          :alt="$t('map.action.spell', {'AP': settings.player.SPELL_ACTION})"
          :title="$t('map.action.spell', {'AP': settings.player.SPELL_ACTION})"
        >
        {{ $t('map.action.self.spell', {'AP': settings.player.SPELL_ACTION}) }}
      </b-button>
    </div>

    <div class="search-container container-fluid">
      <template v-if="action">
        <div class="text-center">
          <p
            v-for="message in parameters.messages"
            :key="message.id"
          >
            <span v-html="handleMessages(message)" />
          </p>

          <template v-if="action === 'analysis'">
            <b-table
              :fields="getAnalysisColumns()"
              :items="getAnalysisData()"
              dark
              hovered
              striped
            >
              <template v-slot:cell(name)="data">
                <strong>{{ $t(`action.analysis.${data.value}`) }}</strong>
              </template>
            </b-table>

            <action-link
              :player="target"
              :me="currentPlayer"
              what="analysis"
              v-if="currentPlayer.action_points >= settings.player.ANALYSIS_ACTION"
              message-key="map.action.again.analysis"
            />
          </template>

          <template v-if="action === 'give'">
            <Form inline>
              <FormItem>
                <InputNumber
                  :max="currentPlayer.zeni"
                  :min="0"
                  v-model="give.zenis"
                />
              </FormItem>
              <FormItem>
                <b-button
                  variant="primary"
                  @click="giveZenis()"
                  :disabled="this.give.zenis === 0"
                >
                  {{ $t('action.give.text') }}
                </b-button>
              </FormItem>
            </Form>

            <b-table
              :fields="getGiveColumns()"
              :items="getGiveData()"
            >
              <template v-slot:cell(index)="data">
                <img :src="`/images/objects/${data.item.object.image}`" />
              </template>
              <template v-slot:cell(give)="data">
                <b-button
                  size="sm"
                  variant="primary"
                  @click="giveObject(data.item)"
                >
                  {{ $t('action.give.textObject') }}
                </b-button>
              </template>
            </b-table>
          </template>

          <template v-if="action === 'spell'">
            <Select v-model="selectedSpell">
              <Option
                v-for="playerSpell in parameters.playerSpells"
                :value="playerSpell.id"
                :key="$t(`spells.${playerSpell.spell.name}.name`)"
              >
                {{ $t(`spells.${playerSpell.spell.name}.name`) }}
                ({{ playerSpell.spell.requirements.ki }} KI)
              </Option>
            </Select>
            <b-button
              @click.prevent="runAction('spell', target.id)"
              :disabled="!canCastSpell()"
            >
              <img
                :src="currentPlayer.getActionImagePath('spell')"
                :alt="$t('map.action.spell', {'AP': settings.player.SPELL_ACTION})"
                :title="$t('map.action.spell', {'AP': settings.player.SPELL_ACTION})"
              >                            {{ $t('map.action.spell', {'AP': settings.player.SPELL_ACTION}) }}
            </b-button>
          </template>

          <template v-if="action === 'heal' && target.can_be_healed && currentPlayer.action_points >= settings.player.HEAL_ACTION">
            <action-link
              :player="target"
              :me="currentPlayer"
              what="heal"
              message-key="map.action.again.heal"
            />
          </template>

          <template v-if="action === 'steal'">
            <action-link
              :player="target"
              :me="currentPlayer"
              what="steal"
              v-if="currentPlayer.action_points >= settings.player.STEAL_ACTION"
              message-key="map.action.again.steal"
            />
          </template>

          <template
            v-if="isAttackAction"
          >
            <action-link
              :player="target"
              :me="currentPlayer"
              what="attack-betray"
              v-if="target.side.id === currentPlayer.side.id"
              message-key="map.action.again.attack-betray"
            />
            <action-link
              :player="target"
              :me="currentPlayer"
              what="attack"
              message-key="map.action.again.attack"
              v-else
            />

            <action-link
              :player="target"
              :me="currentPlayer"
              what="attack-revenge"
              v-if="currentPlayer.getTarget().id === target.id"
              message-key="map.action.again.attack-revenge"
            />
          </template>

          <template v-if="action == 'building-enter'">
            <building-enter
              :building="parameters.building"
              :type="parameters.type"
              :objects="parameters.objects"
              :me="currentPlayer"
            />
          </template>

          <template v-if="action == 'talk'">
            <npc-talk
              :quest="parameters.quest"
              :player-quest="parameters.player_quest"
              :player-objects="parameters.player_objects"
            />
          </template>

          <div class="text-center buttons">
            <b-button
              @click.prevent="back()"
              variant="primary"
            >
              {{ $t('action.back.map') }}
            </b-button>
          </div>
        </div>
      </template>

      <template v-else>
        <template v-for="(quests, distance) in itemsByDistance(items.quests)">
          <div
            class="row row-object"
            v-for="quest in quests"
            :key="quest.id"
          >
            <div class="col-left text-center">
              <image-render
                :x="quest.x"
                :y="quest.y"
                :image="`/images/avatars/npc_quest/${quest.image}`"
                :title="quest.name"
              />
            </div>
            <div class="col-right">
              {{ quest.npc_name }}
              <template v-if="distance == 0">
                {{ $t('map.nearYou') }}
              </template>
              <template v-else>
                {{ $t('map.distance', {'x': quest.x, 'y': quest.y, 'distance': distance} ) }}
              </template>

              <div
                class="actions"
                v-if="distance == 0"
              >
                <a
                  href="#"
                  @click.prevent="runAction('talk', quest.id)"
                >
                  <img
                    :src="currentPlayer.getActionImagePath('info')"
                    :alt="$t('map.action.talk')"
                    :title="$t('map.action.talk')"
                  >
                </a>
              </div>
            </div>
          </div>
        </template>

        <template v-for="(objects, distance) in itemsByDistance(items.objects)">
          <div
            class="row row-object"
            v-for="object in objects"
            :key="object.id"
          >
            <div class="col-left text-center">
              <image-render
                :x="object.x"
                :y="object.y"
                :image="`/images/objects/map/${object.map_object_type.image}`"
                :title="$t(`objects.${object.map_object_type.name}`)"
              />
            </div>
            <div class="col-right">
              {{ $t(`objects.${object.map_object_type.name}`) }}
              <template v-if="distance == 0">
                {{ $t('map.nearYou') }}
              </template>
              <template v-else>
                {{ $t('map.distance', {'x': object.x, 'y': object.y, 'distance': distance} ) }}
              </template>

              <div
                class="actions"
                v-if="distance == 0"
              >
                <a
                  href="#"
                  @click.prevent="runAction('pickup', object.id)"
                  v-if="object.map_object_type.id === settings.map_object_type.TYPE_SIGN"
                >
                  <img
                    :src="currentPlayer.getActionImagePath('info')"
                    :alt="$t('map.action.view')"
                    :title="$t('map.action.view')"
                  >
                </a>
                <a
                  href="#"
                  @click.prevent="runAction('pickup', object.id)"
                  v-else
                >
                  <img
                    :src="currentPlayer.getActionImagePath('pickup')"
                    :alt="$t('map.action.pickup', {'AP': settings.player.PICKUP_ACTION})"
                    :title="$t('map.action.pickup', {'AP': settings.player.PICKUP_ACTION})"
                  >
                </a>
              </div>
            </div>
          </div>
        </template>

        <template v-for="(buildings, distance) in itemsByDistance(items.buildings)">
          <div
            class="row row-object"
            v-for="building in buildings"
            :key="building.id"
          >
            <div class="col-left text-center">
              <image-render
                :x="building.x"
                :y="building.y"
                :image="`/images/buildings/${building.image}`"
                :title="building.name"
              />
            </div>
            <div class="col-right">
              {{ building.name }}
              <template v-if="distance == 0">
                {{ $t('map.nearYou') }}
              </template>
              <template v-else>
                {{ $t('map.distance', {'x': building.x, 'y': building.y, 'distance': distance} ) }}
              </template>

              <div
                class="actions"
                v-if="distance == 0"
              >
                <b-button
                  size="sm"
                  variant="primary"
                  @click.prevent="runAction('building-enter', building.id)"
                >
                  <template v-if="building.type == 1">
                    {{ $t('map.building.teleport') }}
                  </template>
                  <template v-else-if="building.type == 3">
                    {{ $t('map.building.wanted') }}
                  </template>
                  <template v-else>
                    {{ $t('map.building.enter') }}
                  </template>
                </b-button>
              </div>
            </div>
          </div>
        </template>

        <template v-for="(players, distance) in itemsByDistance(items.players, true)">
          <div
            class="row row-object"
            v-for="enemy in players"
            :key="enemy.id"
            v-if="enemy.id !== currentPlayer.id"
          >
            <div class="col-left text-center">
              <image-render
                :x="enemy.x"
                :y="enemy.y"
                :image="enemy.getImagePath()"
                :title="enemy.getDisplayName()"
              />
            </div>
            <div class="col-right">
              <strong>
                <router-link
                  v-if="enemy.isPlayer()"
                  :to="`/player/info/${enemy.id}`"
                >{{ enemy.getDisplayName() }}</router-link>
                <template v-else>{{ enemy.getDisplayName() }}</template>
              </strong>
              <br>

              <span
                v-html="$t('map.player.info', {
                  sideClass: enemy.side.name,
                  raceClass: enemy.race.name,
                  side: $t(enemy.side.name),
                  race: $t(enemy.race.name),
                  class: $t(enemy.class)})"
              />

              <template v-if="distance == 0">
                {{ $t('map.player.nearYou', {"level": enemy.level}) }}
              </template>
              <template v-else>
                {{ $t('map.player.distance', {'level': enemy.level, 'x': enemy.x, 'y': enemy.y, 'distance': distance}) }}
              </template>

              <div class="actions">
                <router-link
                  :to="{path: '/account/inbox', query: {write: enemy.id}}"
                  v-if="enemy.isPlayer()"
                >
                  <img
                    :src="enemy.getActionImagePath('write')"
                    :alt="$t('inbox.write')"
                    :title="$t('inbox.write')"
                  >
                </router-link>

                <router-link
                  :to="`/player/info/${enemy.id}`"
                  v-if="enemy.isPlayer()"
                >
                  <img
                    :src="enemy.getActionImagePath('info')"
                    :alt="$t('map.action.info')"
                    :title="$t('map.action.info')"
                  >
                </router-link>

                <template v-if="distance == 0">
                  <action-link
                    :player="enemy"
                    :me="currentPlayer"
                    what="slap"
                    v-if="enemy.isPlayer() && enemy.betrayals > 0 && currentPlayer.action_points >= settings.player.SLAP_ACTION"
                  />
                  <action-link
                    :player="enemy"
                    :me="currentPlayer"
                    what="give"
                    v-if="enemy.isPlayer() && currentPlayer.action_points >= settings.player.GIVE_ACTION"
                  />
                  <action-link
                    :player="enemy"
                    :me="currentPlayer"
                    what="analysis"
                    v-if="currentPlayer.action_points >= settings.player.ANALYSIS_ACTION && map[enemy.x][enemy.y].bonus == settings.map.TYPE_DEFAULT"
                  />
                  <action-link
                    :player="enemy"
                    :me="currentPlayer"
                    what="steal"
                    v-if="currentPlayer.action_points >= settings.player.STEAL_ACTION && map[enemy.x][enemy.y].bonus == settings.map.TYPE_DEFAULT"
                  />
                  <action-link
                    :player="enemy"
                    :me="currentPlayer"
                    what="heal"
                    v-if="currentPlayer.action_points >= settings.player.HEAL_ACTION && enemy.can_be_healed"
                  />

                  <template v-if="currentPlayer.action_points >= settings.player.ATTACK_ACTION && map[enemy.x][enemy.y].bonus == settings.map.TYPE_DEFAULT">
                    <action-link
                      :player="enemy"
                      :me="currentPlayer"
                      what="attack-betray"
                      v-if="enemy.side.id === currentPlayer.side.id"
                    />
                    <action-link
                      :player="enemy"
                      :me="currentPlayer"
                      what="attack"
                      v-else
                    />

                    <action-link
                      :player="enemy"
                      :me="currentPlayer"
                      what="attack-revenge"
                      v-if="currentPlayer.getTarget().id === enemy.id"
                    />
                  </template>
                </template>

                <action-link
                  :player="enemy"
                  :me="currentPlayer"
                  what="spell"
                  v-if="currentPlayer.action_points >= settings.player.SPELL_ACTION"
                />
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {mapGetters} from 'vuex';
  import settings from '~/config/general.config';
  import api from '~/services/api';
  import Player from '~/lib/player';
  import {EventBus} from '~/lib/bus';
  import {isEmpty, entries} from '~/lib/utils';
  import ActionLink from '~/components/map/action-link';
  import NpcTalk from '~/components/map/npc-talk';
  import BuildingEnter from '~/components/map/building-enter';
  import ErrorMixin from '~/components/mixins/error';
  import MessagesMixin from '~/components/mixins/messages';
  import PlayersMixin from '~/components/mixins/players';
  import ImageRender from '~/components/map/image-render';

  export default {
    middleware: 'auth',
    mixins: [
      ErrorMixin,
      MessagesMixin,
      PlayersMixin,
    ],
    head() {
      return {
        title: this.$t('map.title'),
      };
    },
    components: {
      ActionLink,
      BuildingEnter,
      ImageRender,
      NpcTalk,
    },
    computed: {
      ...mapGetters('player', ['currentPlayer']),
      isAttackAction() {
        return (
          this.action === 'attack'
          || this.action === 'attack-betray'
          || this.action === 'attack-revenge'
        )
          && this.currentPlayer.action_points >= this.settings.player.ATTACK_ACTION
          && !this.parameters.isDead;
      },
    },
    data() {
      return {
        selectedAttackType: null,
        selectedSpell: null,
        action: null,
        parameters: {},
        target: null,
        map: {},
        borders: {},
        borderYRange: [],
        borderXRange: [],
        items: {},
        give: {
          zenis: 0,
        },
        settings,
      };
    },
    async mounted() {
      this.$nextTick(async () => {
        await this.loadMap();
      });

      EventBus.$on('reload-map', () => {
        this.back();
      });

      this.$on('run-action', (options) => {
        this.runAction(options.action, options.id);
      });
    },
    methods: {
      async back() {
        await this.loadMap();
        this.action = null;
        this.parameters = {};
        this.target = null;
      },
      async loadMap() {
        this.$nuxt.$loading.start();
        this.players = {};
        await api.getMap().then((res) => {
          this.map = res.data.map;
          this.borders = res.data.borders;
          this.items = res.data.items;
          this.borderYRange = _.range(this.borders.yStart, this.borders.yEnd + 1);
          this.borderXRange = _.range(this.borders.xStart, this.borders.xEnd + 1);
          this.$nuxt.$loading.finish();
          this.centerMap();
        });
      },
      itemsByDistance(data, isPlayer) {
        const items = {};
        /* eslint-disable no-restricted-syntax, no-unused-vars */
        for (const [x, objectsX] of entries(data)) {
          for (const [y, objects] of entries(objectsX)) {
            for (const [k, object] of entries(objects)) {
              if (isEmpty(items[object.distance])) {
                items[object.distance] = [];
              }

              object.entity.x = x;
              object.entity.y = y;
              if (isPlayer) {
                items[object.distance].push(new Player(object.entity));
              } else {
                items[object.distance].push(object.entity);
              }
            }
          }
        }
        /* eslint-enable no-restricted-syntax */
        return items;
      },

      itemsList(object, x, y) {
        if (!isEmpty(object) && !isEmpty(object[x]) && !isEmpty(object[x][y])) {
          return object[x][y];
        }

        return {};
      },

      groupNames(group) {
        const names = [];
        group.forEach((player) => {
          if (this.currentPlayer.id !== player.entity.id) {
            names.push(this.getPlayer(player.entity).getDisplayName());
          }
        });

        return names.join(', ');
      },

      /**
       * Analysis action
       */
      getAnalysisColumns() {
        return [
          {
            label: this.$t('skill'),
            key: 'name',
          },
          {
            label: this.$t('value'),
            key: 'value',
          },
        ];
      },
      getAnalysisData() {
        const result = [];
        /* eslint-disable no-restricted-syntax */
        for (const [key, value] of entries(this.parameters.competences)) {
          result.push({
            name: key,
            value,
          });
        }
        /* eslint-enable no-restricted-syntax */
        return result;
      },

      /**
       * Give action
       */
      getGiveColumns() {
        return [
          'index',
          {
            label: this.$t('object.name'),
            key: 'name',
          },
          {
            label: this.$t('object.quantity'),
            key: 'quantity',
          },
          {
            label: this.$t('object.give'),
            key: 'give',
          },
        ];
      },
      getGiveData() {
        return this.parameters.playerObjects;
      },
      giveZenis() {
        this.$nuxt.$loading.start();
        api.give(this.target.id, null, this.give.zenis).then(async (res) => {
          await this.$store.dispatch('player/fetch');
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('action.give.success.zenis', {zenis: this.give.zenis}),
          });
          this.handleResult(res, this.target.id);
          this.$nuxt.$loading.finish();
        }).catch(() => {
          this.raiseError();
        });
      },
      giveObject(playerObject) {
        this.$nuxt.$loading.start();
        api.give(this.target.id, playerObject.object.id).then(async (res) => {
          await this.$store.dispatch('player/fetch');
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('action.give.success.object', {name: playerObject.object.name}),
          });
          this.handleResult(res, this.target.id);
          this.$nuxt.$loading.finish();
        }).catch(() => {
          this.raiseError();
        });
      },

      /**
       * Generic actions
       */
      async runAction(what, id) {
        this.$nuxt.$loading.start();
        let prom;
        switch (what) {
        case 'attack':
        case 'attack-betray':
        case 'attack-revenge':
          prom = api.attack(id, what);
          break;
        case 'steal':
          prom = api.steal(id);
          break;
        case 'heal':
          prom = api.heal(id);
          break;
        case 'analysis':
          prom = api.analysis(id);
          break;
        case 'slap':
          prom = api.slap(id);
          break;
        case 'pickup':
          prom = api.pickup(id);
          break;
        case 'give':
          prom = api.give(id);
          break;
        case 'spell':
          prom = api.spell(id, this.selectedSpell, this.selectedAttackType);
          break;
        case 'building-enter':
          prom = api.enterBuilding(id).then((res) => {
            this.action = what;
            this.parameters = res.data;
            this.$nuxt.$loading.finish();
          }).catch(() => {
            this.raiseError();
          });
          return;
        case 'talk':
          prom = api.talkToNpc(id).then((res) => {
            this.action = what;
            this.parameters = res.data;
            this.$nuxt.$loading.finish();
          }).catch(() => {
            this.raiseError();
          });
          return;
        default:
          return;
        }

        await prom.then(async (res) => {
          await this.$store.dispatch('player/fetch');
          if (what !== 'spell') {
            this.selectedSpell = null;
          }
          this.action = what;
          this.handleResult(res, id);
          this.$nuxt.$loading.finish();
        }).catch((res) => {
          if (res.response.data.error) {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: this.$t(res.response.data.error),
            });
          } else {
            this.raiseError();
          }
        });
      },

      handleResult(res, id) {
        this.parameters = res.data;
        if (res.data.target) {
          this.players[id] = new Player(res.data.target);
        }
        this.target = this.players[id];
      },

      canCastSpell() {
        if (this.selectedSpell) {
          const playerSpell = _.find(
            this.parameters.playerSpells,
            (obj) => obj.id === this.selectedSpell,
          );

          return playerSpell && this.parameters.distance <= playerSpell.spell.distance;
        }

        return false;
      },
      centerMap() {
        this.$nextTick(() => {
          const mapContainer = document.querySelector('.map-container');
          const map = document.querySelector('.map-container .map');
          mapContainer.scrollTo(
            Math.round((map.offsetWidth - mapContainer.offsetWidth) / 2),
            Math.round((map.offsetHeight - mapContainer.offsetHeight) / 2),
          );
        });
      },
    },
  };
</script>
