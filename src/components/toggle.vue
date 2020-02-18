<template>
    <div :class="classes" @click="toggleValue">
        <span v-if="options.length">{{ currentValue }}</span>
        <slot v-else />
    </div>
</template>

<script>
export default {
    name: 'ui-toggle',

    props: {
        value: {
            type: [Boolean, Number, String],
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        nullable: {
            type: Boolean,
            default: false,
        },
        positiveValue: {
            type: [String, Number, Boolean],
            default: true,
        },
        negativeValue: {
            type: [String, Number, Boolean],
            default: false,
        },
    },

    computed: {
        classes() {
            return [
                'toggle',
                this.classOfState,
                {
                    '--disabled': this.disabled,
                },
            ];
        },

        classOfState() {
            if (this.value === null && this.nullable) {
                return '--null';
            } else if (this.value) {
                return '--active';
            }
        },

        currentValue() {
            if (this.value === null && this.nullable) {
                return this.options[2];
            } else if (this.value) {
                return this.options[1];
            } else {
                return this.options[0];
            }
        },
    },

    methods: {
        toggleValue() {
            if (this.disabled) {
                return;
            }

            if (this.value === this.positiveValue) {
                this.$emit('input', this.negativeValue);
            } else if (this.value === this.negativeValue && this.nullable) {
                this.$emit('input', null);
            } else {
                this.$emit('input', this.positiveValue);
            }
        },
    },
};
</script>
