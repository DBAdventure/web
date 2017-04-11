
<template>
    <transition name="fade">
        <div v-show="val" :class="['alert', 'alert-'+type, placement]" :style="{width:width}" role="alert">
            <button v-show="dismissable" type="button" class="close" @click="val = false">
                <span>&times;</span>
            </button>
            <slot></slot>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
 const DURATION = 0;
 export default {
     props: {
         dismissable: {
             type: Boolean,
             default: false,
         },
         duration: {
             default: DURATION,
         },
         placement: {
             type: String,
         },
         type: {
             type: String,
         },
         value: {
             type: Boolean,
             default: true,
         },
         width: {
             type: String,
         },
     },
     data() {
         return {
             val: this.value,
         };
     },
     computed: {
         durationNum() {
             return parseInt(this.duration, DURATION);
         },
     },
     watch: {
         val(val) {
             if (val && this.durationNum > 0) {
                 this.delayClose();
             }
             this.$emit('input', val);
         },
         value(val) {
             if (this.val !== val) {
                 this.val = val;
             }
         },
     },
     methods: {
         delayClose() {
             setTimeout(() => {
                 this.val = false;
             }, this.durationNum);
         },
     },
 };
</script>

<style rel="stylesheet/sass" lang="scss">
 @import '~assets/scss/variables';

 .fade-enter-active,
 .fade-leave-active {
     transition: opacity .3s ease;
 }
 .fade-enter,
 .fade-leave-active {
     height: 0;
     opacity: 0;
 }
 .alert {
     &.top,
     &.top-right{
         position: fixed;
         top: $spacing * 3;
         z-index: 1050;
     }

     &.top {
         margin: 0 auto;
         left: 0;
         right: 0;
     }
     &.top-right {
         right: 50px;
     }
 }
</style>
