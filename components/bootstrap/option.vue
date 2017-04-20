<template>
    <li v-if="loading">
        <slot></slot>
    </li>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        value: null,
    },
    data() {
        return {
            loading: true,
        };
    },
    mounted() {
        if (this.$parent.isSelect) {
            if (!this.$parent.options) {
                this.$parent.options = [];
            }
            const el = {};
            el[this.$parent.optionsLabel] = this.$el.innerHTML;
            el[this.$parent.optionsValue] = this.value;
            this.$parent.options.push(el);
            this.loading = false;
        } else {
            console.warn('options only work inside a select component');
        }
    },
};
</script>
