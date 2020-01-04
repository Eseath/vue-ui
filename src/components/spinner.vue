<template>
    <div :class="classList" />
</template>

<script>
export default {
    name: 'ui-spinner',

    props: {
        color: {
            type: String,
            default: () => 'primary',
        },
    },

    computed: {
        classList() {
            const classes = ['spinner'];

            if (this.color) {
                classes.push(`-color-${this.color}`);
            }

            return classes;
        },
    },
};
</script>

<style lang="scss">
    .spinner {
        &.-color-blue {
            border-color: #1e90ff2b;
            border-left-color: #1e90ff;
        }

        &.-color-primary {
            border-color: #d2dfed;
            border-left-color: #526CFF;
        }

        &.-size-s {
            --size: 20px;
            --border-size: 2px;
        }

        &.-size-m {}
        &.-size-l {}
    }
</style>
