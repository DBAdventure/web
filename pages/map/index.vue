<template>
    <div class="map">
        <h1 class="title title-map">{{ $t('map.title') }}</h1>

        <div class="map-container text-center">
            <table class="map" border="0" cellspacing="0" cellpadding="0" :width="(borders.yEnd - borders.yStart) * 100 + 25">
                <thead>
                    <tr>
                        <th class="map-refresh">
                            <a href="#" id="refresh" :title="$t('map.refresh')"></a>
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
                                <image-render :x="x" :y="y" :image="`/images/${building.entity.image}`" :title="$t(building.entity.name)"/>
                            </template>

                            <template v-if="itemsList(items.players, x, y).length > 2">
                                <image-render :x="x" :y="y" :image="getPlayer($store.state.player.auth).getImagePath()" :title="$t(getPlayer($store.state.player.auth).getDisplayName())"/>
                                <image-render :x="x" :y="y" image="/images/avatars/players/group.png" :title="groupNames(itemsList(items.players, x, y))"/>
                            </template>
                            <template v-else>
                                <template v-for="player in itemsList(items.players, x, y)">
                                    <image-render :x="x" :y="y" :image="getPlayer(player.entity).getImagePath()" :title="$t(getPlayer(player.entity).getDisplayName())"/>
                                </template>
                            </template>

                            <template v-for="object in itemsList(items.objects, x, y)">
                                <image-render :x="x" :y="y" :image="`/images/objects/map/${object.entity.map_object_type.image}`" :title="$t(object.entity.map_object_type.name)"/>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="search-container container-fluid">
            <a href="#" @click.prevent="runAction('heal', player.id)"  v-if="player.health < player.total_max_health && player.action_points >= settings.player.HEAL_ACTION">
                <img :src="player.getActionImagePath('heal')" :alt="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})" :title="$t('map.action.heal', {'AP': settings.player.HEAL_ACTION})" />
            </a>

            <template v-for="distance, objects in itemsByDistance(items.objects)">
                <div class="row row-object" v-for="object in objects">
                    <div class="col-lg-2 text-center">
                        <image-render :x="x" :y="y" :image="`/images/objects/map/${object.entity.map_object_type.image}`" :title="$t(object.entity.map_object_type.name)"/>
                    </div>
                    <div class="col-lg-10">
                        {{ $t(object.entity.map_object_type.name) }}
                        <template v-if="distance === 0">
                            {{ $t('map.near.you') }}
                        </template>
                        <template v-else>
                            {{ $t('map.distance', {'x': object.x, 'y': object.y, 'distance': distance} )}}
                        </template>

                        <div class="actions" v-if="distance === 0">
                            <a href="#" @click.prevent="runAction('pickup', object.id)">
                                <img :src="player.getActionImagePath('pickup')" :alt="$t('map.action.pickup', {'AP': settings.player.PICKUP_ACTION})" :title="$t('map.action.pickup', {'AP': settings.player.PICKUP_ACTION})" />
                            </a>
                        </div>
                    </div>
                </div>
            </template>

            <template v-for="distance, buildings in itemsByDistance(items.buildings)">
                <div class="row row-object" v-for="building in buildings">
                    <div class="col-lg-2 text-center">
                        <image-render :x="x" :y="y" :image="`/images/${building.entity.image}`" :title="$t(building.entity.name)"/>
                    </div>
                    <div class="col-lg-10">
                        {{ $t(building.entity.name) }}
                        <template v-if="distance === 0">
                            {{ $t('map.near.you') }}
                        </template>
                        <template v-else>
                            {{ $t('map.distance', {'x': building.x, 'y': building.y, 'distance': distance} )}}
                        </template>

                        <div class="actions" v-if="distance === 0">
                            <a href="#" @click.prevent="runAction('building.enter', building.id)">
                                <template v-if="building.type === 1">
                                    {{ $t('map.building.teleport') }}
                                </template>
                                <template v-if="building.type === 3">
                                    {{ $t('map.building.wanted') }}
                                </template>
                                <template v-if="building.type === 4 || building.type === 2">
                                    {{ $t('map.building.enter') }}
                                </template>
                            </a>
                        </div>
                    </div>
                </div>
            </template>

            <template v-for="distance, players in itemsByDistance(items.players)">
                <div class="row row-object" v-for="enemy in players" v-if="enemy.id != player.id">
                    { const enemy = getPlayer(enemy.entity) }
                    <div class="col-lg-2 text-center">
                        <image-render :x="x" :y="y" :image="enemy.getImagePath()" :title="$t(enemy.getDisplayName())"/>
                    </div>
                    <div class="col-lg-10">
                        <strong>
                            <router-link v-if="enemy.isPlayer()" to="`/player/info/${enemy.id}`">{{ enemy.getDisplayName() }}</router-link>
                            <template v-else>{{ player.displayName }}</template>
                        </strong>
                        <br/>

                        <span v-html="$t('map.player.info', {"sideClass": enemy.side.name, "raceClass": enemy.race.name, "side": $t(enemy.side.name), "race": $t(player.race.name), "class": $t(player.class)})"></span>

                        <template v-if="distance === 0">
                            {{ $t('map.player.near.you', {"level": enemy.level}) }}
                        </template>
                        <template v-else>
                            {{ $t('map.player.distance', {'level': enemy.level, 'x': enemy.x, 'y': enemy.y, 'distance': distance}) }}
                        </template>

                        <div class="actions">
                            <router-link to="`/inbox/write/${enemy.id}`" v-if="enemy.isPlayer()">
                                <img :src="target.getActionImagePath('write')" :alt="$t('inbox.write.him')" title="$t('inbox.write.him')" />
                            </router-link>

                            <template v-if="distance === 0">
                                <action-link :player="enemy" :me="player" what="slap" v-if="enemy.isPlayer() && enemy.betrayals > 0 && player.action_points >= settings.player.SLAP_ACTION"/>
                                <action-link :player="enemy" :me="player" what="give" v-if="enemy.isPlayer() && player.action_points >= settings.player.GIVE_ACTION"/>
                                <action-link :player="enemy" :me="player" what="analysis" v-if="player.action_points >= settings.player.ANALYSIS_ACTION"/>
                                <action-link :player="enemy" :me="player" what="steal" v-if="player.action_points >= settings.player.STEAL_ACTION && map[enemy.x][enemy.y]['bonus'] === settings.map.TYPE_DEFAULT" />
                                <action-link :player="enemy" :me="player" what="heal" v-if="player.action_points >= settings.player.HEAL_ACTION && enemy.health < enemy.total_max_health"/>

                                <template v-if="player.action_points >= settings.player.ATTACK_ACTION && map[enemy.x][enemy.y]['bonus'] === settings.map.TYPE_DEFAULT">
                                    <action-link :player="enemy" :me="player" what="attack-betray"  v-if="enemy.side.id === player.side.id"/>
                                    <action-link :player="enemy" :me="player" what="attack" v-else/>

                                    <action-link :player="enemy" :me="player" what="attack-revenge"  v-if="player.target && player.target.id === enemy.id"/>
                                </template>
                            </template>

                            <action-link :player="enemy" :me="player" what="spell" v-if="player.action_points >= settings.player.SPELL_ACTION"/>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash';
