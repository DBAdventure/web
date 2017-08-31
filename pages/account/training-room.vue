<template>
    <div class="account">
        <h1 class="title title-training-room">{{ $t('training.room') }}</h1>

        <div class="text-center">
            <img :src="currentPlayer.getImagePath()"/>
            <p v-html="$t('training.text')"></p>
        </div>
        <div class="text-left">
            <p>{{ $t('training.you.have') }}</p>
            <ul>
                <li>{{ $t('training.you.skill', {skillPoints: currentPlayer.skill_points}) }}</li>
                <li>{{ $t('training.you.action', {actionPoints: currentPlayer.action_points}) }}</li>
            </ul>

            {{ $t('training.info') }}
        </div>

        <table class="table table-hover">
            <tbody>
                <tr v-for="comp, name in skills">
                    <td>
                        {{ $t(`training.${name}.title`, {value: currentPlayer[comp]}) }}<br/>
                        {{ $t(`training.${name}.description`) }}
                    </td>
                    <td>
                        <template v-if="currentPlayer.skill_points > 0 && currentPlayer.action_points >= 5">
                            <Button @click.prevent="train(name)">
                                {{ $t(`training.${name}.increase`) }}
                            </Button>
                        </template>
                        <p>{{ $t('training.increase.require') }}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';

    export default {
        middleware: 'auth',
        head() {
            return {
                title: this.$t('training.title'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                skills: {
                    health: 'max_health',
                    ki: 'max_ki',
                    skill: 'skill',
                    analysis: 'analysis',
                    strength: 'strength',
                    resistance: 'resistance',
                    accuracy: 'accuracy',
                    agility: 'agility',
                    intellect: 'intellect',
                    vision: 'vision',
                },
            };
        },

        methods: {
            train(what) {
                api.useTrainingPoint(what).then(() => {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.$t('training.success'),
                    });
                    this.$store.dispatch('fetchPlayer');
                }).catch(() => {
                    this.$Notice.error({
                        title: this.$t('notice.error'),
                        desc: this.$t('training.error'),
                    });
                });
            },
        },
    };
</script>
