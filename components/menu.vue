<template>
    <div id="menu"">
        <div class="start"></div>
        <template v-if="$store.state.player.connected">
            <div class="player">
                <h2>{{ $trans('menu.player.text') }}</h2>
                <div class="player-info">
                    <div class="submenu">
                        <ul>
                            <li>{{ $trans('menu.map.name', {"%map_name%": $trans(player.map.name)}) }}</li>
                            <li>{{ $trans('menu.map.position', {"%x%": player.x, "%y%": player.y}) }}</li>
                            <li>{{ $trans('menu.map.zeni', {"%zeni%": player.zeni}) }}</li>
                        </ul>
                        <div class="bars">
                            {{ $trans('menu.player.health', {"%h%": player.health, "%max_h%": player.totalMaxHealth}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-danger"
                                     role="progressbar"
                                     :aria-valuenow="hPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${hPercent}}%`">
                                </div>
                            </div>

                            {{ $trans('menu.player.ki', {"%ki%": player.ki, "%max_ki%": player.totalMaxKi}) }}
                            {{ $trans('menu.player.plus', {"%time%": player.getTimeRemaining('KI_POINT')}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-info"
                                     role="progressbar"
                                     :aria-valuenow="kiPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${kiPercent}}%`">
                                </div>
                            </div>

                            {{ $trans('menu.player.ap', {"%ap%": player.actionPoints, "%max_ap%": player.maxActionPoints}) }}
                            {{ $trans('menu.player.plus', {"%time%": player.getTimeRemaining('ACTION_POINT')}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning"
                                     role="progressbar"
                                     :aria-valuenow="apPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${apPercent}}%`">
                                </div>
                            </div>

                            {{ $trans('menu.player.mp', {"%mp%": player.movementPoints, "%max_mp%": player.maxMovementPoints}) }}
                            {{ $trans('menu.player.plus', {"%time%": player.getTimeRemaining('MOVEMENT_POINT')}) }}
                            <div class="progress">
                                <div class="progress-bar progress-bar-success"
                                     role="progressbar"
                                     :aria-valuenow="mpPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${mpPercent}}%`">
                                </div>
                            </div>

                            {{ $trans('menu.player.fp', {"%fp%": player.fatiguePoints, "%max_fp%": player.maxFatiguePoints}) }}
                            {{ $trans('menu.player.minus', {"%time%": player.getTimeRemaining('FATIGUE_POINT')}) }}
                            <div class="progress">
                                <div class="progress-bar"
                                     role="progressbar"
                                     :aria-valuenow="fpPercent"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     :style="`width: ${fpPercent}}%`">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <router-link to="/account">{{ $trans('menu.dashboard') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/magic">{{ $trans('menu.magic') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/map">{{ $trans('menu.map.text') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/map/mini">{{ $trans('menu.map.mini') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/inventory">{{ $trans('menu.inventory') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/guild">{{ $trans('menu.guild.text') }}</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/inbox">{{ $trans('menu.inbox') }} <span class="badge">{{ $store.state.game.data.unreadMessages }}</span></router-link>
                    </li>
                </ul>
            </div>

            <div class="movement" v-if="$router.history.current.name === 'map'">
                <h2>{{ $trans('menu.movement.text') }}</h2>

                <div class="movement-info">
                    <ul id="move-block">
                        <li class="se">
                            <a href="#" @click.prevent="move('se')" :alt="$trans('movements.points.six')" :title="$trans('movements.points.six')"></a>
                        </li>
                        <li class="n">
                            <a href="#" @click.prevent="move('n')" :alt="$trans('movements.points.five')" :title="$trans('movements.points.five')"></a>
                        </li>
                        <li class="s">
                            <a href="#" @click.prevent="move('s')" :alt="$trans('movements.points.five')" :title="$trans('movements.points.five')"></a>
                        </li>
                        <li class="e">
                            <a href="#" @click.prevent="move('e')" :alt="$trans('movements.points.five')" :title="$trans('movements.points.five')"></a>
                        </li>
                        <li class="w">
                            <a href="#" @click.prevent="move('w')" :alt="$trans('movements.points.five')" :title="$trans('movements.points.five')"></a>
                        </li>

                        <li class="n">
                            <a href="#" @click.prevent="move('n')" :alt="$trans('movements.points.six')" :title="$trans('movements.points.six')"></a>
                        </li>
                        <li class="ne">
                            <a href="#" @click.prevent="move('ne')" :alt="$trans('movements.points.six')" :title="$trans('movements.points.six')"></a>
                        </li>
                        <li class="nw">
                            <a href="#" @click.prevent="move('nw')" :alt="$trans('movements.points.six')" :title="$trans('movements.points.six')"></a>
                        </li>
                        <li class="sw">
                            <a href="#" @click.prevent="move('sw')" :alt="$trans('movements.points.five')" :title="$trans('movements.points.five')"></a>
                        </li>
                        <li class="se">
                            <a href="#" @click.prevent="move('se')" :alt="$trans('movements.points.five')" :title="$trans('movements.points.five')"></a>
                        </li>
                    </ul>

                    <div class="text-center" v-if="player.canConvert()">
                        <strong><a href="#" @click.prevent="convert">{{ $trans('action.convert') }}</a></strong>
                    </div>
                </div>
            </div>
        </template>
        <div class="connection" v-else>
            <h2>{{ $trans('menu.connection.text') }}</h2>
            <form role="form" @submit.prevent="login">
                <div class="text-center">
                    <label for="login">{{ $trans('login.text') }}</label>
                    <bs-input name="username" v-model="username" :placeholder="$trans('login.text')" required type="text"/>
                    <label for="password">{{ $trans('password') }}</label>
                    <bs-input name="password" v-model="password" :placeholder="$trans('password')" required type="password"/>
                </div>

                <div class="form-group last">
                    <div class="text-center">
                        <button type="submit" class="btn btn-danger btn-sm">{{ $trans('login.signin') }}</button>
                    </div>
                </div>
            </form>
        </div>

        <div class="game">
            <h2>{{ $trans('menu.game.text') }}</h2>
            <ul class="list-group">
                <template v-if="!$store.state.player.connected">
                    <li>
                        <router-link :title="$trans('register.text')" to="/register">{{ $trans('register.text') }}</router-link>
                    </li>
                    <li>
                        <router-link :title="$trans('forgot.password')" to="/account/lost-password"">{{ $trans('forgot.password') }}</router-link>
                    </li>
                    <li>&nbsp;</li>
                </template>

                <li class="list-group-item">
                    <span class="badge">{{ $store.state.game.data.nbActivePlayers }}</span>
                    {{ $trans('stats.players.active') }}
                </li>
                <li class="list-group-item">
                    <span class="badge good">{{ $store.state.game.data.nbGoodGuys }}</span>
                    {{ $trans('stats.players.good') }}
                </li>
                <li class="list-group-item">
                    <span class="badge bad">{{ $store.state.game.data.nbBadGuys }}</span>
                    {{ $trans('stats.players.bad') }}
                </li>
                <li class="list-group-item">
                    <span class="badge saiyajin">{{ $store.state.game.data.nbSaiyajins }}</span>
                    {{ $trans('saiyajins') }}
                </li>
                <li class="list-group-item">
                    <span class="badge human-saiyajin">{{ $store.state.game.data.nbHumanSaiyajins }}</span>
                    {{ $trans('human-saiyajins') }}
                </li>
                <li class="list-group-item">
                    <span class="badge human">{{ $store.state.game.data.nbHumans }}</span>
                    {{ $trans('humans') }}
                </li>
                <li class="list-group-item">
                    <span class="badge namekian">{{ $store.state.game.data.nbNamekians }}</span>
                    {{ $trans('namekians') }}
                </li>
                <li class="list-group-item">
                    <span class="badge dragon">{{ $store.state.game.data.nbDragons }}</span>
                    {{ $trans('dragons') }}
                </li>
                <li class="list-group-item">
                    <span class="badge alien">{{ $store.state.game.data.nbAliens }}</span>
                    {{ $trans('aliens') }}
                </li>
                <li class="list-group-item">
                    <span class="badge cyborg">{{ $store.state.game.data.nbCyborgs }}</span>
                    {{ $trans('cyborgs') }}
                </li>
                <li class="list-group-item">
                    <span class="badge majin">{{ $store.state.game.data.nbMajins }}</span>
                    {{ $trans('majins') }}
                </li>
            </ul>
        </div>
        <div class="end"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import Player from '~/lib/player';
import {manager as msgManager} from '~/lib/messages';
import BsInput from '~components/bootstrap/input.vue';

export default {
    components: {
        BsInput,
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password,
            }).then(() => {
                this.$router.push('/account');
            }).catch((err) => {
                msgManager.push(
                    this.$trans(err.message),
                    'danger',
                );
                this.password = '';
            });
        },
    },
    data() {
        return {
            password: null,
            username: null,
            player: new Player(this.$store.state.player.auth),
        };
    },
    computed: {
        hPercent() {
            return Math.floor(
                (this.player.health * 100) / this.player.total_max_health,
            );
        },

        kiPercent() {
            return Math.floor(
                (this.player.ki * 100) / this.player.total_ax_ki,
            );
        },

        apPercent() {
            return Math.floor(
                (this.player.action_points * 100) / this.player.max_action_points,
            );
        },

        mpPercent() {
            return Math.floor(
                (this.player.movement_points * 100) / this.player.max_movement_points,
            );
        },

        fpPercent() {
            return Math.floor(
                (this.player.fatigue_points * 100) / this.player.max_fatigue_points,
            );
        },
    }
};
</script>
