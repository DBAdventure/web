<template>
    <div class="account">
        <h1 class="title title-magic">{{ $t('magic.title') }}</h1>
        <div>
            <p v-html="$t('magic.presentation.intro', {name: currentPlayer.name})"></p>
            <p v-html="$t('magic.presentation.text')"></p>
            <Table :columns="spellColumns()" :data="spells"></Table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import Requirements from '~/components/utils/requirements';

    export default {
        middleware: 'auth',
        head() {
            return {
                title: this.$t('account.magic.title'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                spells: [],
            };
        },
        asyncData({store}) {
            if (!store.state.player.connected) {
                return {};
            }

            return api.getSpells().then(res => ({
                spells: res.data,
            })).catch(() => {});
        },
        methods: {
            spellColumns() {
                return [
                    {
                        title: this.$t('object.name'),
                        align: 'center',
                        width: 150,
                        render: (h, params) => h(
                            'strong',
                            this.$t(`spells.${params.row.spell.name}.name`),
                        ),
                    },
                    {
                        title: this.$t('object.description'),
                        key: 'description',
                        render: (h, params) => h(
                            'div',
                            [
                                this.$t(`spells.${params.row.spell.name}.descriptionRp`),
                                h(
                                    Requirements,
                                    {
                                        props: {
                                            data: params.row.spell.requirements,
                                        },
                                    },
                                ),
                            ],
                        ),
                    },
                ];
            },
        },
    };
</script>
