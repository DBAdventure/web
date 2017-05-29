<template>
    <div ref="select" :class="classes" v-click-outside="close">
        <div ref="btn" class="form-control dropdown-toggle" tabindex="1" :disabled="disabled" :readonly="readonly"
             @blur="canSearch ? null : close()"
             @click="toggle()"
             @keydown.esc.stop.prevent="close"
             @keydown.space.stop.prevent="toggle"
             @keydown.enter.stop.prevent="toggle"
        >
            <span class="btn-content" v-html="loading ? $t('strap.loading') : (showPlaceholder || selected)"></span>
            <i class="icon-select pull-right"></i>
            <span v-if="clearButton && values.length" class="close" @click="clear()">&times;</span>
        </div>

        <select ref="sel" v-model="val" :name="name" class="secret" :multiple="multiple" :required="required" :readonly="readonly" :disabled="disabled">
            <option v-if="required" value=""></option>
            <option v-for="option in list" :value="option[optionsValue]">{{ $t(option[optionsLabel]) }}</option>
        </select>

        <ul class="dropdown-menu">
            <template v-if="list.length">
                <li v-if="canSearch" class="bs-searchbox">
                    <input type="text" :placeholder="searchText||$t('strap.search')" class="form-control" autocomplete="off" ref="search"
                           v-model="searchValue"
                           @keyup.esc="close"
                    />
                    <span v-show="searchValue" class="close" @click="clearSearch">&times;</span>
                </li>
                <li v-if="required && !clearButton"><a @mousedown.prevent="clear() && close()">{{ showPlaceholder }}</a></li>
                <li v-for="option in filteredOptions" :id="option[optionsValue]">
                    <a @mousedown.prevent="select(option[optionsValue])">
                        <span v-html="$t(option[optionsLabel])"></span>
                        <span class="glyphicon glyphicon-ok check-mark" v-show="isSelected(option[optionsValue])"></span>
                    </a>
                </li>
            </template>
            <slot></slot>
            <transition v-if="notify && !closeOnSelect" name="fadein"><div class="notify in">{{limitText}}</div></transition>
        </ul>
        <transition v-if="notify && closeOnSelect" name="fadein"><div class="notify out"><div>{{limitText}}</div></div></transition>
    </div>
</template>

<script type="text/ecmascript-6">
import ClickOutside from '~/directives/click-outside';

const timeout = {};

