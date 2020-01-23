<template>
    <div style="margin: 60px auto; width: 720px;">
        <section>
            <table style="border-spacing: 15px;">
                <thead>
                    <tr>
                        <th>Большая</th>
                        <th>Стандартная</th>
                        <th>Неактивная</th>
                        <th>С белым фоном</th>
                        <th>Неактивная c белым фоном</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="color in colors" :key="color">
                        <td><ui-button :color="color" label="Это кнопка" size="large" /></td>
                        <td><ui-button :color="color" label="Это кнопка" /></td>
                        <td><ui-button :color="color" label="Это кнопка" disabled /></td>
                        <td><ui-button :color="color" label="Это кнопка" inverted /></td>
                        <td><ui-button :color="color" label="Это кнопка" inverted disabled /></td>
                        <td><ui-button :loading="true" label="Loading" /></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script>
import UiSelect from '../../src/components/select';
import UiButton from '../../src/components/button';

export default {
    name: 'example-select',

    components: {
        UiButton,
        UiSelect,
    },

    data: () => ({
        colors: [
            null,
            'primary',
            'danger',
            'warning',
            'success',
            'info',
        ],
    }),

    methods: {
        selectValue2(value) {
            this.selectedValue2 = value;
        },
    },
};
</script>
