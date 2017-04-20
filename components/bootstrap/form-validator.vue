<template><span><slot></slot></span></template>

<script>
export default {
    props: {
        enterSubmit: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: Boolean,
            default: false,
        },
        lang: {
            type: String,
            default: '',
        },
        value: null,
    },
    data() {
        return {
            children: [],
            valid: null,
            timeout: null,
        };
    },
    watch: {
        valid(val, old) {
            this.$emit('isvalid', val);
            this.$emit('input', val);
            this.$emit(!val ? 'invalid' : 'valid');
            if (val !== old && this.parent) {
                this.parent.validate();
            }
        },
    },
    methods: {
        validate() {
            const invalid = !this.children.every((el) => {
                if (el.validate) {
                    return el.validate();
                }
                if (el.valid !== undefined) {
                    return el.valid;
                }

                return el.required && ['', null, undefined].indexOf(el.value) === -1;
            });

            this.valid = !invalid;
            return !invalid;
        },
    },
    created() {
        this.formValidator = true;
        let parent = this.$parent;
        while (parent && !parent.formValidator) {
            parent = parent.$parent;
        }
        if (parent && parent.formValidator) {
            parent.children.push(this);
            this.parent = parent;
        }
    },
    mounted() {
        this.validate();
    },
    beforeDestroy() {
        if (this.parent) {
            const index = this.parent.children.indexOf(this);
            this.parent.children.splice(index, 1);
        }
    },
};
</script>
