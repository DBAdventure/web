<template>
    <div class="text-left">
        <quest-display :quest="quest" :playerQuest="playerQuest" :playerObjects="playerObjects" v-model="questResult" />

        <Button type="primary" size="small" v-if="playerQuest === null" @click.prevent="runAction('talk')">
            {{ $t('game.quest.accept')}}
        </Button>

        <Button type="primary" size="small" v-if="playerQuest !== null && questResult" @click.prevent="runAction('talk')">
            {{ $t('game.quest.return')}}
        </Button>
    </div>
</template>

<script type="text/ecmascript-6">
    import MessagesMixin from '~/components/mixins/messages';
    import QuestDisplay from '~/components/quest/display';
    import api from '~/services/api';

    export default {
        components: {
            QuestDisplay,
        },
        mixins: [
            MessagesMixin,
        ],
        props: {
            quest: {
                type: Object,
                required: true,
            },
            playerQuest: {
                type: Object,
                required: false,
            },
            playerObjects: {
                type: Object,
                required: false,
            },
        },
        data() {
            return {
                questResult: false,
            };
        },
        methods: {
            async runAction(what) {
                let errorMessage;
                let successMessage;
                switch (what) {
                    case 'talk':
                        await api.askQuest(this.quest.id).then((res) => {
                            successMessage = this.handleMessages(res.data);
                            this.$store.dispatch('fetchPlayer');
                        }).catch((err) => {
                            errorMessage = this.$t(err.response.data.error);
                        });
                        break;
                    default:
                        return;
                }

                if (successMessage) {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: successMessage,
                    });
                }

                if (errorMessage) {
                    this.$Notice.error({
                        title: this.$t('notice.error'),
                        desc: errorMessage,
                    });
                }
            },
        },
    };
</script>
