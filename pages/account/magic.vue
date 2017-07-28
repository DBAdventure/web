<template>
    <h1 class="title title-magic">{{ 'magic.title' | trans }}</h1>
    <div>
        <p>{{ $t('magic.spell.learned') }}</p>
        <table class="table table-stripped">
            <thead>
                <tr>
                    <th>{{ $t('name') }}</th>
                    <th>{{ $t('requirements') }}</th>
                    <th>{{ $t('description') }}</th>
                    <th>{{ $t('bonus') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="playerSpell in currentPlayer.spells">
                    <td>{{ $t(`${playerSpell.spell.name}.name`) }}</td>
                    <td>{{ helper.displayRequirements(playerSpell.spell) }}</td>
                    <td>{{ $t(`${playerSpell.spell.name}.description_rp`) }}</td>
                    <td>
                        <stats :data="object.bonus" v-if="object.bonus" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import Stats from '~/components/objects/stats';

    export default {
        middleware: 'auth',
        components: [
            Stats,
        ],
        head() {
            return {
                title: this.$t('account.inventory'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
            };
        },
    };
</script>
