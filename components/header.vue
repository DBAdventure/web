<template>
    <header class="header" :class="$store.state.game.style">
        <ul class="nav navbar-nav">
            <li class="dropdown" v-if="this.$store.state.player.connected" :class="{'open': menuOpened}" v-click-outside="closeMenu">
                <a href="#" class="dropdown-toggle" @click.prevent="toggleMenu">
                    <img :src="currentPlayer.getImagePath()" :alt="currentPlayer.getDisplayName()"/> {{ currentPlayer.getDisplayName() }} <b class="caret"></b>
                </a>

                <ul class="dropdown-menu">
                    <li>
                        <router-link to="/account/profile">
                            <i class="glyphicon glyphicon-user"></i>
                            {{ $t('header.profile') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/training-room">
                            <i class="glyphicon glyphicon-education"></i> {{ $t('header.training.room') }}
                            <span class="badge" v-if="currentPlayer.skillPoints > 0">{{ currentPlayer.skillPoints }}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/appearance">
                            <i class="glyphicon glyphicon-pencil"></i> {{ $t('header.appearance') }}
                        </router-link>
                    </li>
                    <li class="divider"></li>
                    <template v-if="currentPlayer.isModo">
                        <li>
                            <router-link to="/account/appearance">
                                <router-link to="admin">
                                    <i class="glyphicon glyphicon-fire"></i> {{ $t('header.admin')}}
                                </router-link>
                            </router-link>
                        </li>
                        <li class="divider"></li>
                    </template>

                    <li>
                        <a href="#" @click.prevent="logout()"><i class="glyphicon glyphicon-off"></i> {{ $t('header.logout')}}</a>
                    </li>
                </ul>
            </li>

            <li><router-link to="/">{{ $t('menu.home') }}</router-link></li>
            <li><a href="http://forum.rpg-dbadventure.com" target="_blank">{{ $t('menu.forum') }}</a></li>
            <li><router-link to="/ranking">{{ $t('menu.ranking') }}</router-link></li>
            <li><router-link to="/history">{{ $t('menu.history') }}</router-link></li>
            <li><router-link to="/faq">{{ $t('menu.faq') }}</router-link></li>
            <li><router-link to="/contact">{{ $t('menu.contact') }}</router-link></li>
            <li><router-link to="/team">{{ $t('menu.team') }}</router-link></li>
        </ul>

        <div class="online-players" v-html="$t('header.connected', {nb: onlinePlayers})"></div>
    </header>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import ClickOutside from '~/directives/click-outside';

    export default {
        directives: {
            ClickOutside,
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/');
                this.closeMenu();
            },
            toggleMenu() {
                this.menuOpened = !this.menuOpened;
            },
            closeMenu() {
                this.menuOpened = false;
            },
        },
        data() {
            return {
                onlinePlayers: 0,
                menuOpened: false,
            };
        },
        async mounted() {
            await api.getOnlinePlayers().then((res) => {
                this.onlinePlayers = res.data.nbOnlinePlayers;
            });
        },
    };
</script>
