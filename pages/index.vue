<template>
    <div>
        <div id="home-edito">
            <dl>
                <dt>{{ $t('home.edito.title') }}</dt>
                <dd v-html="$t('home.edito.text')"></dd>
                <dt>{{ $t('home.info.title') }}</dt>
                <dd>
                    <ul>
                        <li>{{ $t('home.list.nb.objects', {nbObjects: $store.state.game.data.nbObjects}) }}</li>
                        <li>{{ $t('home.list.nb.buildings', {nbBuildings: $store.state.game.data.nbBuildings}) }}</li>
                        <li>{{ $t('home.list.nb.activePlayers', {nbActivePlayers: $store.state.game.data.nbActivePlayers}) }}</li>
                        <li>{{ $t('home.list.nb.activeNpc', {nbActiveNpc: $store.state.game.data.nbNpc}) }}</li>
                        <li>{{ $t('home.list.nb.guilds', {nbGuilds: $store.state.game.data.nbGuilds}) }}</li>
                    </ul>
                </dd>
            </dl>
        </div>

        <div id="home-news">
            <dl>
                <template v-for="news in newsList">
                    <dt>
                        <strong>{{ $t(news.subject) }}</strong>
                        {{ $t('home.news.created.by', {by: news.created_by.name, date: $moment(news.created_at).format('llll')}) }}
                    </dt>
                    <dd>
                        <img :src="news.image" :alt="$t(news.subject)" class="news-image"/>
                        <div v-html="news.message"></div>
                        <div class="clearfix"></div>
                    </dd>
                </template>
            </dl>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '~/services/api';

    export default {
        head() {
            return {
                title: this.$t('home.title'),
            };
        },
        data() {
            return {
                newsList: [],
                enabled: false,
            };
        },
        mounted() {
            if (this.enabled) {
                this.$Notice.success({
                    title: this.$t('notice.success'),
                    desc: this.$t('account.enabled'),
                });
                this.enabled = false;
            }
        },
        asyncData({query}) {
            return api.getNews().then(res => ({
                newsList: res.data.news,
                enabled: query.enabled,
            }));
        },
    };
</script>
