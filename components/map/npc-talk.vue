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
            <dt>Ramène moi</dt>
            <dd v-for="npcNeeded in npc.npc_needed">{{ npcNeeded.number }} {{ $t(npcNeeded.race.name) }}</dd>
            <dd v-for="npcObjectNeeded in npc.npc_objects_needed">{{ npcObjectNeeded.number }} {{ $t(npcObjectNeeded.npc_object.name) }}</dd>
            <dd v-for="objectNeeded in npc.objects_needed">{{ objectNeeded.number }} {{ $t(objectNeeded.object.name) }}</dd>
            <dt>Tu gagneras</dt>
            <dd v-for="gainObject in npc.gain_objects">{{ gainObject.number }} {{ $t(gainObject.object.name) }}</dd>
            <dd>{{ npc.gain_zeni }}</dd>
            <dd>{{ npc.gain_battle_points }}</dd>
        </dl>

        <p><strong>{{ $t('requirements.name') }}</strong></p>
        <requirements :data="npc.requirements" />
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
            me: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
            };
        },
        methods: {
            async runAction(what, data) {
                let errorMessage;
                let successMessage;
                switch (what) {
                    case 'accept':
                        await api.buyObject(this.building.id, data).then((res) => {
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
