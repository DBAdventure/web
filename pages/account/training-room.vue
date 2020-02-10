<template>
    <div class="account">
        <h1 class="title title-training-room">
            {{ $t('training.room') }}
        </h1>

        <div class="text-center">
            <img :src="currentPlayer.getImagePath()">
            <p v-html="$t('training.text')" />
        </div>
        <div class="text-left">
            <p>{{ $t('training.you.have') }}</p>
            <ul>
                <li>{{ $t('training.you.skill', {skillPoints: currentPlayer.skill_points}) }}</li>
                <li>{{ $t('training.you.action', {actionPoints: currentPlayer.action_points}) }}</li>
            </ul>

            {{ $t('training.info') }}
        </div>

        <Table
            :columns="columns"
            :data="skills"
        />
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
                columns: [
                    {
                        title: this.$t('training.capacity'),
                        key: 'name',
                        render: (h, params) => h('div', [
                            h(
                                'p',
                                [
                                    h(
                                        'strong',
                                        this.$t(`training.${params.row.name}.title`, {value: this.currentPlayer[params.row.comp]}),
                                    ),
                                ],
                            ),
                            h(
                                'p',
                                this.$t(`training.${params.row.name}.description`),
                            ),
                        ]),
                    },
                    {
                        title: this.$t('training.action'),
                        key: 'action',
                        align: 'right',
                        render: (h, params) => {
                            let button;
                            if (this.currentPlayer.skill_points > 0
                                && this.currentPlayer.action_points >= 5
                            ) {
                                button = h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.train(params.row.name);
                                            },
                                        },
                                    },
                                    this.$t(`training.${params.row.name}.increase`),
                                );
                            }

                            return h('div', [
                                h('p', this.$t('training.increase.require')),
                                button,
                            ]);
                        },
                    },
                ],
                skills: [
                    {name: 'health', comp: 'max_health'},
                    {name: 'ki', comp: 'max_ki'},
                    {name: 'skill', comp: 'skill'},
                    {name: 'analysis', comp: 'analysis'},
                    {name: 'strength', comp: 'strength'},
                    {name: 'resistance', comp: 'resistance'},
                    {name: 'accuracy', comp: 'accuracy'},
                    {name: 'agility', comp: 'agility'},
                    {name: 'intellect', comp: 'intellect'},
                    {name: 'vision', comp: 'vision'},
                ],
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
