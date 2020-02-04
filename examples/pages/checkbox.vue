<template>
    <div style="margin: 60px auto; width: 720px;">
        <section>
            <h2>Обычный чекбокс</h2>
            <ui-checkbox v-model="example1" />
            <p>Значение: {{ example1 }}</p>
        </section>

        <section>
            <h2>Несколько чекбоксов</h2>
            <ui-checkbox v-model="example2" label="A1" value="A1" />
            <ui-checkbox v-model="example2" label="A2" value="A2" />
            <ui-checkbox v-model="example2" label="A3" value="A3" />
            <p>Значение: {{ example2 }}</p>
        </section>

        <section>
            <h2>Группа чекбоксов</h2>
            <ui-checkbox-group>
                <ui-checkbox v-model="example3" label="A1" value="A1" />
                <ui-checkbox v-model="example3" label="A2" value="A2" />
                <ui-checkbox v-model="example3" label="A3" value="A3" />
            </ui-checkbox-group>
            <p>Значение: {{ example3 }}</p>
        </section>
    </div>
</template>

<script>
import UiToggle from '../../src/components/toggle';
import UiCheckbox from '../../src/components/checkbox';
import UiCheckboxGroup from '../../src/components/checkbox-group';

export default {
    name: 'example-toggle',

    components: {
        UiCheckboxGroup,
        UiCheckbox,
        UiToggle,
    },

    data: () => ({
        example1: false,
        example2: [],
        example3: [],
    }),
};
</script>
