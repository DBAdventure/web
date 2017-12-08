<template>
    <div class="account">
        <h1 class="title title-quest">{{ $t('account.quest.title') }}</h1>

        <template v-for="playerQuest in playerQuests">
            <quest-display :quest="playerQuest.quest" :playerQuest="playerQuest" :playerObjects="playerObjects" />
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import QuestDisplay from '~/components/quest/display';

    export default {
        middleware: 'auth',
        components: {
            QuestDisplay,
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
                playerQuests: [],
                playerObjects: {},
            };
        },
        asyncData({store}) {
            if (!store.state.player.connected) {
                return {};
            }

            return api.getQuests().then(res => ({
                playerQuests: res.data.player_quests,
                playerObjects: res.data.player_objects,
            }));
        },
    };
</script>
