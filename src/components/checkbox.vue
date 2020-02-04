<template>
    <label class="ui-checkbox" @dblclick="selectThisOnly">
        <input type="checkbox" :value="value" :checked="isChecked" :disabled="disabled" @change="toggle">
        <span class="ui-checkbox__view">
            <span class="ui-checkbox__marker" />
            <span class="ui-checkbox__label">{{ label }}</span>
        </span>
    </label>
</template>

<script>
function inject(namespace) {
    return {
        inject: {
            [namespace]: {
                default: {
                    registerItem: () => '',
                    unregisterItem: () => '',
                    selectAll: () => '',
                },
            },
        },
    };
}

export default {
    name: 'ui-checkbox',

    mixins: [
        inject('group'),
    ],

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
        select() {
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

        selectThisOnly() {
            if (this.modelValue instanceof Array) {
                if (this.modelValue.length > 1 || this.modelValue.indexOf(this.value) === -1) {
                    this.$emit('change', [this.value]);
                } else if (this.group) {
                    this.group.selectAll((values) => {
                        this.$emit('change', values);
                    });
                }
            }
        },
    },

    created() {
        if (this.group) {
            this.group.registerItem(this);
        }
    },

    beforeDestroy() {
        if (this.group) {
            this.group.unregisterItem(this);
        }
    },
};
</script>
