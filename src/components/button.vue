<script>
import UiSpinner from './spinner';
import UiIcon from './icon';

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
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        loading: {
            type: Boolean,
            default: () => false,
        },
        inverted: {
            type: Boolean,
            default: () => false,
        },
        round: {
            type: Boolean,
            default: () => false,
        },
    },

    computed: {
        classList() {
            const classes = [
                'ui-button',
            ];

            this.color    && classes.push(`--${this.color}`);
            this.size     && classes.push(`--${this.size}`);
            this.inverted && classes.push('--invert');
            this.round    && classes.push('--round');
            this.loading  && classes.push('--not-clickable');

            return classes;
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

            return h(UiIcon, {
                props: {
                    name: this.icon,
                },
            });
        },
    },

    render(h) {
        const buttonElement = this.link ? 'router-link' : 'button';
        const buttonContent = this.label ? this.label : this.$slots.default;
        const children = [];

        if (this.icon) {
            children.push(this.genIcon(h));
        }

        if (buttonContent) {
            const contentEl = h('span', [buttonContent]);
            children.push(contentEl);
        }

        return h(buttonElement, {
            attrs: this.$attrs,
            class: this.classList,
            props: this.makeProperties(),
            on: this.$listeners,
        }, children);
    },
};
</script>
