<template>
    <div class="map">
        <h1 class="title title-map">{{ $t('map.title') }}</h1>

        <div class="map-container text-center">
            <table class="map" border="0" cellspacing="0" cellpadding="0" :width="(borders.xEnd - (borders.xStart - 1)) * 100 + 25">
                <thead>
                    <tr>
                        <th class="map-refresh">
                            <a href="#" @click.prevent="loadMap" id="refresh" :title="$t('map.refresh')"></a>
                        </th>
                        <th v-for="index in borderXRange">{{ index }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="y in borderYRange">
                        <th class="map-y">
                            {{ y }}
                        </th>
                        <td v-for="x in borderXRange"
                            :background="`/media/${map[x][y]['file']}`"
                            class="text-center">
                            <template v-for="building in itemsList(items.buildings, x, y)">
                                <image-render :x="x" :y="y" :image="`/images/buildings/${building.entity.image}`" :title="building.entity.name"/>
                            </template>

                            <template v-if="itemsList(items.players, x, y).length > 2">
                                <template v-if="currentPlayer.x == x && currentPlayer.y == y">
                                    <image-render :x="x" :y="y" :image="currentPlayer.getImagePath()" :title="currentPlayer.getDisplayName()"/>
                                </template>
                                <image-render :x="x" :y="y" image="/images/avatars/players/group.png" :title="groupNames(itemsList(items.players, x, y))"/>
                            </template>
                            <template v-else>
                                <template v-for="player in itemsList(items.players, x, y)">
                                    <image-render :x="x" :y="y" :image="getPlayer(player.entity).getImagePath()" :title="getPlayer(player.entity).getDisplayName()"/>
                                </template>
                            </template>

                            <template v-for="object in itemsList(items.objects, x, y)">
                                <image-render :x="x" :y="y" :image="`/images/objects/map/${object.entity.map_object_type.image}`" :title="$t(`objects.${object.entity.map_object_type.name}`)"/>
                            </template>

                            <template v-for="quest in itemsList(items.quests, x, y)">
                                <image-render :x="x" :y="y" :image="`/images/avatars/npc_quest/${quest.entity.image}`" :title="quest.entity.npc_name"/>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="!action">
            <Button @click.prevent="runAction('heal', currentPlayer.id)" v-if="currentPlayer.health < currentPlayer.total_max_health && currentPlayer.action_points >= settings.player.HEAL_ACTION">
                <img :src="currentPlayer.getActionImagePath('heal')" :alt="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})" :title="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})" />
                {{ $t('map.action.self.heal', {'AP': settings.player.HEAL_ACTION}) }}
            </Button>
        </div>

        <div class="search-container container-fluid">
            <template v-if="action">
                <div class="text-center">
                    <p v-for="message in parameters.messages">{{ handleMessages(message) }}</p>

                    <template v-if="action === 'analysis'">
                        <Table :columns="analysisColumns()" :data="analysisData()"></Table>
                        <action-link :player="target" :me="currentPlayer" what="analysis" v-if="currentPlayer.action_points >= settings.player.ANALYSIS_ACTION" message-key="map.action.again.analysis"/>
                    </template>

                    <template v-if="action === 'give'">
                        <Form inline>
                            <FormItem>
                                <InputNumber :max="currentPlayer.zeni" :min="0" v-model="give.zenis"></InputNumber>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="giveZenis()" :disabled="this.give.zenis === 0">{{ $t('action.give.text') }}</Button>
                            </FormItem>
                        </Form>

                        <Table :columns="giveColumns()" :data="giveData()"></Table>
                    </template>

                    <template v-if="action === 'spell'">
                        <Select v-model="selectedSpell">
                            <Option v-for="playerSpell in parameters.playerSpells" :value="playerSpell.id" :key="$t(`spells.${playerSpell.spell.name}.name`)">
                                {{ $t(`spells.${playerSpell.spell.name}.name`) }}
                                ({{ playerSpell.spell.requirements.ki }} KI)
                            </Option>
                        </Select>
                        <Button @click.prevent="runAction('spell', target.id)" :disabled="!canCastSpell()">
                            <img :src="currentPlayer.getActionImagePath('spell')" :alt="$t('map.action.spell', {'AP': settings.player.SPELL_ACTION})" :title="$t('map.action.spell', {'AP': settings.player.SPELL_ACTION})" />                            {{ $t('map.action.spell', {'AP': settings.player.SPELL_ACTION}) }}
                        </Button>
                    </template>

                    <template v-if="action === 'heal' && target.can_be_healed && currentPlayer.action_points >= settings.player.HEAL_ACTION">
                        <action-link :player="target" :me="currentPlayer" what="heal" message-key="map.action.again.heal"/>
                    </template>

                    <template v-if="action === 'steal'">
                        <action-link :player="target" :me="currentPlayer" what="steal" v-if="currentPlayer.action_points >= settings.player.STEAL_ACTION" message-key="map.action.again.steal"/>
                    </template>

                    <template v-if="(action === 'attack' || action == 'attack-betray' || action == 'attack-revenge') && currentPlayer.action_points >= settings.player.ATTACK_ACTION && !parameters.isDead">
                        <action-link :player="target" :me="currentPlayer" what="attack-betray" v-if="target.side.id === currentPlayer.side.id" message-key="map.action.again.attack-betray"/>
                        <action-link :player="target" :me="currentPlayer" what="attack" message-key="map.action.again.attack" v-else/>

                        <action-link :player="target" :me="currentPlayer" what="attack-revenge" v-if="currentPlayer.getTarget().id === target.id" message-key="map.action.again.attack-revenge"/>
                    </template>

                    <template v-if="action == 'building-enter'">
                        <building-enter :building="parameters.building" :type="parameters.type" :objects="parameters.objects" :me="currentPlayer" />
                    </template>

                    <template v-if="action == 'talk'">
                        <npc-talk :quest="parameters.quest" :playerQuest="parameters.player_quest" :playerObjects="parameters.player_objects" />
                    </template>

                    <div class="text-center buttons">
                        <Button @click.prevent="back()">{{ $t('action.back.map') }}</Button>
                    </div>
                </div>
            </template>

            <template v-else>
                <template v-for="quests, distance in itemsByDistance(items.quests)">
                    <div class="row row-object" v-for="quest in quests">
                        <div class="col-lg-2 text-center">
                            <image-render :x="quest.x" :y="quest.y" :image="`/images/avatars/npc_quest/${quest.image}`" :title="quest.name"/>
                        </div>
                        <div class="col-lg-10">
                            {{ quest.npc_name }}
                            <template v-if="distance == 0">
                                {{ $t('map.nearYou') }}
                            </template>
                            <template v-else>
                                {{ $t('map.distance', {'x': quest.x, 'y': quest.y, 'distance': distance} )}}
                            </template>

                            <div class="actions" v-if="distance == 0">
                                <a href="#" @click.prevent="runAction('talk', quest.id)">
                                    <img :src="currentPlayer.getActionImagePath('info')" :alt="$t('map.action.talk')" :title="$t('map.action.talk')" />
                                </a>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-for="objects, distance in itemsByDistance(items.objects)">
                    <div class="row row-object" v-for="object in objects">
                        <div class="col-lg-2 text-center">
                            <image-render :x="object.x" :y="object.y" :image="`/images/objects/map/${object.map_object_type.image}`" :title="$t(`objects.${object.map_object_type.name}`)"/>
                        </div>
                        <div class="col-lg-10">
                            {{ $t(`objects.${object.map_object_type.name}`) }}
                            <template v-if="distance == 0">
                                {{ $t('map.nearYou') }}
                            </template>
                            <template v-else>
                                {{ $t('map.distance', {'x': object.x, 'y': object.y, 'distance': distance} )}}
                            </template>

                            <div class="actions" v-if="distance == 0">
                                <a href="#" @click.prevent="runAction('pickup', object.id)">
                                    <img :src="currentPlayer.getActionImagePath('pickup')" :alt="$t('map.action.pickup', {'AP': settings.player.PICKUP_ACTION})" :title="$t('map.action.pickup', {'AP': settings.player.PICKUP_ACTION})" />
                                </a>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-for="buildings, distance in itemsByDistance(items.buildings)">
                    <div class="row row-object" v-for="building in buildings">
                        <div class="col-lg-2 text-center">
                            <image-render :x="building.x" :y="building.y" :image="`/images/buildings/${building.image}`" :title="building.name"/>
                        </div>
                        <div class="col-lg-10">
                            {{ building.name }}
                            <template v-if="distance == 0">
                                {{ $t('map.nearYou') }}
                            </template>
                            <template v-else>
                                {{ $t('map.distance', {'x': building.x, 'y': building.y, 'distance': distance} )}}
                            </template>

                            <div class="actions" v-if="distance == 0">
                                <Button size="small" @click.prevent="runAction('building-enter', building.id)">
                                    <template v-if="building.type == 1">
                                        {{ $t('map.building.teleport') }}
                                    </template>
                                    <template v-else-if="building.type == 3">
                                        {{ $t('map.building.wanted') }}
                                    </template>
                                    <template v-else>
                                        {{ $t('map.building.enter') }}
                                    </template>
                                </Button>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-for="players, distance in itemsByDistance(items.players, true)">
                    <div class="row row-object" v-for="enemy in players" v-if="enemy.id != currentPlayer.id">
                        <div class="col-lg-2 text-center">
                            <image-render :x="enemy.x" :y="enemy.y" :image="enemy.getImagePath()" :title="enemy.getDisplayName()"/>
                        </div>
                        <div class="col-lg-10">
                            <strong>
                                <router-link v-if="enemy.isPlayer()" :to="`/player/info/${enemy.id}`">{{ enemy.getDisplayName() }}</router-link>
                                <template v-else>{{ enemy.getDisplayName() }}</template>
                            </strong>
                            <br/>

                            <span v-html="$t('map.player.info', {'sideClass': enemy.side.name, 'raceClass': enemy.race.name, 'side': $t(enemy.side.name), 'race': $t(enemy.race.name), 'class': $t(enemy.class)})"></span>

                            <template v-if="distance == 0">
                                {{ $t('map.player.nearYou', {"level": enemy.level}) }}
                            </template>
                            <template v-else>
                                {{ $t('map.player.distance', {'level': enemy.level, 'x': enemy.x, 'y': enemy.y, 'distance': distance}) }}
                            </template>

                            <div class="actions">
                                <router-link :to="{path: '/account/inbox', query: {write: enemy.id}}" v-if="enemy.isPlayer()">
                                    <img :src="enemy.getActionImagePath('write')" :alt="$t('inbox.write')" :title="$t('inbox.write')" />
                                </router-link>

                                <template v-if="distance == 0">
                                    <action-link :player="enemy" :me="currentPlayer" what="slap" v-if="enemy.isPlayer() && enemy.betrayals > 0 && currentPlayer.action_points >= settings.player.SLAP_ACTION"/>
                                    <action-link :player="enemy" :me="currentPlayer" what="give" v-if="enemy.isPlayer() && currentPlayer.action_points >= settings.player.GIVE_ACTION"/>
                                    <action-link :player="enemy" :me="currentPlayer" what="analysis" v-if="currentPlayer.action_points >= settings.player.ANALYSIS_ACTION && map[enemy.x][enemy.y].bonus == settings.map.TYPE_DEFAULT"/>
                                    <action-link :player="enemy" :me="currentPlayer" what="steal" v-if="currentPlayer.action_points >= settings.player.STEAL_ACTION && map[enemy.x][enemy.y].bonus == settings.map.TYPE_DEFAULT" />
                                    <action-link :player="enemy" :me="currentPlayer" what="heal" v-if="currentPlayer.action_points >= settings.player.HEAL_ACTION && enemy.can_be_healed"/>

                                    <template v-if="currentPlayer.action_points >= settings.player.ATTACK_ACTION && map[enemy.x][enemy.y].bonus == settings.map.TYPE_DEFAULT">
                                        <action-link :player="enemy" :me="currentPlayer" what="attack-betray" v-if="enemy.side.id === currentPlayer.side.id"/>
                                        <action-link :player="enemy" :me="currentPlayer" what="attack" v-else/>

                                        <action-link :player="enemy" :me="currentPlayer" what="attack-revenge" v-if="currentPlayer.getTarget().id === enemy.id"/>
                                    </template>
                                </template>

                                <action-link :player="enemy" :me="currentPlayer" what="spell" v-if="currentPlayer.action_points >= settings.player.SPELL_ACTION"/>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
            ...mapGetters([
                'currentPlayer',
            ]),
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
            await this.loadMap();
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
                this.$Loading.start();
                this.players = {};
                await api.getMap().then((res) => {
                    this.map = res.data.map;
                    this.borders = res.data.borders;
                    this.items = res.data.items;
                    this.borderYRange = _.range(this.borders.yStart, this.borders.yEnd + 1);
                    this.borderXRange = _.range(this.borders.xStart, this.borders.xEnd + 1);
                    this.$Loading.finish();
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
                    names.push(this.getPlayer(player.entity).getDisplayName());
                });

                return names.join(', ');
            },

            /**
             * Analysis action
             */
            analysisColumns() {
                return [
                    {
                        title: this.$t('skill'),
                        key: 'name',
                        render: (h, params) => h(
                            'strong',
                            this.$t(`action.analysis.${params.row.name}`),
                        ),
                    },
                    {
                        title: this.$t('value'),
                        key: 'value',
                        align: 'center',
                    },
                ];
            },
            analysisData() {
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
            giveColumns() {
                return [
                    {
                        width: 100,
                        render: (h, params) => h(
                            'div',
                            {
                                domProps: {
                                    innerHTML: `<img src="/images/objects/${params.row.object.image}"/>`,
                                },
                            },
                        ),
                    },
                    {
                        title: this.$t('object.name'),
                        align: 'center',
                        render: (h, params) => h(
                            'strong',
                            params.row.object.name,
                        ),
                    },
                    {
                        title: this.$t('object.quantity'),
                        key: 'quantity',
                        align: 'center',
                    },
                    {
                        title: this.$t('object.give'),
                        key: 'give',
                        width: 70,
                        align: 'center',
                        render: (h, params) => h(
                            'Button',
                            {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.giveObject(params.row);
                                    },
                                },
                            },
                            this.$t('action.give.textObject'),
                        ),
                    },
                ];
            },
            giveData() {
                return this.parameters.playerObjects;
            },
            giveZenis() {
                this.$Loading.start();
                api.give(this.target.id, null, this.give.zenis).then(async (res) => {
                    await this.$store.dispatch('fetchPlayer');
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.$t('action.give.success.zenis', {zenis: this.give.zenis}),
                    });
                    this.handleResult(res, this.target.id);
                    this.$Loading.finish();
                }).catch(() => {
                    this.raiseError();
                });
            },
            giveObject(playerObject) {
                this.$Loading.start();
                api.give(this.target.id, playerObject.object.id).then(async (res) => {
                    await this.$store.dispatch('fetchPlayer');
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.$t('action.give.success.object', {name: playerObject.object.name}),
                    });
                    this.handleResult(res, this.target.id);
                    this.$Loading.finish();
                }).catch(() => {
                    this.raiseError();
                });
            },

            /**
             * Generic actions
             */
            async runAction(what, id) {
                this.$Loading.start();
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
                            this.$Loading.finish();
                        }).catch(() => {
                            this.raiseError();
                        });
                        return;
                    case 'talk':
                        prom = api.talkToNpc(id).then((res) => {
                            this.action = what;
                            this.parameters = res.data;
                            this.$Loading.finish();
                        }).catch(() => {
                            this.raiseError();
                        });
                        return;
                    default:
                        return;
                }

                await prom.then(async (res) => {
                    await this.$store.dispatch('fetchPlayer');
                    if (what !== 'spell') {
                        this.selectedSpell = null;
                    }
                    this.action = what;
                    this.handleResult(res, id);
                    this.$Loading.finish();
                }).catch((res) => {
                    if (res.response.data.error) {
                        this.$Notice.error({
                            title: this.$t('notice.error'),
                            desc: this.$t(res.response.data.error),
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
                        obj => obj.id === this.selectedSpell,
                    );

                    return playerSpell && playerSpell.spell.distance <= this.parameters.distance;
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
