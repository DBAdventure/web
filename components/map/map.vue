<template>
    <table class="map" border="0" cellspacing="0" cellpadding="0" width="{{ (borders.yEnd - borders.yStart) * 100 + 25 }}">
        <tr>
            <th class="map-refresh">
                <a href="#" id="refresh" title="{{ 'map.refresh' | trans }}"></a>
            </th>
            <th v-for="index in borders.xStart..borders.xEnd">{{ index }}</th>
        </tr>

        <tr v-for="y in borders.yStart..borders.yEnd">
            <th class="map-y">
                {{ y }}
            </th>
            <td v-for="x in borders.xStart..borders.xEnd"
                :background="`/images/${map[x][y]['file']}`"
                class="text-center">

                {% for building in items.buildings[x][y] %}
                {{ helper.imageRender(x, y, building.entity.imagePath, (building.entity.name | trans({}, 'buildings'))) }}
                {% endfor %}

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
                {% endif %}
            </td>
        </tr>
    </table>
</template>
