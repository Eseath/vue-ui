<template>
    <span :class="['ui-icon', { [`-rotate-${rotate}`]: rotate }]">
        <svg><use :xlink:href="`#${name}`" /></svg>
    </span>
</template>

<script>
export default {
    name: 'ui-icon',

    props: {
        name: {
            type: String,
            required: true,
        },
        rotate: {
            type: [String, Number],
        },
    },
};
</script>
