<template>
    <header class="header" :class="$store.state.style">
        <ul class="nav navbar-nav">
            <li class="dropdown" v-if="$store.state.player.connected">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img :src="$store.state.player.imagePath" :alt="$store.state.player.name"/> {{ $store.state.player.name }} <b class="caret"></b>
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
                            <span class="badge" v-if="$store.state.player.skillPoints > 0">{{ $store.state.player.skillPoints }}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/appearance">
                            <i class="glyphicon glyphicon-pencil"></i> {{ $trans('header.appearance') }}
                        </router-link>
                    </li>
                    <li class="divider"></li>
                    <template v-if="$store.state.player.isModo">
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
export default {
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        },
    },
    data() {
        return {
            player: this.$store.state.player,
            onlinePlayers: 0,
        };
    },
};
</script>
