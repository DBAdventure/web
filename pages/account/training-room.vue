<template>
    <div class="account">
        <h1 class="title title-training-room">{{ $t('training.room') }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        head() {
            return {
                title: this.$t('training.title'),
            };
        },
    };
</script>
