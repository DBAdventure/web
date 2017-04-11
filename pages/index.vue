<template>
    <div>
        <div id="home-edito">
            <dl>
                <dt>{{ $trans('home.edito.title') }}</dt>
                <dd v-html="$trans('home.edito.text')"></dd>
                <dt>{{ $trans('home.info.title') }}</dt>
                <dd>
                    <ul v-if="$store.state.game">
                        <li>{{ $trans('home.list.nb.objects', {nbObjects: $store.state.game.nbObjects}) }}</li>
                        <li>{{ $trans('home.list.nb.buildings', {nbBuildings: $store.state.game.nbBuildings}) }}</li>
                        <li>{{ $trans('home.list.nb.activePlayers', {nbActivePlayers: $store.state.game.nbActivePlayers}) }}</li>
                        <li>{{ $trans('home.list.nb.activeNpc', {nbActiveNpc: $store.state.game.nbNpc}) }}</li>
                        <li>{{ $trans('home.list.nb.guilds', {nbGuilds: $store.state.game.nbGuilds}) }}</li>
                    </ul>
                </dd>
            </dl>
        </div>

        <div id="home-news">
            <dl>
                <template v-for="news in newsList">
                    <dt>
                        <strong>{{ $trans(news.subject) }}</strong>
                        {{ $trans('home.news.created.by', {by: news.createdBy.name, date: news.createdAt}) }}
                    </dt>
                    <dd>
                        <img :src="news.image" :alt="$trans(news.subject)" class="news-image"/>
                        <template v-html="news.message"></template>
                        <div class="clearfix"></div>
                    </dd>
                </template>
            </dl>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import api from '../services/api';

export default {
    head: {
        title: 'Home',
    },
    data() {
        return {
            newsList: [],
        };
    },
    mounted() {
        api.getNews().then((res) => {
            this.newsList = res.data.news;
        });
    },
};
</script>
