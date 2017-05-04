<template>
    <div id="menu"">
        <div class="start"></div>
        <template v-if="$store.state.player.auth.connected">
            <div class="player">
                <h2>{{ $trans('menu.player.text') }}</h2>
                <div class="player-info">
                    <player-menu></player-menu>
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
                    <player-movement></player-movement>
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
                <template v-if="!$store.state.player.auth.connected">
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
        };
    },
};
</script>
