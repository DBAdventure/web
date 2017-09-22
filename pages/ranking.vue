<template>
    <div class="history">
        <h1 class="title title-ranking">{{ $t('ranking.title') }}</h1>

        <p>{{ $t('ranking.text') }}</p>
        <p>{{ $t('ranking.rankBy') }}</p>

        <div class="clearfix">
            <div class="col-lg-6">
                <ul class="list-dots">
                    <template v-for="data, w in rankingList">
                        <li :class="{'active': w === what}">
                            <a :href="buildUrl(w, type)">{{ $t(data.label) }}</a>
                            <template v-if="data.description">
                                ({{ $t(data.description) }})
                            </template>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="col-lg-6">
                <p>{{ $t('ranking.playerSearch') }}</p>

                <Input v-model="who">
                    <Button slot="append" icon="ios-search" @click.prevent="searchPlayer()"></Button>
                </Input>
            </div>
        </div>

        <div id="ranking">
            <ul>
                <li v-for="player, position in ranking">
                    {{ ((current - 1) * limit) + position + 1 }} -
                    <router-link :to="`/player/info/${getPlayer(player[0]).id}`" :class="{active: who === getPlayer(player[0]).name}">
                        <img :src="getPlayer(player[0]).getImagePath()" />
                        {{ getPlayer(player[0]).getDisplayName() }}
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="text-center" v-if="(count / limit) > 1">
            <Page :page-size="limit" :total="count" size="small" @on-change="setCurrentPage"></Page>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '~/services/api';
    import {isEmpty} from '~/lib/utils';
    import Players from '~/components/mixins/players';

    export default {
        mixins: [
            Players,
        ],
        head() {
            return {
                title: this.$t('ranking.title'),
            };
        },
        data() {
            return {
                count: 0,
                current: 1,
                limit: 1,
                what: null,
                type: null,
                who: null,
                ranking: {},
                rankingList: {},
            };
        },
        methods: {
            buildUrl(what, type) {
                if (isEmpty(type)) {
                    return `/ranking?what=${what}`;
                }

                return `/ranking?what=${what}&type=${type}`;
            },
            searchPlayer() {
                this.search(this.what, this.type, 1, this.who);
            },
            async search(what, type, page, who) {
                await api.getRankingData(what, type, page, who).then((res) => {
                    this.ranking = res.data.result.ranking;
                    this.rankingList = res.data.result.rankingList;
                    this.count = res.data.count;
                    this.limit = res.data.limit;
                    this.current = res.data.current;
                    this.what = res.data.what;
                    this.type = res.data.type;
                    this.who = res.data.who;
                }).catch(() => {});
            },
            async setCurrentPage(page) {
                await this.search(this.what, this.type, page);
            },
        },
        asyncData({query, error}) {
            return api.getRankingData(query.what, query.type).then(res => ({
                ranking: res.data.result.ranking,
                rankingList: res.data.result.rankingList,
                count: res.data.count,
                limit: res.data.limit,
                current: res.data.current,
                what: res.data.what,
                type: res.data.type,
                who: res.data.who,
            })).catch((e) => {
                console.log(e);
                error({
                    message: 'page.not.found',
                    statusCode: 404,
                });
            });
        },
    };
</script>
