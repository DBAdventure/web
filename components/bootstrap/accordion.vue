<template>
    <div class="panel-group">
        <slot></slot>
    </div>
</template>

<script>
/* eslint-disable no-shadow, no-param-reassign */
export default {
    props: {
        type: {
            type: String,
            default: null,
        },
        oneAtAtime: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        openChild(child) {
            if (this.oneAtAtime) {
                this.$children.forEach((item) => {
                    if (child !== item) {
                        item.open = false;
                    }
                });
            }
        },
    },
    created() {
        this.isAccordion = true;
    },
};
/* eslint-enable no-shadow, no-param-reassign */
</script>
