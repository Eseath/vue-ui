<template>
    <div style="margin: 60px auto; width: 720px;">
        <section>
            <h2>Стандартный</h2>
            <ui-select v-model="model1" :options="options" />
            <p>Выбранное значение: {{ model1 }}</p>
        </section>

        <section>
            <h2>С поисковой строкой</h2>
            <ui-select :options="options" searchable @selected="selectValue2" />
            <p>Выбранное значение из события: {{ selectedValue2 }}</p>
        </section>

        <section>
            <h2>С подсказками</h2>
            <ui-select :options="optionsWithHints" />
        </section>
    </div>
</template>

<script>
import UiSelect from '../../src/components/select';

export default {
    name: 'example-select',

    components: {
        UiSelect,
    },

    data: () => ({
        options: [
            {
                id: 1,
                label: 'Фрукты и овощи',
            },
            {
                id: 2,
                label: 'Молочные продукты',
            },
            {
                id: 3,
                label: 'Рыба и мясо',
            },
            {
                id: 4,
                label: 'Соки и вода',
            },
            {
                id: 5,
                label: 'Алгокольные напитки',
            },
            {
                id: 6,
                label: 'Газированные напитки',
            },
            {
                id: 7,
                label: 'Десерты',
            },
            {
                id: 8,
                label: 'Хлебобулочные изделия',
            },
        ],
        optionsWithHints: [
            {
                id: 1,
                label: 'Фрукты и овощи',
                description: 'Lorem ipsum dolor acsuba forever mofra qubearche',
            },
            {
                id: 2,
                label: 'Молочные продукты',
                description: 'Lorem ipsum dolor acsuba forever mofra qubearche',
            },
        ],

        model1: null,

        selectedValue2: null,
    }),

    methods: {
        selectValue2(value) {
            this.selectedValue2 = value;
        },
    },
};
</script>
