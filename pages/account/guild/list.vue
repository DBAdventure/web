<template>
    <div>
        <h1 class="title title-default">{{ $t('guilds') }}</h1>

        <Table :columns="guildsColumns()" :data="guildsData()"></Table>

        <template v-if="selectedGuild">
            <div v-if="!currentPlayer.guild_player">
                <Button @click.prevent="join(selectedGuild.id)">{{ $('guild.join') }}</Button>
            </div>

            <div id="guildes_desc">
                <div class="titrev2">
                    <div id="guildes_nom">
                        {{ selectedGuild.shortName}} {{ selectedGuild.name }}
                    </div>
                    <div id="guildes_createur">
                        {{ $t('guild.createdBy')}}
                        <router-link class="pull-left" :to="`/player/info/${selectedGuild.created_by.id}`">
                            <img :src="selectedGuild.created_by.getImagePath()" />
                            {{ selectedGuild.created_by.name }}
                        </router-link>
                    </div>
                </div>

                <h2>{{ $t('guild.history') }}</h2>
                <p>
                    {{ selectedGuild.history }}
                </p>

                <Table :columns="guildPlayersColumns()" :data="selectedGuild.players"></Table>
            </div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import GuildMenu from '~/components/account/guild/menu';

    export default {
        components: {
            GuildMenu,
        },
        head() {
            return {
                title: this.$t('guild.join'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                selectedGuild: null,
            };
        },
        methods: {
            guildsColumns() {

            },
            guildsData() {

            },
            guildPlayersColumns() {

            },
        },
        asyncData() {

        },
    };
</script>
