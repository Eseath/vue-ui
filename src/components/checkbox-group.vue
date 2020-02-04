<script>
export default {
    name: 'ui-checkbox-group',

    props: {
        tag: {
            type: String,
            default: 'div',
        },
    },

    data: () => ({
        items: [],
    }),

    provide() {
        return {
            group: {
                registerItem: this.registerItem,
                unregisterItem: this.unregisterItem,
                selectAll: this.selectAll,
            },
        };
    },

    methods: {
        registerItem(item) {
            if (item.modelValue instanceof Array) {
                this.items.push(item);
            }
        },
        unregisterItem(item) {
            const index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },
        selectAll(cb) {
            const values = this.items.map(item => item.value);
            cb(values);
        },
    },

    render(createElement) {
        return createElement(this.tag, this.$slots.default);
    },
};
</script>
