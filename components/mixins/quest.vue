<script type="text/ecmascript-6">
    import Requirements from '~/components/utils/requirements';

    export default {
        components: {
            Requirements,
        },
        methods: {
            getRaces(data) {
                const races = [];
                data.forEach((d) => {
                    races.push(this.$t(d.name));
                });

                return races;
            },
        },
    };
</script>
