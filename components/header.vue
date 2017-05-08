<template>
    <header class="header" :class="$store.state.game.style">
        <ul class="nav navbar-nav">
            <li class="dropdown" v-if="player.connected" :class="{'open': menuOpened}">
                <a href="#" class="dropdown-toggle" @click.prevent="toggleMenu">
                    <img :src="player.getImagePath()" :alt="player.getDisplayName()"/> {{ player.displayedName }} <b class="caret"></b>
                </a>

                <ul class="dropdown-menu">
                    <li>
                        <router-link to="/account/profile">
                            <i class="glyphicon glyphicon-user"></i>
                            {{ $trans('header.profile') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/training-room">
                            <i class="glyphicon glyphicon-education"></i> {{ $trans('header.training.room') }}
                            <span class="badge" v-if="player.skillPoints > 0">{{ player.skillPoints }}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/appearance">
                            <i class="glyphicon glyphicon-pencil"></i> {{ $trans('header.appearance') }}
                        </router-link>
                    </li>
                    <li class="divider"></li>
                    <template v-if="player.isModo">
                        <li>
                            <router-link to="/account/appearance">
                                <router-link to="admin">
                                    <i class="glyphicon glyphicon-fire"></i> {{ $trans('header.admin')}}
                                </router-link>
                            </router-link>
                        </li>
                        <li class="divider"></li>
                    </template>

                    <li>
                        <a href="#" @click.prevent="logout()"><i class="glyphicon glyphicon-off"></i> {{ $trans('header.logout')}}</a>
                    </li>
                </ul>
            </li>

            <li><router-link to="/">{{ $trans('menu.home') }}</router-link></li>
            <li><a href="http://forum.rpg-dbadventure.com" target="_blank">{{ $trans('menu.forum') }}</a></li>
            <li><router-link to="ranking">{{ $trans('menu.ranking') }}</router-link></li>
            <li><router-link to="history">{{ $trans('menu.history') }}</router-link></li>
            <li><router-link to="faq">{{ $trans('menu.faq') }}</router-link></li>
            <li><router-link to="contact">{{ $trans('menu.contact') }}</router-link></li>
            <li><router-link to="team">{{ $trans('menu.team') }}</router-link></li>
        </ul>

        <div class="online-players" v-html="$trans('header.connected', {nb: onlinePlayers})"></div>
    </header>
</template>

<script type="text/ecmascript-6">
import Player from '~/lib/player';

export default {
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        },
        toggleMenu() {
            this.menuOpened = !this.menuOpened;
        },
    },
    data() {
        return {
            player: new Player(this.$store.state.player.auth),
            onlinePlayers: 0,
            menuOpened: false,
        };
    },
};
</script>
