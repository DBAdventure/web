<template>
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

                <!-- {% if items.buildings[x][y] is defined %}
                     {% for building in items.buildings[x][y] %}
                     {{ helper.imageRender(x, y, building.entity.imagePath, (building.entity.name | trans({}, 'buildings'))) }}
                     {% endfor %}
                     {% endif %}

                     {% if items.players[x][y] is defined %}
                     {% if items.size[x][y] > 100 %}
                     {% if app.user.x == x and app.user.y ==y %}
                     {{ helper.imageRender(x, y, app.user.imagePath, app.user.displayName) }}
                     {% endif %}
                     {{ helper.renderGroup(x, y, items.players[x][y]) }}
                     {% else %}
                     {% for player in items.players[x][y] %}
                     {{ helper.imageRender(x, y, player.entity.imagePath, player.entity.displayName) }}
                     {% endfor %}
                     {% endif %}
                     {% endif %}

                     {% if items.objects[x][y] is defined %}
                     {% for object in items.objects[x][y] %}
                     {{ helper.imageRender(x, y, object.entity.mapObjectType.imagePath, (object.entity.mapObjectType.name | trans({}, 'objects'))) }}
                     {% endfor %}
                     {% endif %} -->

            </td>
        </tr>
        </tbody>
    </table>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash';

export default {
    props: {
        borders: {
            type: Object,
            required: true,
        },
        map: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            borderYRange: [],
            borderXRange: [],
        };
    },
    mounted() {
        this.borderYRange = _.range(this.borders.yStart, this.borders.yEnd);
        this.borderXRange = _.range(this.borders.xStart, this.borders.xEnd);
    },
};
</script>
