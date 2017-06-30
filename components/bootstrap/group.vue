<template>
    <div :class="{'btn-group':buttons,'btn-group-justified':justified,'btn-group-vertical':vertical}" :data-toggle="buttons && 'buttons'">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            buttons: {default: false},
            justified: {type: Boolean, default: false},
            type: {type: String, default: 'default'},
            value: {
                type: Array,
                default() {
                    return [];
                },
            },
            vertical: {type: Boolean, default: false},
        },
        data() {
            this.isBtnGroup = true;
            return {
                val: this.value,
            };
        },
        watch: {
            val(val) {
                this.$emit('input', val);
            },
            value(val) {
                if (this.val !== val) {
                    this.val = val;
                }
            },
        },
    };
</script>
