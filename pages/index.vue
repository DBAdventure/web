<template>
    <div>
        <div id="home-edito">
            <dl>
                <dt>{{ $trans('home.edito.title') }}</dt>
                <dd v-html="$trans('home.edito.text')"></dd>
                <dt>{{ $trans('home.info.title') }}</dt>
                <dd>
                    <ul>
                        <li>{{ $trans('home.list.nb.objects', {nbObjects: nbObjects}) }}</li>
                        <li>{{ $trans('home.list.nb.buildings', {nbBuildings: nbBuildings}) }}</li>
                        <li>{{ $trans('home.list.nb.activePlayers', {nbActivePlayers: game.nbActivePlayers}) }}</li>
                        <li>{{ $trans('home.list.nb.activeNpc', {nbActiveNpc: game.nbNpc}) }}</li>
                        <li>{{ $trans('home.list.nb.guilds', {nbGuilds: nbGuilds}) }}</li>
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
 export default {
     head: {
         title: 'Home',
     },
     data() {
         return {
             newsList: [],
             nbObjects: 0,
             nbBuildings: 0,
             nbActivePlayers: 0,
             nbActiveNpc: 0,
             nbGuilds: 0,
         };
     },
 };
</script>
