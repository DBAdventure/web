<template>
    <div class="text-left">
        <div class="text-center">
            <img :src="`/images/avatars/npc_quest/${npc.image}`" />
            <h2>{{ npc.name }}</h2>
        </div>
        <p>{{ $t('game.quest.by', {name: npc.npc_name}) }}</p>
        <p>{{ $t('game.quest.history') }}</p>
        <p v-for="line in npc.history.split('\n')">{{ line }}</p>

        <dl>
            <dt>{{ $t('game.quest.give.title') }}</dt>
            <dd v-for="npcNeeded in npc.npcs_needed">{{ npcNeeded.number }} {{ $t(npcNeeded.race.name) }}</dd>
            <dd v-for="objectNeeded in npc.objects_needed">{{ objectNeeded.number }} {{ objectNeeded.object.name }}</dd>
            <dd v-for="npcObjectNeeded in npc.npc_objects_needed">{{ $t('game.quest.needed.npcObjects', {number: npcObjectNeeded.number, name: npcObjectNeeded.npc_object.name, list: getRaces(npcObjectNeeded.npc_object.races).join(', ')}) }}</dd>
            <dt>{{ $t('game.quest.gain.title') }}</dt>
            <dd v-for="gainObject in npc.gain_objects">{{ gainObject.number }} {{ gainObject.object.name }}</dd>
            <dd>{{ $t('game.quest.gain.zeni', {zeni: npc.gain_zeni}) }}</dd>
            <dd>{{ $t('game.quest.gain.battlePoints', {bp: npc.gain_battle_points}) }}</dd>
        </dl>

        <p><strong>{{ $t('requirements.name') }}</strong></p>
        <requirements :data="npc.requirements" />

        <Button type="primary" size="small" v-if="quest === null" @click.prevent="runAction('accept')">
            {{ $t('game.quest.accept')}}
        </Button>
    </div>
</template>

<script type="text/ecmascript-6">
    import Requirements from '~/components/utils/requirements';
    import MessagesMixin from '~/components/mixins/messages';
    import api from '~/services/api';

    export default {
        components: {
            Requirements,
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
        data() {
            return {
            };
        },
        methods: {
            getRaces(data) {
                const races = [];
                data.forEach((d) => {
                    races.push(this.$t(d.name));
                });

                return races;
            },
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
