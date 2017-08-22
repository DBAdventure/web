<template>
    <div class="map">
        <h1 class="title title-map">{{ $t('map.title') }}</h1>

        <div class="map-container text-center">
            <table class="map" border="0" cellspacing="0" cellpadding="0" :width="(borders.yEnd - borders.yStart) * 100 + 25">
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
                                <image-render :x="x" :y="y" :image="`/images/${building.entity.image}`" :title="$t(`buildings.${building.entity.name}`)"/>
                            </template>

                            <template v-if="itemsList(items.players, x, y).length > 2">
                                <image-render :x="x" :y="y" :image="currentPlayer.getImagePath()" :title="currentPlayer.getDisplayName()"/>
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <a href="#" @click.prevent="runAction('heal', currentPlayer.id)"  v-if="currentPlayer.health < currentPlayer.total_max_health && currentPlayer.action_points >= settings.player.HEAL_ACTION">
            <img :src="currentPlayer.getActionImagePath('heal')" :alt="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})" :title="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})" />
        </a>

        <div class="search-container container-fluid">
            <template v-if="action">
                <div class="text-center">
                    <p v-for="message in parameters.messages">{{ message }}</p>

                    <template v-if="action === 'analysis'">
                        <table class="table table-condensed table-striped">
                            <tr v-for="value, name in parameters.competences">
                                <td>
                                    {{ $t(`action.analysis.${name}`) }}
                                </td>
                                <td>
                                    {{ value }}
                                </td>
                            </tr>
                        </table>

                        <action-link :player="target" :me="player" what="analysis" v-if="currentPlayer.action_points >= settings.player.ANALYSIS_ACTION" message-key="map.action.again.analysis"/>
                    </template>
                    <template v-if="action === 'heal'">
                        <action-link :player="target" :me="player" what="heal" v-if="target.can_be_healed && currentPlayer.action_points >= settings.player.HEAL_ACTION" message-key="map.action.again.heal"/>
                    </template>
                    <template v-if="action == 'building-enter'">
                        <building-enter :building="parameters.building" :type="parameters.type" :objects="parameters.objects" :me="player" />
                    </template>

                    <div class="text-center">
                        <a href="#" @click.prevent="back" class="back-to-map">{{ $t('action.back.map') }}</a>
                    </div>
                </div>
            </template>



            <template v-else>
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
                            <image-render :x="building.x" :y="building.y" :image="`/images/${building.image}`" :title="$t(`buildings.${building.name}`)"/>
                        </div>
                        <div class="col-lg-10">
                            {{ $t(`buildings.${building.name}`) }}
                            <template v-if="distance == 0">
                                {{ $t('map.nearYou') }}
                            </template>
                            <template v-else>
                                {{ $t('map.distance', {'x': building.x, 'y': building.y, 'distance': distance} )}}
                            </template>

                            <div class="actions" v-if="distance == 0">
                                <a href="#" @click.prevent="runAction('building-enter', building.id)">
                                    <template v-if="building.type == 1">
                                        {{ $t('map.building.teleport') }}
                                    </template>
                                    <template v-else-if="building.type == 3">
                                        {{ $t('map.building.wanted') }}
                                    </template>
                                    <template v-else>
                                        {{ $t('map.building.enter') }}
                                    </template>
                                </a>
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
                                <router-link :to="`/inbox/write/${enemy.id}`" v-if="enemy.isPlayer()">
                                    <img :src="enemy.getActionImagePath('write')" :alt="$t('inbox.write')" :title="$t('inbox.write')" />
                                </router-link>

                                <template v-if="distance == 0">
                                    <action-link :player="enemy" :me="player" what="slap" v-if="enemy.isPlayer() && enemy.betrayals > 0 && currentPlayer.action_points >= settings.player.SLAP_ACTION"/>
                                    <action-link :player="enemy" :me="player" what="give" v-if="enemy.isPlayer() && currentPlayer.action_points >= settings.player.GIVE_ACTION"/>
                                    <action-link :player="enemy" :me="player" what="analysis" v-if="currentPlayer.action_points >= settings.player.ANALYSIS_ACTION"/>
                                    <action-link :player="enemy" :me="player" what="steal" v-if="currentPlayer.action_points >= settings.player.STEAL_ACTION && map[enemy.x][enemy.y]['bonus'] == settings.map.TYPE_DEFAULT" />
                                    <action-link :player="enemy" :me="player" what="heal" v-if="currentPlayer.action_points >= settings.player.HEAL_ACTION && enemy.can_be_healed"/>

                                    <template v-if="currentPlayer.action_points >= settings.player.ATTACK_ACTION && map[enemy.x][enemy.y]['bonus'] == settings.map.TYPE_DEFAULT">
                                        <action-link :player="enemy" :me="player" what="attack-betray"  v-if="enemy.side.id === currentPlayer.side.id"/>
                                        <action-link :player="enemy" :me="player" what="attack" v-else/>

                                        <action-link :player="enemy" :me="player" what="attack-revenge"  v-if="currentPlayer.getTarget().id === enemy.id"/>
                                    </template>
                                </template>

                                <action-link :player="enemy" :me="player" what="spell" v-if="currentPlayer.action_points >= settings.player.SPELL_ACTION"/>
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
    import {isEmpty, entries} from '~/lib/utils';
    import settings from '~/config/general.config';
    import api from '~/services/api';
    import Player from '~/lib/player';
    import ImageRender from '~/components/map/image-render';
    import ActionLink from '~/components/map/action-link';
    import BuildingEnter from '~/components/map/building-enter';
    import Players from '~/components/mixins/players';

    export default {
        middleware: 'auth',
        mixins: [
            Players,
        ],
        head() {
            return {
                title: this.$t('map.title'),
            };
        },
        components: {
            BuildingEnter,
            ImageRender,
            ActionLink,
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                action: null,
                parameters: {},
                target: null,
                map: {},
                borders: {},
                borderYRange: [],
                borderXRange: [],
                items: {},
                settings,
            };
        },
        async mounted() {
            await this.loadMap();
            this.$store.watch(state => state.game.mapReload, (value) => {
                if (value) {
                    this.loadMap();
                    this.$store.state.game.mapReload = false;
                }
            });

            this.$on('run-action', (options) => {
                this.runAction(options.action, options.id);
            });
        },
        methods: {
            back() {
                this.action = null;
                this.parameters = {};
                this.target = null;
            },
            async loadMap() {
                await api.getMap().then((res) => {
                    this.map = res.data.map;
                    this.borders = res.data.borders;
                    this.items = res.data.items;
                    this.borderYRange = _.range(this.borders.yStart, this.borders.yEnd + 1);
                    this.borderXRange = _.range(this.borders.xStart, this.borders.xEnd + 1);
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

            async runAction(what, id, data) {
                const actions = settings.player.actions;
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
                        prom = api.pickup(id);
                        break;
                    case 'building-enter':
                        prom = api.enterBuilding(id).then((res) => {
                            this.action = what;
                            this.parameters = res.data;
                        });
                        return;
                    case 'teleport':
                        prom = api.teleport(id, data.where).then((res) => {
                            this.$store.state.game.mapReload = true;
                            this.$store.dispatch('fetchPlayer');
                        });
                        return;
                    default:
                        return;
                }

                await prom.then((res) => {
                    this.$store.dispatch('fetchPlayer');
                    this.action = what;
                    this.parameters = res.data;
                    this.target = this.players[id];
                });
            },
        },
    };
</script>
