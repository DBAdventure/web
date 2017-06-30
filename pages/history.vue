<template>
    <div class="history">
        <h1 class="title title-history">{{ $t('history.title') }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        head() {
            return {
                title: this.$t('history.title'),
            };
        },
        data() {
            return {
            };
        },
    };
</script>
