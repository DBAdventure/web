<template>
    <div class="account">
        <h1 class="title title-profile">{{ $t('header.profile') }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';

    export default {
        middleware: 'auth',
        head() {
            return {
                title: this.$t('account.title'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
            };
        },
        methods: {
        },
    };
</script>
