<template>
    <div style="margin: 60px auto; width: 720px;">
        <section>
            <ui-input v-model="example1" :icon="{ name: 'date', position: 'right' }" />
            <ui-input v-model="example1" icon="date" />
        </section>
    </div>
</template>

<script>
import UiInput from '../../src/components/input';

export default {
    name: 'example-select',

    components: {
        UiInput,
    },

    data: () => ({
        example1: '',
    }),
};
</script>
