<template>
    <div class="map">
        <h1 class="title title-map">{{ $trans('map.title') }}</h1>

        <div class="map-container text-center">
            <table class="map" border="0" cellspacing="0" cellpadding="0" :width="(borders.yEnd - borders.yStart) * 100 + 25">
                <thead>
                    <tr>
                        <th class="map-refresh">
                            <a href="#" id="refresh" :title="$trans('map.refresh')"></a>
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
                                <image-render :x="x" :y="y" :image="`/images/${building.entity.image}`" :title="$trans(building.entity.name)"/>
                            </template>

                            <template v-if="itemsList(items.players, x, y).length > 2">
                                <image-render :x="x" :y="y" :image="getPlayer($store.state.player.auth).getImagePath()" :title="$trans(getPlayer($store.state.player.auth).getDisplayName())"/>
                                <image-render :x="x" :y="y" image="/images/avatars/players/group.png" :title="groupNames(itemsList(items.players, x, y))"/>
                            </template>
                            <template v-else>
                                <template v-for="player in itemsList(items.players, x, y)">
                                    <image-render :x="x" :y="y" :image="getPlayer(player.entity).getImagePath()" :title="$trans(getPlayer(player.entity).getDisplayName())"/>
                                </template>
                            </template>

                            <template v-for="object in itemsList(items.objects, x, y)">
                                <image-render :x="x" :y="y" :image="`/images/objects/map/${object.entity.map_object_type.image}`" :title="$trans(object.entity.map_object_type.name)"/>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="search-container container-fluid">
            <map-elements />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash';
import Player from '~/lib/player';
import {isEmpty} from '~/lib/utils';
import api from '~/services/api';
import ImageRender from '~/components/map/image-render';
import MapElements from '~/components/map/elements';

export default {
    middleware: 'auth',
    head: {
        title: 'Map',
    },
    components: {
        ImageRender,
        MapElements,
    },
    data() {
        return {
            map: {},
            borders: {},
            borderYRange: [],
            borderXRange: [],
            players: {},
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
                names.push(this.getPlayer(player).getDisplayName());
            });

            return names.join(', ');
        },
    },
};
</script>
