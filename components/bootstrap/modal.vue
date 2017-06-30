<template>
    <div class="modal-mask" @click="close()" v-show="showModal" transition="modal">
        <div class="modal-container container" @click.stop :style="{width: optionalWidth}">
            <slot name="modal-header"></slot>
            <slot name="modal-body">
                <div class="row"></div>
            </slot>
            <slot name="modal-footer"></slot>
            <div class="modal-outer" @click.stop>
                <slot name="modal-outer" class="row"></slot>
            </div>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
    /**
     * Component for custom and simple modal.
     * Only two events are available, ":show" and ":on-close",
     * more, you can press "Esc" key to close modal.
     */
    const ESC_KEY_CODE = 27;

    export default {
        name: 'modal',
        props: {
            show: {
                required: true,
                type: Boolean,
                default: false,
            },
            width: {
                default: null,
            },
            onClose: {
                required: true,
                type: Function,
            },
        },
        computed: {
            optionalWidth() {
                if (this.width === null) {
                    return null;
                } else if (Number.isInteger(this.width)) {
                    return `${this.width}px`;
                }

                return this.width;
            },
        },
        methods: {
            close() {
                this.onClose();
                this.showModal = false;
            },
        },
        watch: {
            show() {
                this.showModal = this.show;
            },
        },
        mounted() {
            document.addEventListener('keydown', (e) => {
                if (this.showModal && e.keyCode === ESC_KEY_CODE) {
                    this.onClose();
                }
            });
        },
        data() {
            return {
                showModal: this.show,
            };
        },
    };
</script>

<style rel="stylesheet/sass" lang="scss">
    @import '~assets/scss/variables';

    .modal-mask {
      text-align: center;
      padding: 0!important;
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s ease;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        margin-right: -4px; /* Adjusts for spacing */
      }
    }

    .modal-container {
      display: inline-block;
      text-align: left;
      vertical-align: middle;
      margin: $spacing-b * 2 auto 0;
      padding: $spacing-b ($spacing-b + $spacing);
      background-color: @color-light;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: @font-family-base;
      position:relative;
    }

    .modal-outer {
      left: 0;
      right: 0;
      bottom: -($spacing-b * 2);
      position: absolute;
      transition: all .3s ease;
      fon@click.stopfont-family-base;
    }

    .modal-body {
      margin: 0;
      padding: 0;
    }

    .modal-enter, .modal-leave {
      opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
      transform: 1.1;
    }
</style>
