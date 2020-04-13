<template>
    <div class="input">
        <div v-if="icon" class="input__icon --right">
            <ui-icon v-if="iconName" :name="iconName" />
            <span v-else>{{ iconText }}</span>
        </div>
        <input v-bind="$attrs" :value="value" @input="handleInput">
    </div>
</template>

<script>
import UiIcon from './icon';

export default {
    name: 'ui-input',

    inheritAttrs: false,

    components: {
        UiIcon,
    },

    model: {
        prop: 'value',
        event: 'input',
    },

    props: {
        value: {
            type: [String, Number],
        },
        icon: {
            type: [Object, String],
        },
    },

    computed: {
        classList() {
            return [
                'ui-input',
                {
                    '--icon-left': false,
                },
            ];
        },

        iconName() {
            return typeof this.icon === 'string' ? this.icon : this.icon.name;
        },

        iconText() {
            return typeof this.icon === 'string' ? null : this.icon.text;
        },

        iconPosition() {
            return typeof this.icon === 'string' ? 'left' : this.icon.position;
        },
    },

    methods: {
        handleInput(event) {
            this.$emit('input', event.target.value);
        },
    },
};
</script>
