<script>
export default {
    name: 'ui-icon',

    props: {
        name: {
            type: String,
            required: true,
        },
        rotate: {
            type: [String, Number],
        },
    },

    render(h) {
        const childrenElements = [];
        const classList = [
            'ui-icon',
            {
                [`-rotate-${this.rotate}`]: this.rotate,
            },
        ];

        if (this.name.indexOf('el-icon') === 0) {
            classList.push(this.name);
        } else if (this.name.indexOf('fa-') === 0) {
            classList.push('fa', this.name);
        } else {
            childrenElements.push(h('svg', [
                h('use', {
                    attrs: {
                        'xlink:href': `#${this.name}`,
                    },
                })
            ]));
        }

        return h('span', {
            class: classList,
        }, childrenElements);
    },
};
</script>
