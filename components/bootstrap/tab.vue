<template>
    <div ref="panel" role="tabpanel" :class="['tab-pane',{'active fade':active,'in':fadein}]">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        disabled: {type: Boolean, default: false},
        header: {type: String},
        valid: {default: false},
    },
    data() {
        return {
            fadein: false,
        };
    },
    methods: {
        isValid() {
            return ['', null, undefined, false].indexOf(this.valid) === -1;
        },
    },
    computed: {
        active() {
            const active = !this.tabs || this.tabs.show === this;
            this.fadein = false;
            if (active) {
                setTimeout(() => {
                    this.fadein = true;
                }, 0);
            }

            return active;
        },
        index() {
            return this.tabs.tabs.indexOf(this);
        },
        transition() {
            return this.tabs ? this.tabs.effect : null;
        },
    },
    created() {
        this.isTab = true;
        let tab = this;
        while (!this.tabs && tab.$parent) {
            if (tab.isTabGroup) {
                tab.tabs.push(this);
                this.tabGroup = tab;
            }
            if (tab.isTabs) {
                tab.tabs.push(this);
                this.tabs = tab;
                if (!this.tabGroup) {
                    tab.headers.push(this);
                }
            }
            tab = tab.$parent;
        }

        if (!this.tabs) {
            throw Error('tab depend on tabs.');
        }
    },
    beforeDestroy() {
        let id;
        if (this.tabGroup) {
            this.tabGroup.tabs = this.tabGroup.tabs.filter(el => el !== this);
        }
        if (this.tabs) {
            this.tabs.tabs = this.tabs.tabs.filter(el => el !== this);
        }

        if (this.tabs) {
            if (this.tabs.active === this.index) {
                this.tabs.index = 0;
            }
            if (this.ingroup) {
                id = this.$parent.tabs.indexOf(this);
                if (id !== -1) {
                    this.$parent.tabs.splice(id, 1);
                }
            }
        }
        if (this.tabs) {
            id = this.tabs.tabs.indexOf(this);
            if (id !== -1) {
                this.tabs.tabs.splice(id, 1);
            }
        }
    },
};
</script>
