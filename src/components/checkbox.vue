<template>
    <label class="ui-checkbox" @dblclick="handle">
        <input type="checkbox" :value="value" :checked="isChecked" :disabled="disabled" @change="toggle">
        <span class="ui-checkbox__view">
            <span class="ui-checkbox__marker" />
            <span class="ui-checkbox__label">
                <template v-if="$slots.default">
                    <slot />
                </template>
                <template v-else>
                    {{ label }}
                </template>
            </span>
        </span>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'ui-checkbox',
    model: {
        prop: 'modelValue',
        event: 'change',
    },
})
export default class UiCheckbox extends Vue {
    @Prop()
    value!: string | number | boolean;

    @Prop()
    label!: string | number;

    @Prop()
    disabled!: boolean;

    @Prop()
    modelValue!: any;

    get isChecked() {
        if (Array.isArray(this.modelValue)) {
            return this.modelValue.includes(this.value);
        }
        return this.modelValue;
    }

    toggle(event: any) {
        if (this.disabled) {
            return;
        }

        const isChecked = event.target.checked;

        if (Array.isArray(this.modelValue)) {
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
    }

    handle(event: any) {
        if (!Array.isArray(this.modelValue)) {
            return;
        }

        if (this.modelValue.length > 1 || (this.modelValue.length === 1 && !this.isChecked)) {
            this.$emit('change', [this.value]);
        } else {
            // todo select all
        }
    }
}
</script>
