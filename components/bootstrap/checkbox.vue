<template>
    <a :is="isButton?'a':'label'" @click="toggle" :class="[isButton?'btn btn-'+typeColor:'open checkbox '+typeColor,{active:checked,disabled:disabled,readonly:readonly}]">
        <input v-if="name" type="hidden" :name="name" :value="checked?trueValue:falseValue" />
        <span v-if="!isButton" class="icon dropdown-toggle" :class="[checked?'btn-'+typeColor:'',{bg:typeColor==='default'}]"></span>
        <span v-if="!isButton&&checked&&typeColor==='default'" class="icon"></span>
        <slot></slot>
    </a>
</template>

<script type="text/ecmascript-6">
 export default {
     props: {
         button: {
             type: Boolean,
             default: false,
         },
         disabled: {
             type: Boolean,
             default: false,
         },
         falseValue: {
             default: false,
         },
         name: {
             type: String,
             default: null,
         },
         readonly: {
             type: Boolean,
             default: false,
         },
         trueValue: {
             default: true,
         },
         type: {
             type: String,
             default: null,
         },
         value: {
             default: false,
         },
     },
     data() {
         return {
             checked: (this.value === this.trueValue),
         };
     },
     computed: {
         isButton() {
             return this.button || (this.inGroup && this.$parent.buttons);
         },
         isFalse() {
             return this.value === this.falseValue;
         },
         isTrue() {
             return this.value === this.trueValue;
         },
         typeColor() {
             return (this.type || (this.$parent && this.$parent.type)) || 'default';
         },
     },
     watch: {
         checked(val) {
             const value = val ? this.trueValue : this.falseValue;
             this.$emit('checked', val);
             this.$emit('input', value);
             this.eval();
         },
         value(val) {
             const checked = val === this.trueValue;
             if (this.checked !== checked) {
                 this.checked = checked;
             }
         },
     },
     created() {
         const parent = this.$parent;
         if (parent && parent.isBtnGroup) {
             this.inGroup = true;
             parent.isCheckboxGroup = true;
             if (!(parent.val instanceof Array)) {
                 parent.val = [];
             }
             this.eval();
         }
     },
     mounted() {
         if (!this.$parent.isCheckboxGroup || typeof this.value === 'boolean') {
             return false;
         }

         if (this.$parent.val.length) {
             this.$emit('checked', this.$parent.val.indexOf(this.value) !== -1);
         } else if (this.checked) {
             this.$parent.val.push(this.value);
         }

         return true;
     },
     methods: {
         eval() {
             if (this.inGroup) {
                 const index = this.$parent.val.indexOf(this.value);
                 if (this.checked && index === -1) {
                     this.$parent.val.push(this.value);
                 }
                 if (!this.checked && index !== -1) {
                     this.$parent.val.splice(index, 1);
                 }
             }
         },
         toggle() {
             if (!this.disabled && !this.readonly) {
                 this.checked = !this.checked;
             }
         },
     },
 };
</script>

<style lang="scss" scoped>
 @import '~assets/scss/variables';

 label.checkbox {
     position: relative;
     padding-left: 30px;
     cursor:pointer;
     > input {
         box-sizing: border-box;
         position: absolute;
         z-index: -1;
         padding: 0;
         opacity: 0;
         margin: 0;
     }
     > .icon {
         position: absolute;
         top: -2px;
         left: 0;
         display: block;
         width: 24px;
         height: 24px;
         line-height:1rem;
         text-align: center;
         user-select: none;
         border-radius: 8px;
         background-repeat: no-repeat;
         background-position: center center;
         background-size: 50% 50%;
         background-color: transparent;
         border: 1px solid @input-border;
     }
     > input:focus ~ .icon {
         outline: 0;
         border: 1px solid @input-border;
         box-shadow: inset 0 1px 1px @gray-lighter,0 0 8px @input-border;
     }
     &.active {
         > .icon {
             background-size: 1rem 1rem;
             background-image: url('/images/icons/checked.png');
             background-color: transparent;
         }

         .btn-default {
             background-color: transparent;
         }
     }
     &.disabled,
     &.readonly,
     .btn.readonly {
         filter: alpha(opacity=65);
         box-shadow: none;
         opacity: .65;
     }
     label.btn > input[type=checkbox] {
         position: absolute;
         clip: rect(0,0,0,0);
         pointer-events: none;
     }
 }
</style>
