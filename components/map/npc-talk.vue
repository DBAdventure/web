<template>
    <div class="text-left">
        <quest-display :quest="quest" :playerQuest="playerQuest" :playerObjects="playerObjects" v-model="questResult" />

        <Button type="primary" size="small" v-if="playerQuest === null" @click.prevent="runAction('talk')">
            {{ $t('game.quest.accept')}}
        </Button>


        <Button type="primary" size="small" v-if="playerQuest !== null && playerQuest.is_in_progress && questResult" @click.prevent="runAction('talk')">
            {{ $t('game.quest.return')}}
        </Button>
    </div>
</template>

<script type="text/ecmascript-6">
    import {EventBus} from '~/lib/bus';
    import api from '~/services/api';
    import MessagesMixin from '~/components/mixins/messages';
    import QuestDisplay from '~/components/quest/display';

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
                switch (what) {
                    case 'talk':
                        await api.askQuest(this.quest.id).then((res) => {
                            res.data.messages.forEach((msg) => {
                                this.$Notice.success({
                                    title: this.$t('notice.success'),
                                    desc: this.handleMessages(msg),
                                });
                            });
                            EventBus.$emit('reload-map');
                        }).catch((err) => {
                            this.$Notice.error({
                                title: this.$t('notice.error'),
                                desc: this.$t(err.response.data.error),
                            });
                        });
                        break;
                    default:
                }
            },
        },
    };
</script>
