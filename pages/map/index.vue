<template>
    <div class="map">
        <h1 class="title title-map">{{ $trans('map.title') }}</h1>

        <div class="map-container text-center">
            <map-cases :map="map" :borders="borders" />
        </div>

        <div class="search-container container-fluid">
            <map-elements />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import api from '~/services/api';
import MapCases from '~components/map/map.vue';
import MapElements from '~components/map/elements.vue';

export default {
    middleware: 'auth',
    head: {
        title: 'Map',
    },
    components: {
        MapCases,
        MapElements,
    },
    data() {
        return {
            map: {},
            borders: {},
        };
    },
    mounted() {
        api.getMap().then((res) => {
            this.map = res.data.map;
            this.borders = res.data.borders;
        });
    },
};
</script>
