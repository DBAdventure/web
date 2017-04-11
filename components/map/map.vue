<template>
    <table class="map" border="0" cellspacing="0" cellpadding="0" :width="(borders.yEnd - borders.yStart) * 100 + 25">
        <tr>
            <th class="map-refresh">
                <a href="#" id="refresh" :title="$trans('map.refresh')"></a>
            </th>
            <th v-for="index in borderXRange">{{ index }}</th>
        </tr>

        <tr v-for="y in borderYRange">
            <th class="map-y">
                {{ y }}
            </th>
            <td v-for="x in borderXRange"
                :background="`/images/${map[x][y]['file']}`"
                class="text-center">
            </td>
        </tr>
    </table>
</template>

<script type="text/ecmascript-6">
 import _ from 'lodash';

 export default {
     data() {
         return {
             borderYRange: _.range(this.borders.yStart, this.borders.yEnd),
             borderXRange: _.range(this.borders.xStart, this.borders.xEnd),
         };
     },
 };
</script>
