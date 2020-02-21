<template>
    <div style="margin: 60px auto; width: 720px;">
        <section>
            <h2>Стандартный</h2>
            <ui-select v-model="model1" :options="options" value="test" placeholder="Выберите что-то" />
            <p>Выбранное значение: {{ model1 }}</p>
        </section>

        <section>
            <h2>С поисковой строкой</h2>
            <ui-select v-model="model2" :options="options" searchable @selected="selectValue2" />
            <p>Выбранное значение из события: {{ selectedValue2 }}</p>
        </section>

        <section>
            <h2>С подсказками</h2>
            <ui-select :options="optionsWithHints" />
        </section>

        <section>
            <h2>Очищаемый</h2>
            <ui-select :options="optionsWithHints" clearable />
        </section>

        <section>
            <h2>С мультивыбором</h2>
            <ui-select v-model="model3" :options="options" multiple clearable />
            {{ model3 }}
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
                value: 1,
                label: 'Фрукты и овощи',
            },
            {
                value: 2,
                label: 'Молочные продукты',
            },
            {
                value: 3,
                label: 'Рыба и мясо',
            },
            {
                value: 4,
                label: 'Соки и вода',
            },
            {
                value: 5,
                label: 'Алгокольные напитки',
            },
            {
                value: 6,
                label: 'Газированные напитки',
            },
            {
                value: 7,
                label: 'Десерты',
            },
            {
                value: 8,
                label: 'Хлебобулочные изделия',
            },
        ],
        optionsWithHints: [
            {
                value: 1,
                label: 'Фрукты и овощи',
                description: 'Lorem ipsum dolor acsuba forever mofra qubearche',
            },
            {
                value: 2,
                label: 'Молочные продукты',
                description: 'Lorem ipsum dolor acsuba forever mofra qubearche',
            },
        ],

        model1: null,
        model2: null,
        model3: [],

        selectedValue2: null,
    }),

    methods: {
        selectValue2(value) {
            this.selectedValue2 = value;
        },
    },
};
</script>
