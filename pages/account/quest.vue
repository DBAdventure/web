<template>
    <div class="account">
        <h1 class="title title-quest">{{ $t('quest.title') }}</h1>
        <div>
            <p v-html="$t('quest.presentation.intro', {name: currentPlayer.name})"></p>
            <p v-html="$t('quest.presentation.text')"></p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import Requirements from '~/components/utils/requirements';

    export default {
        middleware: 'auth',
        components: {
            Requirements,
        },
        head() {
            return {
                title: this.$t('account.quest.title'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                quests: [],
            };
        },
        asyncData({store}) {
            if (!store.state.player.connected) {
                return {};
            }

            return api.getQuests().then(res => ({
                quests: res.data,
            })).catch(() => {});
        },
    };
</script>
