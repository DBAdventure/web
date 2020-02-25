<script>
  export default {
    methods: {
      raiseError() {
        this.$nuxt.$loading.error();
        this.$notify({
          group: 'error',
          title: this.$t('notice.error'),
          text: this.$t('notice.generic'),
        });
      },
    },
  };
</script>