export default {
    directives: {
        ClickOutside,
    },
    props: {
        clearButton: {type: Boolean, default: false},
        closeOnSelect: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
        lang: {type: String, default: ''},
        limit: {type: Number, default: 1024},
        minSearch: {type: Number, default: 0},
        multiple: {type: Boolean, default: false},
        name: {type: String, default: null},
        options: {type: Array, default() { return []; }},
        optionsLabel: {type: String, default: 'label'},
        optionsValue: {type: String, default: 'value'},
        placeholder: {type: String, default: null},
        readonly: {type: Boolean, default: null},
        required: {type: Boolean, default: null},
        search: {type: Boolean, default: false},
        searchText: {type: String, default: null},
        url: {type: String, default: null},
        value: null,
    },
    data() {
        return {
            list: [],
            loading: null,
            searchValue: null,
            show: false,
            notify: false,
            val: this.value,
            valid: null,
        };
    },
    computed: {
        canSearch() {
            return this.minSearch ? this.list.length >= this.minSearch : this.search;
        },
        classes() {
            return [
                {
                    open: this.show,
                    disabled: this.disabled,
                },
                this.class,
                'btn-group',
                'input-select',
            ];
        },
        filteredOptions() {
            const search = (this.searchValue || '').toLowerCase();
            if (!search) {
                return this.list;
            }

            return this.list.filter(
                el => el[this.optionsLabel].toLowerCase().search(search) !== -1,
            );
        },
        limitText() {
            return this.$t('strap.limit', {limit: this.limit});
        },
        selected() {
            if (this.list.length === 0) {
                return '';
            }

            const sel = this.values.map(
                val => (
                    this.list.find(
                        o => o[this.optionsValue] === val,
                    ) || {}
                )[this.optionsLabel]).filter(
                    val => val !== undefined,
                );
            this.$emit('selected', sel);
            return sel.join(', ');
        },
        showPlaceholder() {
            return this.$t(this.selected) || this.placeholder || this.$t('strap.notSelected');
        },
        text() {
            return this.lang;
        },
        values() {
            if (this.val instanceof Array) {
                return this.val;
            }

            if ([null, undefined].indexOf(this.val) === -1) {
                return [this.val];
            }

            return [];
        },
        valOptions() {
            return this.list.map(el => el[this.optionsValue]);
        },
    },
    watch: {
        options(options) {
            if (options instanceof Array) {
                this.setOptions(options);
            }
        },
        show(val) {
            if (val) {
                if (this.$refs.search) {
                    this.$refs.search.focus();
                } else {
                    this.$refs.btn.focus();
                }
            }
        },
        url() {
            this.urlChanged();
        },
        valid(val) {
            this.$emit('isvalid', val);
            this.$emit(!val ? 'invalid' : 'valid');
        },
        value(val, old) {
            if (val !== old) {
                this.val = val;
            }
        },
        val(val, old) {
            let newValue = val;
            if (newValue === undefined) {
                this.val = null;
                newValue = null;
            }

            if (newValue !== old) {
                this.$emit('change', newValue);
                this.$emit('input', newValue);
            }
            if (newValue instanceof Array && newValue.length > this.limit) {
                this.val = newValue.slice(0, this.limit);
                this.notify = true;
                if (timeout.limit) clearTimeout(timeout.limit);
                timeout.limit = setTimeout(() => {
                    timeout.limit = false;
                    this.notify = false;
                }, 1500);
            }

            this.valid = this.validate();
        },
    },
    methods: {
        close() {
            this.show = false;
            this.searchValue = '';
        },
        checkData() {
            if (this.multiple) {
                if (this.limit < 1) {
                    this.limit = 1;
                }

                if (!(this.val instanceof Array)) {
                    this.val = (this.val === null || this.val === undefined) ? [] : [this.val];
                }

                const values = this.valOptions;
                this.val = this.val.filter(el => values.indexOf(el) !== -1);
                if (this.values.length > this.limit) {
                    this.val = this.val.slice(0, this.limit);
                }
            } else if (this.valOptions.indexOf(this.val) === -1) {
                this.val = null;
            }
        },
        clear() {
            if (this.disabled || this.readonly) {
                return;
            }
            this.val = this.val instanceof Array ? [] : null;
            this.toggle();
        },
        clearSearch() {
            this.searchValue = '';
            this.$refs.search.focus();
        },
        isSelected(v) {
            return this.values.indexOf(v) > -1;
        },
        select(v) {
            if (this.val instanceof Array) {
                const newVal = this.val.slice(0);
                if (newVal.indexOf(v) !== -1) {
                    newVal.splice(newVal.indexOf(v), 1);
                } else {
                    newVal.push(v);
                }
                this.val = newVal;
                if (this.closeOnSelect) {
                    this.toggle();
                }
            } else {
                this.val = v;
                this.toggle();
            }
        },
        setOptions(options) {
            this.list = options.map((el) => {
                if (el instanceof Object) {
                    return el;
                }
                const obj = {};
                obj[this.optionsLabel] = el;
                obj[this.optionsValue] = el;
                return obj;
            });
            this.$emit('options', this.list);
        },
        toggle() {
            this.show = !this.show;
            if (!this.show) this.$refs.btn.focus();
        },
        urlChanged() {
            if (!this.url || !this.$http) {
                return;
            }
            this.loading = true;
            this.$http.get(this.url).then((response) => {
                let data = response.data instanceof Array ? response.data : [];
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    // Don't care
                }
                this.setOptions(data);
                this.loading = false;
                this.checkData();
            }, () => {
                this.loading = false;
            });
        },
        validate() {
            if (!this.required) {
                return true;
            }

            if (this.val instanceof Array) {
                return this.val.length > 0;
            }

            return this.val !== null;
        },
    },
    created() {
        this.setOptions(this.options);
        this.val = this.value;
        this.isSelect = true;
        if (this.val === undefined) {
            this.val = null;
        }
        if (!this.multiple && this.val instanceof Array) {
            this.val = this.val[0];
        }

        this.checkData();
        if (this.url) {
            this.urlChanged();
        }
    },
    mounted() {
        this.setOptions(this.options);
        this.val = this.value;
        this.checkData();
    },
};
</script>

<style rel="stylesheet/sass" lang="scss">
@import '~assets/scss/variables';

.input-select {
    .form-control.dropdown-toggle,.dropdown-menu {
        cursor:pointer;
    }
    .form-control.dropdown-toggle {
        height: $input-height-base + 2;
        padding-top: $spacing;
        .btn-content {
            color: $input-color;
        }
        .icon-select {
            padding-left: $spacing-b;
            padding-top: $spacing-s;
            font-size: $font-size-small;
        }
        > .close {
            margin-left: $spacing-s;
            margin-top: $spacing - 2;
            margin-right: $spacing-b;
        }
    }
    .bs-searchbox {
        position: relative;
        margin: 4px 8px;
        .close {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
            display: block;
            width: 34px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            margin-top: $spacing - 2;
        }
    }

    .bs-searchbox input:focus,
    .form-control.dropdown-toggle:focus {
        outline: 0;
        border-color: $input-border !important;
        box-shadow: inset 0 1px 1px $gray-lighter,0 0 8px $input-border;
    }

    .secret {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    .notify  {
        &.out { position: relative; }
        &.in, >div {
            position: absolute;
            width: 96%;
            margin: 0 2%;
            min-height: 26px;
            padding: 3px $spacing-s;
            background: $dropdown-link-hover-bg;
            border: 1px solid $dropdown-border;
            box-shadow: inset 0 1px 1px $gray-darker;
            pointer-events: none;
        }
        >div {
            top: $spacing-s;
            z-index: 1;
        }
        &.in {
            opacity: .9;
            bottom: $spacing-s;
        }
    }

}
.btn-group-justified  {
    .dropdown-toggle>span:not(.close) {
        width: calc(100% - 18px);
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: -4px;
    }
    .dropdown-menu {
        width: 100%;
    }
}
</style>
