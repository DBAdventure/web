<template>
  <div class="error-page">
    <div>
      <h1 class="error-code">
        {{ error.statusCode }}
      </h1>
      <div class="error-wrapper-message">
        <h2 class="error-message">
          {{ $t(error.message) }}
        </h2>
      </div>
      <p v-if="error.statusCode === 404">
        <nuxt-link
          class="error-link"
          to="/"
        >
          {{ $t('error.home') }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    layout: 'error',
    name: 'NuxtError',
    props: {
      error: {
        type: Object,
        required: true,
      },
    },
    head() {
      return {
        title: this.$t(this.error.message) || 'An error occured',
      };
    },
    mounted() {
      this.$store.watch((state) => state.player.connected, (value) => {
        if (value) {
          this.$router.go(this.$router.currentRoute);
        }
      });
    },
  };
</script>

<style scoped>
    .error-page {
      color: #000;
      top: 0;
      font-family: "SF UI Text", "Helvetica Neue", "Lucida Grande";
      text-align: center;
      padding-top: 40px;
    }
    .error-code {
      display: inline-block;
      font-size: 24px;
      font-weight: 500;
      vertical-align: top;
      border-right: 1px solid rgba(0, 0, 0, 0.298039);
      margin: 0px 20px 0px 0px;
      padding: 10px 23px;
    }
    .error-wrapper-message {
      display: inline-block;
      text-align: left;
      line-height: 49px;
      height: 49px;
      vertical-align: middle;
    }
    .error-message {
      font-size: 14px;
      font-weight: normal;
      margin: 0px;
      padding: 0px;
    }
    .error-link {
      font-weight: normal;
      text-decoration: none;
      font-size: 14px;
    }
</style>
