<template>
    <div class="history">
        <h1 class="title title-ranking">{{ $t('ranking.title') }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    head() {
        return {
            title: this.$t('ranking.title'),
        };
    },
    data() {
        return {
        };
    },
};
</script>
