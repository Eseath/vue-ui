<template>
    <div style="margin: 60px auto; width: 720px;">
        <section>
            <h2>Тумблер с двумя значениями</h2>
            <ui-toggle v-model="example1" />
            <p>Значение: {{ example1 }}</p>
        </section>

        <section>
            <h2>Тумблер с тремя значениями</h2>
            <ui-toggle v-model="example2" nullable />
            <p>Значение: {{ example2 }}</p>
        </section>

        <section>
            <h2>Тумблер с текстом</h2>
            <ui-toggle v-model="example3" nullable>
                Показывать удаленных пользователей
            </ui-toggle>
            <p>Значение: {{ example3 }}</p>
        </section>
    </div>
</template>

<script>
import UiToggle from '../../src/components/toggle';

export default {
    name: 'example-toggle',

    components: {
        UiToggle,
    },

    data: () => ({
        example1: false,
        example2: true,
        example3: true,
    }),
};
</script>
