
<template>
  <div id="main">
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

<script type="text/ecmascript-6">
  import DbaHeader from '~/components/header';
  import DbaMenu from '~/components/menu';
  import DbaFooter from '~/components/footer';

  export default {
    components: {
      DbaHeader,
      DbaMenu,
      DbaFooter,
    },
    data() {
      return {
        interval: null,
      };
    },
    mounted() {
      this.$store.dispatch('fetchGameData');
      this.$store.watch((state) => state.player.connected, (value) => {
        if (value) {
          this.interval = setInterval(() => {
            this.$store.dispatch('fetchPlayer');
          }, 60000);
        } else {
          clearInterval(this.interval);
        }
      });
    },
  };
</script>
