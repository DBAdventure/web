<template>
    <a href="#">
    </a>
</template>


<script type="text/ecmascript-6">
    export default {
        middleware: 'auth',
        head() {
            return {
                title: this.$t('map.title'),
            };
        },
        components: {
        },
        data() {
            return {
            };
        },
    };
</script>
