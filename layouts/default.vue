
<template>
  <div id="main">
    <dba-notification
      group="success"
      position="top right"
      :duration="10000000000000"
    />
    <dba-notification
      group="error"
      position="top right"
      :duration="10000000000000"
    />

    <dba-header />

    <div
      class="middle container-fluid"
      :class="$store.state.game.style"
    >
      <dba-menu />

      <div id="content">
        <div class="border-top">
          &nbsp;
        </div>
        <div class="body">
          <nuxt />
        </div>
        <div class="border-bottom">
          &nbsp;
        </div>
      </div>
      <div class="clearfix">
        &nbsp;
      </div>
    </div>

    <dba-footer />
  </div>
</template>

<script>
  import DbaHeader from '~/components/header';
  import DbaMenu from '~/components/menu';
  import DbaFooter from '~/components/footer';
  import DbaNotification from '~/components/utils/notification';

  export default {
    components: {
      DbaFooter,
      DbaHeader,
      DbaMenu,
      DbaNotification,
    },
    data() {
      return {
        interval: null,
      };
    },
    mounted() {
      this.$store.dispatch('game/fetch');
      this.$store.watch((state) => state.player.connected, (value) => {
        if (value) {
          this.interval = setInterval(() => {
            this.$store.dispatch('player/fetch');
          }, 60000);
        } else {
          clearInterval(this.interval);
        }
      });
    },
  };
</script>
