<template>
    <div ref="element" :class="rootClasses" @click="toggle" @mouseover="hovered = true" @mouseout="hovered = false">
        <select :multiple="multiple">
            <option v-for="option in options" :key="option.id">{{ option.label }}</option>
        </select>

        <div class="ui-select__value">
            {{ text }}
        </div>

        <div v-if="isClearable && hovered" class="ui-select__reset">
            <ui-icon name="el-icon-circle-close" @click.native.stop="clearValue" />
        </div>

        <div v-else class="ui-select__arrow">
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
                            <div class="ui-select__option-title" style="display: flex; justify-content: space-between;">
                                {{ option.label }}
                                <div v-if="isOptionSelected(option)" class="checkmark" />
                            </div>
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

function offset(el) {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

/**
 * Checks that clicked to specified element.
 *
 * @param  {HTMLElement}  el      Needed element
 * @param  {HTMLElement}  target  Clicked element
 * @return {boolean}
 */
function checkElClick(el, target) {
    return target === el || el.contains(target);
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

    props: {
        value: {
            type: [String, Number, Array],
        },
        placeholder: {
            type: [String, Number],
            default: '',
        },
        options: {
            type: Array,
            required: true,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        searchable: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        shown: false,
        margins: 0,
        hovered: false,
    }),

    computed: {
        selectedValues() {
            if (this.multiple && Array.isArray(this.value)) {
                return this.value
                    .map(value => (this.options.find(option => option.value == value) || {}).label)
                    .filter(value => value);
            }

            const value = this.options.find(option => option.value === this.value);

            return value ? [value] : [];
        },
        text() {
            if (!this.selectedValues.length) {
                return this.placeholder;
            }
            return this.multiple ? this.selectedValues.join(', ') : this.selectedValues[0].label;
        },
        isClearable() {
            return this.clearable && this.selectedValues.length;
        },
        isSelected() {
            return this.selectedValues.length > 0;
        },
        rootClasses() {
            return [
                'ui-select',
                'ui-select__field',
                'closed',
                {
                    'active': this.shown,
                    '--selected': this.isSelected,
                },
            ];
        },
    },

    methods: {
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

        isOptionSelected(option) {
            if (Array.isArray(this.value)) {
                return this.value.includes(option.value);
            }
            return this.value === option.value;
        },

        clearValue() {
            this.$emit('change', this.multiple ? [] : null);
        },

        select(option) {
            if (Array.isArray(this.value)) {
                if (this.multiple) {
                    const newValue = [...this.value];
                    const index = newValue.indexOf(option.value);

                    if (index !== -1) {
                        newValue.splice(index, 1);
                        this.$emit('unselected', option);
                    } else {
                        newValue.push(option.value);
                        this.$emit('selected', option);
                    }

                    this.$emit('change', newValue);
                } else {
                    this.$emit('change', [option.value]);
                }
            } else {
                this.$emit('change', option.value);
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

        handleOutsideClick(event) {
            if (this.multiple && checkElClick(this.$refs.hint, event.target)) {
                return;
            }

            if (checkElClick(this.$refs.element, event.target)) {
                return;
            }

            this.hide();
        },
    },

    mounted() {
        document.body.appendChild(this.$refs.hint);
        document.body.addEventListener('click', this.handleOutsideClick);
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
        document.body.removeEventListener('click', this.handleOutsideClick);
        window.removeEventListener('scroll', this.calculatePosition);
        window.removeEventListener('resize', this.calculatePosition);
    }
};
</script>

<style lang="scss">
    .checkmark {
        display: inline-block;

        &:after {
            /*Add another block-level blank space*/
            content: '';
            display: block;

            /*Make it a small rectangle so the border will create an L-shape*/
            width: 5px;
            height: 8px;

            /*Add a white border on the bottom and left, creating that 'L' */
            border: solid #fff;
            border-width: 0 2px 2px 0;

            /*Rotate the L 45 degrees to turn it into a checkmark*/
            transform: rotate(45deg);
        }
    }
</style>
