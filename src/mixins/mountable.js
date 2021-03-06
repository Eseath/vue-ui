import { appendElement, appSelector } from '../utils/helpers';

function getElement(el) {
    el = el || this.$el || null;

    if (!el) {
        throw new Error;
    }

    return el;
}

export default {
    props: {
        mountElement: {
            type: String,
            default: appSelector,
        },
        disableMounting: Boolean,
    },

    data: () => ({
        automaticMounting: false,
    }),

    methods: {
        remount(el = null) {
            if (this.disableMounting) {
                return;
            }

            try {
                el = getElement.call(this, el);

                appendElement(el, this.mountElement);
            } catch (e) {
                console.error('Element remount error', this);
            }
        },
        unmount(el = null) {
            try {
                el = getElement.call(this, el);

                el.remove();
            } catch (e) {
                console.error('Element unmount error', this);
            }
        }
    },

    mounted() {
        if (this.automaticMounting) {
            this.remount();
        }
    },

    beforeDestroy() {
        if (this.automaticMounting) {
            this.unmount();
        }
    },
};
