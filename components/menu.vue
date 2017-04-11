<template>
    <div id="menu"">
        <div class="start"></div>
        <template v-if="$store.state.player.connected">
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
                        <router-link to="/inbox">{{ $trans('menu.inbox') }} <span class="badge">{{ game.unreadMessages }}</span></router-link>
                    </li>
                </ul>
            </div>

            {% if app.request.attributes.get('_route') == 'map' %}
            <div class="movement">
                <h2>{{ $trans('menu.movement.text') }}</h2>

                <div class="movement-info">
                    <player-movement></player-movement>
                </div>
            </div>
            {% endif %}
        </template>
        <div class="connection" v-else>
            <h2>{{ $trans('menu.connection.text') }}</h2>
            <form role="form" @submit.prevent="login">
                <div class="text-center">
                    <label for="login">{{ $trans('login.text') }}</label>
                    <bs-input name="username" :placeholder="$trans('login.text')" required type="text"/>
                    <label for="password">{{ $trans('password') }}</label>
                    <bs-input name="password" :placeholder="$trans('password')" required type="password"/>
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
                    <span class="badge">{{ game.nbActivePlayers }}</span>
                    {{ $trans('stats.players.active') }}
                </li>
                <li class="list-group-item">
                    <span class="badge good">{{ game.nbGoodGuys }}</span>
                    {{ $trans('stats.players.good') }}
                </li>
                <li class="list-group-item">
                    <span class="badge bad">{{ game.nbBadGuys }}</span>
                    {{ $trans('stats.players.bad') }}
                </li>
                <li class="list-group-item">
                    <span class="badge saiyajin">{{ game.nbSaiyajins }}</span>
                    {{ $trans('saiyajins') }}
                </li>
                <li class="list-group-item">
                    <span class="badge human-saiyajin">{{ game.nbHumanSaiyajins }}</span>
                    {{ $trans('human-saiyajins') }}
                </li>
                <li class="list-group-item">
                    <span class="badge human">{{ game.nbHumans }}</span>
                    {{ $trans('humans') }}
                </li>
                <li class="list-group-item">
                    <span class="badge namekian">{{ game.nbNamekians }}</span>
                    {{ $trans('namekians') }}
                </li>
                <li class="list-group-item">
                    <span class="badge dragon">{{ game.nbDragons }}</span>
                    {{ $trans('dragons') }}
                </li>
                <li class="list-group-item">
                    <span class="badge alien">{{ game.nbAliens }}</span>
                    {{ $trans('aliens') }}
                </li>
                <li class="list-group-item">
                    <span class="badge cyborg">{{ game.nbCyborgs }}</span>
                    {{ $trans('cyborgs') }}
                </li>
                <li class="list-group-item">
                    <span class="badge majin">{{ game.nbMajins }}</span>
                    {{ $trans('majins') }}
                </li>
            </ul>
        </div>
        <div class="end"></div>
    </div>
</template>

<script type="text/ecmascript-6">
 import BsInput from '~components/bootstrap/input.vue';
 import api from '../services/api';

 const entries = require('~/lib/utils').entries;

 export default {
     components: {
         BsInput,
     },
     methods: {
         close() {
             this.clearForm();
             this.$parent.resetLoginModal();
             this.showLoginForm = true;
         },
         login() {
             this.$store.dispatch('login', {
                 username: this.username,
                 password: this.password,
             }).then(() => {
                 this.close();
             }).catch((err) => {
                 this.error = this.$trans(err.message);
                 this.password = '';
             });
         },
     },
     data() {
         return {
             error: null,
             password: null,
             username: null,
             game: {},
         };
     },
 };
</script>
