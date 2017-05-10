<template>
    <span ref="trigger">
        <slot></slot>
        <transition :name="effect">
            <div ref="popover" v-if="show" :class="['popover',placement]">
                <div class="arrow"></div>
                <h3 class="popover-title" v-if="title"><slot name="title">{{title}}</slot></h3>
                <div class="popover-content"><slot name="content"><span v-html="content"></span></slot></div>
            </div>
        </transition>
    </span>
</template>

<script>
export default {
    props: {
        content: {type: String},
        title: {type: String},
        effect: {type: String, default: 'fade'},
        header: {type: Boolean, default: true},
        placement: {type: String, default: 'top'},
        trigger: {type: String, default: 'hover'},
    },
    data() {
        return {
            top: 0,
            left: 0,
            show: false,
        };
    },
    computed: {
        events() {
            return {
                contextmenu: ['contextmenu'],
                hover: ['mouseleave', 'mouseenter'],
                focus: ['blur', 'focus'],
            }[this.trigger] || ['click'];
        },
    },
    methods: {
        beforeEnter() {
            this.position();
            setTimeout(() => this.position(), 30);
        },
        position() {
            this.$nextTick(() => {
                const popover = this.$refs.popover;
                const trigger = this.$refs.trigger.children[0];
                switch (this.placement) {
                    case 'top':
                        this.left = (trigger.offsetLeft - (
                            popover.offsetWidth / 2)
                        ) + (trigger.offsetWidth / 2);
                        this.top = trigger.offsetTop - popover.offsetHeight;
                        break;
                    case 'left':
                        this.left = trigger.offsetLeft - popover.offsetWidth;
                        this.top = (trigger.offsetTop + (
                            trigger.offsetHeight / 2)
                        ) - (popover.offsetHeight / 2);
                        break;
                    case 'right':
                        this.left = trigger.offsetLeft + trigger.offsetWidth;
                        this.top = (trigger.offsetTop + (
                            trigger.offsetHeight / 2)
                        ) - (popover.offsetHeight / 2);
                        break;
                    case 'bottom':
                        this.left = (trigger.offsetLeft - (
                            popover.offsetWidth / 2)
                        ) + (trigger.offsetWidth / 2);
                        this.top = trigger.offsetTop + trigger.offsetHeight;
                        break;
                    default:
                        console.warn('Wrong placement prop');
                }
                popover.style.top = `${this.top}px`;
                popover.style.left = `${this.left}px`;
            });
        },
        toggle(e) {
            if (e && this.trigger === 'contextmenu') {
                e.preventDefault();
            }

            this.show = !this.show;
            if (this.show) {
                this.beforeEnter();
            }
        },
    },
    mounted() {
        const trigger = this.$refs.trigger.children[0];
        if (!trigger) {
            return console.error('Could not find trigger v-el in your component that uses popoverMixin.');
        }

        this.events.forEach((event) => {
            $(trigger).on(event, this.toggle);
        });
        return true;
    },
    beforeDestroy() {
        if (this._trigger) {
            $(this._trigger).off();
        }
    },
};
</script>

<style>
.popover.top,
.popover.left,
.popover.right,
.popover.bottom {
    display: block;
}
.scale-enter {
    animation:scale-in 0.15s ease-in;
}
.scale-leave-active {
    animation:scale-out 0.15s ease-out;
}
@keyframes scale-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
@keyframes scale-out {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0);
        opacity: 0;
    }
}
</style>
