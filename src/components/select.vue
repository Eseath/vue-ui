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

        <select-dropdown ref="hint" :class="{ hidden: !shown, shown }" :options="options" @select="select" />
    </div>
</template>

<script>
import UiIcon from './icon';
import SelectDropdown from './select/select-dropdown.vue';
import { checkElClick } from '../utils/dom';

export default {
    name: 'ui-select',

    model: {
        prop: 'value',
        event: 'change',
    },

    components: {
        UiIcon,
        SelectDropdown,
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
            this.$refs.hint.updatePosition();
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

        dblSelect(option) {
            if (this.multiple && Array.isArray(this.value)) {
                if (this.value.length === 1) {
                    this.$emit('change', this.options.map(option => option.value));
                } else {
                    this.$emit('change', [option.value]);
                }
            }
        },

        handleOutsideClick({ target }) {
            const { element, hint } = this.$refs;

            if ((this.multiple && checkElClick(hint.$el, target)) || checkElClick(element, target)) {
                return;
            }

            this.hide();
        },
    },

    mounted() {
        document.body.addEventListener('click', this.handleOutsideClick);
    },

    beforeDestroy() {
        document.body.removeEventListener('click', this.handleOutsideClick);
    },
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
