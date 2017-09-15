<template>
    <div id="menu">
        <div class="start"></div>
        <template v-if="$store.state.player.connected && currentPlayer.isPlayer()">
            <div class="player">
                <h2>{{ $t('menu.player.text') }}</h2>
                <div class="player-info">
                    <div class="submenu">
                        <ul>
                            <li>{{ $t('menu.map.name', {"mapName": $t(currentPlayer.map.name)}) }}</li>
                            <li>{{ $t('menu.map.position', {"x": currentPlayer.x, "y": currentPlayer.y}) }}</li>
                            <li>{{ $t('menu.map.zeni', {"zeni": currentPlayer.zeni}) }}</li>
                        </ul>
                        <div class="bars">
                            {{ $t('menu.player.health', {"h": currentPlayer.health, "maxH": currentPlayer.total_max_health}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-danger"
                                     role="progressbar"
                                     :aria-valuenow="hPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${hPercent}%`">
                                </div>
                            </div>

                            {{ $t('menu.player.ki', {"ki": currentPlayer.ki, "maxKi": currentPlayer.total_max_ki}) }}
                            {{ $t('menu.player.plus', {"time": currentPlayer.getTimeRemaining('ki_points')}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-info"
                                     role="progressbar"
                                     :aria-valuenow="kiPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${kiPercent}%`">
                                </div>
                            </div>

                            {{ $t('menu.player.ap', {"ap": currentPlayer.action_points, "maxAp": currentPlayer.max_action_points}) }}
                            {{ $t('menu.player.plus', {"time": currentPlayer.getTimeRemaining('action_points')}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning"
                                     role="progressbar"
                                     :aria-valuenow="apPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${apPercent}%`">
                                </div>
                            </div>

                            {{ $t('menu.player.mp', {"mp": currentPlayer.movement_points, "maxMp": currentPlayer.max_movement_points}) }}
                            {{ $t('menu.player.plus', {"time": currentPlayer.getTimeRemaining('movement_points')}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-success"
                                     role="progressbar"
                                     :aria-valuenow="mpPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${mpPercent}%`">
                                </div>
                            </div>

                            {{ $t('menu.player.fp', {"fp": currentPlayer.fatigue_points, "maxFp": currentPlayer.max_fatigue_points}) }}
                            {{ $t('menu.player.minus', {"time": currentPlayer.getTimeRemaining('fatigue_points')}) }}
                            <div class="progress">
                                <div class="progress-bar"
                                     role="progressbar"
                                     :aria-valuenow="fpPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${fpPercent}%`">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <router-link to="/account">{{ $t('menu.dashboard') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/account/magic">{{ $t('menu.magic') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/map">{{ $t('menu.map.text') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/map/mini">{{ $t('menu.map.mini') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/account/inventory">{{ $t('menu.inventory') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/guild">{{ $t('menu.guild.text') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/account/inbox">{{ $t('menu.inbox') }} <span class="badge">{{ $store.state.game.data.unreadMessages }}</span></router-link>
                    </li>
                </ul>
            </div>

            <div class="movement" v-if="$route.name === 'map'">
                <h2>{{ $t('menu.movement.text') }}</h2>

                <div class="movement-info">
                    <ul id="move-block">
                        <li class="se">
                            <a href="#" @click.prevent="move('se')" :alt="$t('movements.points.six')" :title="$t('movements.points.six')"></a>
                        </li>
                        <li class="n">
                            <a href="#" @click.prevent="move('n')" :alt="$t('movements.points.five')" :title="$t('movements.points.five')"></a>
                        </li>
                        <li class="s">
                            <a href="#" @click.prevent="move('s')" :alt="$t('movements.points.five')" :title="$t('movements.points.five')"></a>
                        </li>
                        <li class="e">
                            <a href="#" @click.prevent="move('e')" :alt="$t('movements.points.five')" :title="$t('movements.points.five')"></a>
                        </li>
                        <li class="w">
                            <a href="#" @click.prevent="move('w')" :alt="$t('movements.points.five')" :title="$t('movements.points.five')"></a>
                        </li>

                        <li class="n">
                            <a href="#" @click.prevent="move('n')" :alt="$t('movements.points.six')" :title="$t('movements.points.six')"></a>
                        </li>
                        <li class="ne">
                            <a href="#" @click.prevent="move('ne')" :alt="$t('movements.points.six')" :title="$t('movements.points.six')"></a>
                        </li>
                        <li class="nw">
                            <a href="#" @click.prevent="move('nw')" :alt="$t('movements.points.six')" :title="$t('movements.points.six')"></a>
                        </li>
                        <li class="sw">
                            <a href="#" @click.prevent="move('sw')" :alt="$t('movements.points.five')" :title="$t('movements.points.five')"></a>
                        </li>
                        <li class="se">
                            <a href="#" @click.prevent="move('se')" :alt="$t('movements.points.five')" :title="$t('movements.points.five')"></a>
                        </li>
                    </ul>

                    <div class="text-center" v-if="currentPlayer.canConvert()">
                        <strong><a href="#" @click.prevent="convert">{{ $t('action.convert') }}</a></strong>
                    </div>
                </div>
            </div>
        </template>
        <div class="connection" v-else>
            <h2>{{ $t('menu.connection.text') }}</h2>
            <form role="form" @submit.prevent="login()">
                <div class="text-center">
                    <label for="login">{{ $t('login.text') }}</label>
                    <Input name="username" v-model="username" :placeholder="$t('login.text')" required type="text" />
                    <label for="password">{{ $t('password') }}</label>
                    <Input name="password" v-model="password" :placeholder="$t('password')" required type="password"/>
                </div>

                <div class="form-group last">
                    <div class="text-center">
                        <button type="submit" class="btn btn-danger btn-sm">{{ $t('login.signin') }}</button>
                    </div>
                </div>
            </form>
        </div>

        <div class="game">
            <h2>{{ $t('menu.game.text') }}</h2>
            <ul class="list-group">
                <template v-if="!$store.state.player.connected">
                    <li>
                        <router-link :title="$t('register.text')" to="/register">{{ $t('register.text') }}</router-link>
                    </li>
                    <li>
                        <router-link :title="$t('forgot.password')" to="/account/lost-password">{{ $t('forgot.password') }}</router-link>
                    </li>
                    <li>&nbsp;</li>
                </template>

                <li class="list-group-item">
                    <span class="badge">{{ $store.state.game.data.nbActivePlayers }}</span>
                    {{ $t('stats.players.active') }}
                </li>
                <li class="list-group-item">
                    <span class="badge good">{{ $store.state.game.data.nbGoodGuys }}</span>
                    {{ $t('stats.players.good') }}
                </li>
                <li class="list-group-item">
                    <span class="badge bad">{{ $store.state.game.data.nbBadGuys }}</span>
                    {{ $t('stats.players.bad') }}
                </li>
                <li class="list-group-item">
                    <span class="badge saiyajin">{{ $store.state.game.data.nbSaiyajins }}</span>
                    {{ $t('saiyajins') }}
                </li>
                <li class="list-group-item">
                    <span class="badge human-saiyajin">{{ $store.state.game.data.nbHumanSaiyajins }}</span>
                    {{ $t('human-saiyajins') }}
                </li>
                <li class="list-group-item">
                    <span class="badge human">{{ $store.state.game.data.nbHumans }}</span>
                    {{ $t('humans') }}
                </li>
                <li class="list-group-item">
                    <span class="badge namekian">{{ $store.state.game.data.nbNamekians }}</span>
                    {{ $t('namekians') }}
                </li>
                <li class="list-group-item">
                    <span class="badge dragon">{{ $store.state.game.data.nbDragons }}</span>
                    {{ $t('dragons') }}
                </li>
                <li class="list-group-item">
                    <span class="badge alien">{{ $store.state.game.data.nbAliens }}</span>
                    {{ $t('aliens') }}
                </li>
                <li class="list-group-item">
                    <span class="badge cyborg">{{ $store.state.game.data.nbCyborgs }}</span>
                    {{ $t('cyborgs') }}
                </li>
                <li class="list-group-item">
                    <span class="badge majin">{{ $store.state.game.data.nbMajins }}</span>
                    {{ $t('majins') }}
                </li>
            </ul>
        </div>
        <div class="end"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';

    export default {
        methods: {
            login() {
                this.$store.dispatch('login', {
                    username: this.username,
                    password: this.password,
                }).then(() => {
                    this.$router.push('/account');
                }).catch((err) => {
                    this.$Notice.error({
                        title: this.$t('notice.error'),
                        desc: this.$t(err.message),
                    });
                    this.password = '';
                });
            },
            move(where) {
                api.move(where).then(() => {
                    this.$store.state.game.mapReload = true;
                    this.$store.dispatch('fetchPlayer');
                }).catch(() => {
                    this.$Notice.error({
                        title: this.$t('notice.error'),
                        desc: this.$t('error.move.forbidden'),
                    });
                });
            },
            convert() {
                api.convert().then(() => {
                    this.$store.dispatch('fetchPlayer');
                }).catch(() => {
                    this.$Notice.error({
                        title: this.$t('notice.error'),
                        desc: this.$t('error.convert.forbidden'),
                    });
                });
            },
        },
        data() {
            return {
                password: null,
                username: null,
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
            hPercent() {
                return Math.floor(
                    (this.currentPlayer.health * 100) / this.currentPlayer.total_max_health,
                );
            },

            kiPercent() {
                return Math.floor(
                    (this.currentPlayer.ki * 100) / this.currentPlayer.total_max_ki,
                );
            },

            apPercent() {
                return Math.floor(
                    (this.currentPlayer.action_points * 100) / this.currentPlayer.max_action_points,
                );
            },

            mpPercent() {
                return Math.floor(
                    (this.currentPlayer.movement_points * 100) / this.currentPlayer.max_movement_points,
                );
            },

            fpPercent() {
                return Math.floor(
                    (this.currentPlayer.fatigue_points * 100) / this.currentPlayer.max_fatigue_points,
                );
            },
        },
    };
</script>
