<template>
    <div>
        <h1 class="title title-home">{{ $t('dashboard') }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '~/services/api';

    export default {
        head() {
            return {
                title: this.$t('title.account.confirm'),
            };
        },
        async asyncData({params, error, redirect}) {
            return api.confirmAccount(params.id, params.token).then(
                () => {
                    redirect('/', {enabled: true});
                },
            ).catch(() => {
                error({
                    message: 'error.not.exists',
                    statusCode: 404,
                });
            });
        },
    };
</script>
