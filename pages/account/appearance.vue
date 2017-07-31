<template>
    <div>
        <h1 class="title title-appearance">{{ $t('appearance') }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    middleware: 'auth',
    head() {
        return {
            title: this.$t('account.title'),
        };
    },
    data() {
        return {
        };
    },
};
</script>
