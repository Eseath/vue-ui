export default {
    props: {
        color: {
            type: String,
        },
    },

    computed: {
        classList() {
            const classes = ['spinner'];

            if (this.color) {
                classes.push(`-color-${this.color}`);
            }

            return classes;
        },
    },
};
