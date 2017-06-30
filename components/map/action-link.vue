<template>
    <a href="#" @click.prevent="runAction">
        <img :src="imagePath" :alt="$t(`map.action.${what}`, {'AP': action})" :title="$t(`map.action.${what}`, {'AP': action})"  />
    </a>
</template>

<script type="text/ecmascript-6">
    import settings from '~/config/general.config';

    export default {
        props: {
            player: {
                type: Object,
                required: true,
            },
            me: {
                type: Object,
                required: true,
            },
            what: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                settings,
            };
        },
        computed: {
            action() {
                return settings.player[`${this.what.toUpperCase()}_ACTION`];
            },
            imagePath() {
                if (this.player.isPlayer()) {
                    return this.player.getActionImagePath(this.what);
                }

                return this.me.getActionImagePath(this.what);
            },
        },
        method: {
            runAction() {
                this.$emit('run-action', {action: this.action, id: this.player.id});
            },
        },
    };
</script>
