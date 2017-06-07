<template>
    <div class="account">
        <h1 class="title title-profile">{{ $t('header.profile') }}</h1>
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
