<script type="text/ecmascript-6">
    export default {
        methods: {
            handleMessages(message) {
                if (message.message) {
                    const parameters = message.parameters;
                    if (parameters && parameters.name) {
                        parameters.name = this.$t(parameters.name);
                    }

                    return this.$t(
                        message.message,
                        parameters,
                    );
                }

                return this.$t(message);
            },
        },
    };
</script>
