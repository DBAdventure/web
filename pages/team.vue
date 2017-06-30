<template>
    <div class="history">
        <h1 class="title title-team">{{ $t('history.team') }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        head() {
            return {
                title: this.$t('team.title'),
            };
        },
        data() {
            return {
            };
        },
    };
</script>
