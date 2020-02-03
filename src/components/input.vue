<template>
    <div class="input">
<!--        <div class="input__icon &#45;&#45;left">-->
<!--            <span class="icon"><svg><use xlink:href="#clock" /></svg></span>-->
<!--        </div>-->
        <input v-on="$listeners" v-bind="$attrs" @input="$emit('change', $event.target.value)">
    </div>
</template>

<script>
export default {
    name: 'ui-input',

    inheritAttrs: false,

    model: {
        prop: 'value',
        event: 'change',
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
};
</script>
