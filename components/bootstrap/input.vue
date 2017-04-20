<template>
    <div class="form-group" :class="{validate:canValidate,'has-feedback':icon,'has-error':canValidate && valid===false,'has-success':canValidate && valid}">
        <slot name="label"><label v-if="label" class="control-label" :class="labelClasses" @click="focus">{{label}}</label></slot>
        <div v-if="$slots.before||$slots.after" class="input-group" :class="containerClasses">
            <slot name="before"></slot>
            <textarea :is="type=='textarea'?type:'input'" class="form-control" ref="input"
                      :cols="cols"
                      :disabled="disabled"
                      :list="idDatalist"
                      :max="attr(max)"
                      :maxlength="maxlength"
                      :min="attr(min)"
                      :name="name"
                      :placeholder="placeholder"
                      :readonly="readonly"
                      :required="required"
                      :rows="rows"
                      :step="step"
                      :title="attr(title)"
                      :type="type=='textarea'?null:type"
                      v-model="val"
                      @blur="emit" @focus="emit" @input="emit"
                      @keyup.enter="type!='textarea' && enterSubmit && submit()"
            ></textarea>
            <div v-if="clearButton && value" :class="{icon:icon}">
                <span class="close" @click="value = ''">&times;</span>
            </div>
            <div v-if="icon" class="icon">
                <span v-if="icon && valid !== null" :class="['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]" aria-hidden="true"></span>
            </div>
            <slot name="after"></slot>
        </div>
        <div :class="containerClasses" v-else>
            <textarea :is="type=='textarea'?type:'input'" class="form-control" ref="input"
                      :cols="cols"
                      :disabled="disabled"
                      :list="idDatalist"
                      :max="attr(max)"
                      :maxlength="maxlength"
                      :min="attr(min)"
                      :name="name"
                      :placeholder="placeholder"
                      :readonly="readonly"
                      :required="required"
                      :rows="rows"
                      :step="step"
                      :title="attr(title)"
                      :type="type=='textarea'?null:type"
                      v-model="val"
                      @blur="emit" @focus="emit" @input="emit"
                      @keyup.enter="type!='textarea' && enterSubmit && submit()"
            ></textarea>
            <span v-if="clearButton && val" class="close" @click="val = ''">&times;</span>
            <span v-if="icon&& valid!==null" :class="['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]" aria-hidden="true"></span>
        </div>
        <datalist v-if="idDatalist" :id="idDatalist">
            <option v-for="opc in options" :value="opc"></option>
        </datalist>
        <div v-if="showHelp" class="help-block" @click="focus">{{help}}</div>
        <div v-if="showError" class="help-block with-errors" @click="focus">{{errorText}}</div>
        <div v-if="showCounter" class="pull-right with-counter">{{counterText}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
const DELAY = 300;

export default {
    props: {
        clearButton: {type: Boolean, default: false},
        cols: {type: Number, default: null},
        datalist: {type: Array, default: null},
        disabled: {type: Boolean, default: false},
        enterSubmit: {type: Boolean, default: false},
        counter: {type: Boolean, default: false},
        error: {type: String, default: null},
        help: {type: String, default: null},
        hideHelp: {type: Boolean, default: true},
        icon: {type: Boolean, default: false},
        label: {type: String, default: null},
        labelClasses: {type: String, default: ''},
        containerClasses: {type: String, default: ''},
        lang: {type: String, default: ''},
        mask: null,
        maskDelay: {type: Number, default: 100},
        match: {type: String, default: null},
        max: {type: String, default: null},
        maxlength: {type: Number, default: null},
        min: {type: String, default: null},
        minlength: {type: Number, default: 0},
        name: {type: String, default: null},
        pattern: {default: null},
        placeholder: {type: String, default: null},
        readonly: {type: Boolean, default: false},
        required: {type: Boolean, default: false},
        rows: {type: Number, default: 3},
        step: {type: Number, default: null},
        type: {type: String, default: 'text'},
        url: {type: String, default: null},
        urlMap: {type: Function, default: null},
        validationDelay: {type: Number, default: 250},
        value: {default: null},
    },
    data() {
        return {
            options: this.datalist,
            val: this.value,
            valid: null,
            timeout: null,
        };
    },
    computed: {
        canValidate() {
            return !this.disabled && !this.readonly && (
                this.required || this.regex || this.nativeValidate || this.match !== null
            );
        },
        errorText() {
            const value = this.value;
            const error = [this.error];
            if (!value && this.required) {
                error.push(`(${this.$trans('strap.required')})`);
            }
            if (value && (value.length < this.minlength)) {
                error.push(`(${this.$trans('strap.minlength')}: ${this.minlength})`);
            }
            return error.join(' ');
        },
        counterText() {
            if (!this.attr(this.maxlength) && !this.attr(this.minlength)) {
                return '';
            }

            const text = [];
            if (this.minlength) {
                text.push(this.$trans('strap.minCharacters', {value: this.minlength}));
            }

            if (this.maxlength) {
                const value = this.value;
                let length = this.maxlength;
                if (value && value.length) {
                    length -= value.length;
                }
                text.push(this.$trans('strap.maxCharacters', {value: length}));
            }

            return text.join(' - ');
        },
        idDatalist() {
            if (this.type !== 'textarea' && this.datalist instanceof Array) {
                if (!this.idDatalistData) {
                    if (!this.$root.idDatalist) {
                        this.$root.idDatalist = 0;
                    }
                    this.idDatalistData = `input-datalist${this.$root.idDatalist += 1}`;
                }
                return this.idDatalistData;
            }
            return null;
        },
        input() {
            return this.$refs.input;
        },
        nativeValidate() {
            return (this.input || {}).checkValidity && (
                ['url', 'email'].indexOf(this.type.toLowerCase()) !== -1 || this.min || this.max
            );
        },
        regex() {
            return this.pattern !== null ? new RegExp(this.pattern) : null;
        },
        showCounter() {
            return this.counter;
        },
        showError() {
            return this.error && this.valid === false;
        },
        showHelp() {
            return this.help && (!this.showError || !this.hideHelp);
        },
        text() {
            return this.lang;
        },
        title() {
            return this.errorText || this.help || '';
        },
    },
    watch: {
        datalist(val, old) {
            if (val !== old && val instanceof Array) {
                this.options = val;
            }
        },
        match() {
            this.eval();
        },
        options(val, old) {
            if (val !== old) {
                this.$emit('options', val);
            }
        },
        url() {
            this.urlDelay();
        },
        val(val, old) {
            this.$emit('input', val);
            if (val !== old) {
                if (this.mask instanceof Function) {
                    const newValue = this.mask(val || '');
                    if (this.val !== newValue) {
                        if (this.timeout.mask) {
                            clearTimeout(this.timeout.mask);
                        }
                        this.timeout.mask = setTimeout(() => {
                            this.val = newValue;
                        }, isNaN(this.maskDelay) ? 0 : this.maskDelay);
                    }
                }
                this.eval();
            }
        },
        valid(val) {
            this.$emit('isvalid', val);
            this.$emit(!val ? 'invalid' : 'valid');
            if (this.parent) {
                this.parent.validate();
            }
        },
        value(val) {
            if (this.val !== val) {
                this.val = val;
            }
        },
    },
    methods: {
        attr(value) {
            return ['', null, undefined].indexOf(value) !== -1 || value instanceof Function ? null : value;
        },
        emit(e) {
            this.$emit(e.type, e.type === 'input' ? e.target.value : e);
            if (e.type === 'blur' && this.canValidate) {
                this.valid = this.validate();
            }
        },
        eval() {
            if (this.timeout.eval) {
                clearTimeout(this.timeout.eval);
            }

            if (!this.canValidate) {
                this.valid = true;
            } else {
                this.timeout.eval = setTimeout(() => {
                    this.valid = this.validate();
                    this.timeout.eval = null;
                }, this.validationDelay);
            }
        },
        focus() {
            this.input.focus();
        },
        submit() {
            if (this.input.form) {
                const invalids = this.$el.querySelector(
                    '.form-group.validate:not(.has-success)',
                    this.input.form,
                );
                if (invalids.length) {
                    invalids.find('input,textarea,select')[0].focus();
                } else {
                    this.input.form.submit();
                }
            }
        },
        validate() {
            if (!this.canValidate) {
                return true;
            }
            const value = ((typeof this.val === 'string' && this.val) || '').trim();
            if (!value) {
                return !this.required;
            }
            if (this.match !== null) {
                return this.match === value;
            }
            if (value.length < this.minlength) {
                return false;
            }
            if (this.nativeValidate && !this.input.checkValidity()) {
                return false;
            }
            if (this.regex) {
                return this.regex instanceof Function ?
                       this.regex(this.value) :
                       this.regex.test(this.value);
            }

            return true;
        },
        reset() {
            this.value = '';
            this.valid = null;
            if (this.timeout.mask) {
                clearTimeout(this.timeout.mask);
            }
            if (this.timeout.eval) {
                clearTimeout(this.timeout.eval);
            }
        },
    },
    created() {
        this.timeout = {};
        this.urlDelay = setTimeout(() => {
            if (!this.url || !this.$http || this.isLoading) {
                return;
            }

            this.isLoading = true;
            this.$http.get(this.url).then((response) => {
                let data = response.data instanceof Array ? response.data : [];
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    // Don't care
                }

                if (this.urlMap) {
                    data = data.map(this.urlMap);
                }
                this.options = data;
                this.loading = false;
            }, () => {
                this.loading = false;
            });
        }, DELAY);
        if (this.url) {
            this.urlDelay();
        }
    },
    beforeDestroy() {
        if (this.parent) {
            this.parent.children.splice(
                this.parent.children.indexOf(this),
                1,
            );
        }
    },
};
</script>

<style rel="stylesheet/sass" lang="scss">
@import '~assets/scss/variables';

.form-group {
    position: relative;
}

label~.close {
    top: 25px;
}
.input-group>.icon {
    position: relative;
    display: table-cell;
    width:0;
    z-index: 3;
}
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
}
.has-feedback .close {
    right: 20px;
}
.with-counter {
    font-size: $font-size-small;
    padding-top: $padding-large-vertical;
}
</style>
