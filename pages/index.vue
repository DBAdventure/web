<template>
    <div>
        <div id="home-edito">
            <dl>
                <dt>{{ $t('home.edito.title') }}</dt>
                <dd v-html="$t('home.edito.text')" />
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
                    <dt :key="`news-dt-${news.id}`">
                        <strong>{{ news.subject }}</strong>
                        {{ $t('home.news.created.by', {by: news.created_by.name, date: $moment(news.created_at).format('llll')}) }}
                    </dt>
                    <dd :key="`news-dd-${news.id}`">
                        <img
                            :src="news.image"
                            :alt="news.subject"
                            class="news-image"
                        >
                        <div v-html="news.message" />
                        <div class="clearfix" />
                    </dd>
                </template>
            </dl>
            <div
                class="text-center"
                v-if="totalPages > 1"
            >
                <Page
                    :page-size="pageSize"
                    :total="totalPages"
                    size="small"
                    @on-change="setCurrentPage"
                />
            </div>
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
                pageSize: 2,
                totalPages: 1,
                loadedNews: [],
                newsList: [],
                enabled: false,
            };
        },
        mounted() {
            this.totalPages = this.loadedNews.length;
            if (this.enabled) {
                this.$Notice.success({
                    title: this.$t('notice.success'),
                    desc: this.$t('account.enabled'),
                });
                this.enabled = false;
            }

            this.setCurrentPage(1);
        },
        methods: {
            setCurrentPage(page) {
                const start = (page - 1) * this.pageSize;
                const end = page * this.pageSize;
                this.newsList = this.loadedNews.slice(start, end);
            },
        },
        asyncData({query}) {
            return api.getNews().then((res) => ({
                loadedNews: res.data.news,
                enabled: query.enabled,
            }));
        },
    };
</script>
