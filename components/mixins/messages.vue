<script>
  export default {
    methods: {
      handleMessages(data) {
        if (data.message) {
          const {parameters} = data;
          if (parameters && parameters.name) {
            parameters.name = this.$t(parameters.name);
          }

          return this.$t(
            data.message,
            parameters,
          );
        }

        return this.$t(data);
      },
    },
  };
</script>
