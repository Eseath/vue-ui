<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumbs">
            <li v-for="(item, index) in items" :key="index" class="breadcrumbs-item">
                <router-link :to="item.link">
                    {{ item.name }}
                </router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: 'ui-breadcrumbs',

    props: {
        items: {
            type: Array,
            required: true,
        },
    },
};
</script>
