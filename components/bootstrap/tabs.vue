<template>
    <div class="nav-list">
        <ul :class="navStyleClass" role="tablist">
            <li v-if="header.isTab" :class="{active:header.active, disabled:header.disabled}" @click.prevent="select(header)" v-for="header in headers">
                <slot name="header">
                    <a href="#">
                        <span v-html="header.header"></span>
                        <i class="icon-check" :class="{visible: header.isValid()}">&nbsp;</i>
                    </a>
                </slot>
            </li>
        </ul>
        <div class="tab-content">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
 export default {
     props: {
         justified: {type: Boolean, default: false},
         navStyle: {type: String, default: null},
         value: {type: Number, default: 0},
     },
     data() {
         return {
             index: this.value || 0,
             headers: [],
             tabs: [],
         };
     },
     watch: {
         index(val) {
             this.$emit('active', val);
             this.$emit('input', val);
         },
         value(val) {
             this.index = val;
         },
     },
     computed: {
         navStyleClass() {
             return [
                 'nav',
                 ['pills', 'stacked'].indexOf(this.navStyle) !== -1 ?
                 `nav-${this.navStyle}` :
                 'nav-tabs',
                 {
                     'nav-justified': this.justified,
                     'nav-pills': this.navStyle === 'stacked',
                 },
             ];
         },
         show() {
             return this.tabs[this.index] || this.tabs[0];
         },
     },
     methods: {
         select(tab) {
             if (!tab.disabled) {
                 this.index = this.tabs.indexOf(tab);
             }
         },
     },
     created() {
         this.isTabs = true;
     },
 };
</script>

<style lang="scss" scoped>
 @import '~assets/scss/variables';

 [tabs] > .tab-content {
     margin: 15px 0;
 }

 .nav-list  {
     .icon-check {
         margin-left: $spacing-s;
         width: $spacing-b;
         visibility: hidden;
         font-size: @font-size-small;
         &.visible {
             visibility: visible;
         }
         &:before {
             opacity: 1;
         }
     }

     .nav-tabs > li > a {
         border-color: transparent;
         padding-left: 0;
         margin-right: $spacing-b;
         padding-right: 0;
         padding-bottom: $spacing * 2;
         span {
             border-bottom: 2px solid;
             padding-bottom: 6px;
         }
     }
 }


</style>
