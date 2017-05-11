<template>
    <div id="menu"">
        <div class="start"></div>
        <template v-if="$store.state.player.connected">
            <div class="player">
                <h2>{{ $trans('menu.player.text') }}</h2>
                <div class="player-info">
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

                    <div class="text-center" v-if="canConvert">
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
import settings from '~/config/general.config';
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
        canConvert() {
            const player = this.$store.state.player.auth;
            return player &&
                   player.action_points >= 20 &&
                   player.movement_points + 40 <= settings.player.MAX_MOVEMENT_POINTS;
        },
    },
    data() {
        return {
            password: null,
            username: null,
        };
    },
};
</script>