import Player from '~/lib/player';
import {isEmpty} from '~/lib/utils';
import api from '~/services/api';
import settings from '~/config/general.config';
import ImageRender from '~/components/map/image-render';
import ActionLink from '~/components/map/action-link';

export default {
    middleware: 'auth',
    head() {
        return {
            title: this.$t('map.title'),
        };
    },
    components: {
        ImageRender,
        ActionLink,
    },
    data() {
        return {
            player: new Player(this.$store.state.player.auth),
            map: {},
            borders: {},
            borderYRange: [],
            borderXRange: [],
            players: {},
            settings,
        };
    },
    async mounted() {
        await api.getMap().then((res) => {
            this.map = res.data.map;
            this.borders = res.data.borders;
            this.items = res.data.items;
            this.borderYRange = _.range(this.borders.yStart, this.borders.yEnd);
            this.borderXRange = _.range(this.borders.xStart, this.borders.xEnd);
        });
    },
    methods: {
        itemsByDistance(data) {
            const items = {};
            data.forEach((objectsX) => {
                objectsX.forEach((objects) => {
                    objects.forEach((object) => {
                        if (isEmpty(items[object.distance])) {
                            items[object.distance] = [];
                        }
                        items[object.distance].push(object);
                    });
                });
            });
            return items;
        },
        itemsList(object, x, y) {
            if (!isEmpty(object[x]) && !isEmpty(object[x][y])) {
                return object[x][y];
            }

            return {};
        },
        getPlayer(entity) {
            if (isEmpty(this.players[entity.id])) {
                this.players[entity.id] = new Player(entity);
            }

            return this.players[entity.id];
        },
        groupNames(group) {
            const names = [];
            group.forEach((player) => {
                names.push(this.getPlayer(player.entity).getDisplayName());
            });

            return names.join(', ');
        },

    },
};
</script>
