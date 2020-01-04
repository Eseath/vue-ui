<template>
    <div>
        <h1>{{ title }}</h1>

        <div style="margin: auto; width: 768px;">
            <section>
                <h1>checkbox without label</h1>
                <ui-checkbox />
                <pre class="line-numbers">
                    <code class="language-javascript">
                        &lt;ui-checkbox /&gt;
                    </code>
                </pre>
            </section>

            <section>
                <h1>checkbox text label</h1>
                <ui-checkbox label="Text label" />
                <pre class="line-numbers">
                    <code v-html="html" class="language-javascript"></code>
                </pre>
            </section>

            <section>
                <h1>checkbox with custom label</h1>
                <ui-checkbox>
                    <b>I am agree with next:</b>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aut dignissimos, distinctio, ducimus ea eligendi eum exercitationem expedita illo ipsum maxime numquam odit omnis provident quisquam reprehenderit, temporibus tenetur voluptatem.</p>
                </ui-checkbox>
                <pre class="line-numbers">
                    <code v-html="html" class="language-javascript"></code>
                </pre>
            </section>

            <section>
                <h1>Disabled</h1>
                <ui-checkbox v-model="checkboxGroup" :value="1" label="Apple" disabled />

                <pre class="line-numbers">
                    <code v-html="html" class="language-javascript"></code>
                </pre>
            </section>

            <section>
                <h1>checkbox group</h1>
                <ui-checkbox v-model="checkboxGroup" :value="1" label="Apple" />
                <ui-checkbox v-model="checkboxGroup" :value="2" label="Orange" />

                selected values: {{ checkboxGroup }}

                <pre class="line-numbers">
                    <code v-html="html" class="language-javascript"></code>
                </pre>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UiCheckbox from '../../src/components/checkbox.vue';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

@Component({
    name: 'PageCheckbox',
    components: { UiCheckbox },
})
export default class PageCheckbox extends Vue {
    title: string = 'Hello, World!';
    html: string = '';

    checkboxGroup: any[] = [];

    created() {
        const code = `import UiCheckbox from 'ui/src/components/checkbox';`;
        this.html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
};
</script>
