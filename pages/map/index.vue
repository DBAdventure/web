<template>
    <div class="map">
        <h1 class="title title-map">{{ $trans('map.title') }}</h1>

        <div class="map-container text-center">
            <map />
        </div>

        <div class="search-container container-fluid">
            <map-elements />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
 import Map from '~components/map/map.vue';
 import MapElements from '~components/map/elements.vue';

 export default {
     middleware: 'auth',
     head: {
         title: 'Map',
     },
     components: {
         Map,
         MapElements,
     },
     data() {
         return {
         };
     },
 };
</script>
