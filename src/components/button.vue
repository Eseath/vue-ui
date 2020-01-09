<script>
import UiSpinner from './spinner';

export default {
    name: 'ui-button',

    props: {
        label: {
            type: String,
        },
        icon: {
            type: String,
        },
        link: {
            type: [String, Object],
        },
        href: {
            type: String,
        },
        color: {
            type: String,
        },
        loading: {
            type: Boolean,
            default: () => false,
        },
    },

    computed: {
        classList() {
            return [
                'ui-button',
                `--color-${this.color}`,
            ];
        },
    },

    methods: {
        makeProperties() {
            const props = this.$props;

            if (this.link && typeof this.link === 'string') {
                const [name, id] = this.link.split(':');
                props.to = { name, params: { id } };
                delete props.href;
                delete props.link;
            }

            return props;
        },

        genIcon(h) {
            if (this.loading) {
                return h('span', {
                    class: 'ui-icon',
                }, [
                    h(UiSpinner),
                ]);
            }

            return h('span', {
                class: [
                    'ui-icon',
                    this.icon,
                ],
            });
        },
    },

    render(h) {
        const buttonElement = this.link ? 'router-link' : 'button';
        const buttonContent = this.label ? this.label : this.$slots.default;

        return h(buttonElement, {
            attrs: this.$attrs,
            class: this.classList,
            props: this.makeProperties(),
        }, [
            this.genIcon(h),
            buttonContent,
        ]);
    },
};
</script>
