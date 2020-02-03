<template>
    <div v-click-outside="hide" ref="element" class="ui-select ui-select__field closed" :class="{ 'active': shown }" @click="toggle">
        <select :multiple="multiple">
            <option v-for="option in options" :key="option.id">{{ option.label }}</option>
        </select>

        <div class="ui-select__value">
            {{ selectedValue }}
        </div>

        <ui-icon name="el-icon-circle-close" @click.native.stop="clearValue" />

        <div class="ui-select__arrow">
            <ui-icon name="el-icon-arrow-down" />
        </div>

        <div ref="hint" class="ui-select__hint" :class="{ 'hidden': !shown, 'shown': shown }">
            <div ref="hintWindow" class="ui-select__window" style="min-width: 200px;">
                <div v-if="searchable" class="ui-select__window-header">
                    <input type="search" />
                </div>
                <div class="ui-select__window-body" style="position: relative;">
                    <span ref="scrollerUp" class="ui-select__scroller-up hide" />
                    <ul ref="hintBody">
                        <li v-for="option in options" :key="option.id" @click="select(option)">
                            <div class="ui-select__option-title">{{ option.label }}</div>
                            <div v-if="option.description" class="ui-select__option-description">
                                {{ option.description }}
                            </div>
                        </li>
                    </ul>
                    <span ref="scrollerDown" class="ui-select__scroller-down hide" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UiIcon from './icon';
import ClickOutside from '../directives/click-outside/click-outside';

function offset(el) {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

export default {
    name: 'ui-select',

    model: {
        prop: 'value',
        event: 'change',
    },

    components: {
        UiIcon,
    },

    directives: {
        ClickOutside,
    },

    props: {
        value: {
            type: [Number, String],
        },
        options: {
            type: Array,
            required: true,
        },
        multiple: {
            type: Boolean,
            default: () => false,
        },
        searchable: {
            type: Boolean,
            default: () => false,
        },
    },

    data: () => ({
        shown: false,
        selectedValue: null,
        margins: 0,
    }),

    methods: {
        clearValue() {
            this.selectedValue = '';
            this.$emit('change', null);
        },

        show() {
            this.shown = true;

            this.calculatePosition();

            if (this.searchable) {
                setTimeout(() => this.$refs.hint.querySelector('input').focus(), 50);
            }
        },

        hide() {
            this.shown = false;
        },

        toggle() {
            this.shown ? this.hide() : this.show();
        },

        select(option) {
            this.selectedValue = option.label;

            this.$emit('change', option.id);
            this.$emit('selected', option);

            if (this.multiple === false) {
                this.hide();
            }
        },

        positionHint(left, top) {
            const hint = this.$refs.hint;

            let right = Math.round(left + hint.offsetWidth) - this.margins;

            left < this.margins && (left = this.margins);
            right > window.innerWidth && (left -= right - window.innerWidth);

            return `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
        },

        calculatePosition() {
            const element = this.$refs.element;
            const hintWindow = this.$refs.hintWindow;
            const hint = this.$refs.hint;

            const leftPos = offset(element).left;
            const topPos = offset(element).top + element.offsetHeight;

            if (this.shown) {
                hintWindow.style.minWidth = Math.round(element.offsetWidth) + 'px';
                hint.style.transform = this.positionHint(leftPos, topPos);
            }

        },
    },

    mounted() {
        document.body.appendChild(this.$refs.hint);
        window.addEventListener('scroll', this.calculatePosition);
        window.addEventListener('resize', this.calculatePosition);

        this.$refs.hintBody.addEventListener('scroll', () => {
            const scrollableEl = this.$refs.hintBody;

            if (this.$refs.hintBody.scrollTop === 0) {
                this.$refs.scrollerUp.classList.add('hide');
            } else {
                this.$refs.scrollerUp.classList.remove('hide');
            }

            if (scrollableEl.offsetHeight + scrollableEl.scrollTop >= scrollableEl.scrollHeight) {
                this.$refs.scrollerDown.classList.add('hide');
            } else {
                this.$refs.scrollerDown.classList.remove('hide');
            }
        });
    },

    beforeDestroy() {
        this.$refs.hint.remove();
        window.removeEventListener('scroll', this.calculatePosition);
        window.removeEventListener('resize', this.calculatePosition);
    }
};
</script>
