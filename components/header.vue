<template>
  <header
    class="header"
    :class="$store.state.game.style"
  >
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item-dropdown v-if="this.$store.state.player.connected">
          <template v-slot:button-content>
            <img
              :src="currentPlayer.getImagePath()"
              :alt="currentPlayer.getDisplayName()"
            > {{ currentPlayer.getDisplayName() }} <b class="caret" />
          </template>

          <b-dropdown-item to="/account/profile">
            <b-icon icon="person" />
            {{ $t('header.profile') }}
          </b-dropdown-item>
          <b-dropdown-item to="/account/settings">
            <b-icon icon="controller" />
            {{ $t('header.settings') }}
          </b-dropdown-item>
          <b-dropdown-item to="/account/training-room">
            <b-icon icon="building" /> {{ $t('header.training.room') }}
            <span
              class="badge"
              v-if="currentPlayer.skillPoints > 0"
            >{{ currentPlayer.skillPoints }}</span>
          </b-dropdown-item>
          <b-dropdown-item to="/account/appearance">
            <b-icon icon="image" />
            {{ $t('header.appearance') }}
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>

          <template v-if="currentPlayer.is_admin">
            <b-dropdown-item href="/admin" target="_blank">
              <b-icon icon="gear" />
              {{ $t('header.admin') }}
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
          </template>

          <b-dropdown-item href="#" @click.prevent="logout()">
            <b-icon icon="log-out" />
            {{ $t('header.logout') }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item to="/">
          {{ $t('menu.home') }}
        </b-nav-item>
        <b-nav-item to="/ranking">
          {{ $t('menu.ranking') }}
        </b-nav-item>
        <b-nav-item to="/history">
          {{ $t('menu.history') }}
        </b-nav-item>
        <b-nav-item to="/faq">
          {{ $t('menu.faq') }}
        </b-nav-item>
        <b-nav-item to="/rules">
          {{ $t('menu.rules.supports') }}
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <div
      class="online-players"
      v-html="$t('header.connected', {nb: onlinePlayers})"
    />
  </header>
</template>

<script>
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
