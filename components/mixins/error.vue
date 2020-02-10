<script type="text/ecmascript-6">
  export default {
    methods: {
      raiseError() {
        this.$Loading.error();
        this.$Notice.error({
          title: this.$t('notice.error'),
          desc: this.$t('notice.generic'),
        });
      },
    },
  };
</script>
