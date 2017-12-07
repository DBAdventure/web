<template>
    <div class="text-left">
        <quest-display :quest="npc" :playerQuest="quest" />

        <Button type="primary" size="small" v-if="quest === null" @click.prevent="runAction('accept')">
            {{ $t('game.quest.accept')}}
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
            npc: {
                type: Object,
                required: true,
            },
            quest: {
                type: Object,
                required: false,
            },
        },
        methods: {
            async runAction(what, data) {
                let errorMessage;
                let successMessage;
                switch (what) {
                    case 'accept':
                        await api.acceptQuest(this.npc.id, data).then((res) => {
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
