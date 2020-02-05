<template>
    <div class="input">
<!--        <div class="input__icon &#45;&#45;left">-->
<!--            <span class="icon"><svg><use xlink:href="#clock" /></svg></span>-->
<!--        </div>-->
        <input v-bind="$attrs" @input="handleInput">
    </div>
</template>

<script>
export default {
    name: 'ui-input',

    inheritAttrs: false,

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
