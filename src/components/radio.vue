<template>
    <label class="ui-checkbox">
        <input type="radio" :value="value" :checked="isChecked" :disabled="disabled" @change="toggle" @click="clickHandle">
        <span class="ui-checkbox__view">
            <span class="ui-checkbox__label">{{ label }}</span>
        </span>
    </label>
</template>

<script>
export default {
    name: 'ui-radio',

    model: {
        prop: 'modelValue',
        event: 'change',
    },

    props: {
        label: {
            type: String,
        },
        value: {
            type: [Number, String, Boolean, Array],
        },
        modelValue: {
            type: [Number, String, Boolean, Array],
        },
        disabled: {
            type: Boolean,
            default: () => false,
        },
    },

    computed: {
        isChecked() {
            if (this.modelValue instanceof Array) {
                return this.modelValue.includes(this.value);
            }
            return this.modelValue;
        },
    },

    methods: {
        select(newValues) {
            if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue];

                newValue.push(this.value);

                this.$emit('change', newValue);
            }
        },

        toggle(event) {
            if (this.disabled) {
                return;
            }

            const isChecked = event.target.checked;

            if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue];

                if (isChecked) {
                    newValue.push(this.value);
                } else {
                    newValue.splice(newValue.indexOf(this.value), 1);
                }

                this.$emit('change', newValue);
            } else {
                this.$emit('change', isChecked);
            }
        },
    },
};
</script>
