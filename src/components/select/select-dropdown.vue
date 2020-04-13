<template>
    <div ref="menu" :class="['ui-select__hint', `--${direction}`]">
        <div ref="menuWindow" class="ui-select__window" style="min-width: 200px;">
            <div class="ui-select__line" ref="menuMarker" />
            <div class="ui-select__body">
                <span :class="['ui-select__scroller-up', { hide: upScrollIndicator }]" />
                <span :class="['ui-select__scroller-down', { hide: downScrollIndicator }]" />
                <ul ref="hintBody">
                    <li v-for="option in options" :key="option.id" @click="$emit('select', option)" @dblclick="ondblclick(option)">
                        <div class="ui-select__option-title" style="display: flex; justify-content: space-between;">
                            {{ option.label }}
                            <div class="-text-center" style="margin-left: 10px; width: 7px;">
                                <div v-if="isOptionSelected(option)" class="checkmark" />
                            </div>
                        </div>
                        <div v-if="option.description" class="ui-select__option-description">
                            {{ option.description }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { offset } from '../../utils/dom';

export default {
    name: 'select-dropdown',

    props: {
        options: {
            type: Array,
            required: true,
        },
    },

    data: () => ({
        isMounted: false,
        upScrollIndicator: true,
        downScrollIndicator: true,
        currentPosition: {
            top: 0,
            left: 0,
        },
    }),

    computed: {
        direction() {
            return this.isMounted
                && offset(this.$parent.$el).top > this.currentPosition.top ? 'top' : 'bottom';
        },
    },

    methods: {
        toggleScrollIndicators() {
            const scrollableEl = this.$refs.hintBody;
            this.upScrollIndicator = this.$refs.hintBody.scrollTop === 0;
            this.downScrollIndicator = scrollableEl.offsetHeight + scrollableEl.scrollTop >= scrollableEl.scrollHeight;
        },

        updatePosition() {
            if (this.$parent.shown) {
                const newPosition = this.calculatePosition();
                this.setPosition(newPosition);
                this.setWidth();
            }
        },

        /**
         * Calculates new coordinates for the dropdown menu.
         *
         * @return {Object}
         */
        calculatePosition() {
            const select = this.$parent.$el;
            const bond = select.getBoundingClientRect();
            const selectPosition = offset(select);
            const newCoordinates = {
                x: selectPosition.left,
                y: 0,
            };

            const topZoneHeight = bond.top;
            const bottomZoneHeight = window.innerHeight - bond.bottom;

            if (topZoneHeight > bottomZoneHeight && bottomZoneHeight < this.$refs.menu.offsetHeight) {
                newCoordinates.y = selectPosition.top - this.$refs.menu.offsetHeight;
            } else {
                newCoordinates.y = selectPosition.top + select.offsetHeight;
            }

            return newCoordinates;
        },

        setPosition({ x: left, y: top }) {
            this.currentPosition = { left, top };

            const menu = this.$refs.menu;

            let right = Math.round(left + menu.offsetWidth) - this.margins;

            left < this.margins && (left = this.margins);
            right > window.innerWidth && (left -= right - window.innerWidth);

            menu.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
        },

        setWidth() {
            const { menuWindow, menuMarker } = this.$refs;
            menuWindow.style.minWidth = Math.round(this.$parent.$el.offsetWidth) + 'px';
            menuMarker.style.maxWidth = menuWindow.style.minWidth;
        },

        isOptionSelected(option) {
            return this.$parent.isOptionSelected(option);
        },

        ondblclick(option) {
            this.$parent.dblSelect(option);
        },
    },

    mounted() {
        this.isMounted = true;
        document.body.appendChild(this.$el);
        window.addEventListener('scroll', this.updatePosition);
        window.addEventListener('resize', this.updatePosition);
        this.$refs.hintBody.addEventListener('scroll', this.toggleScrollIndicators);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.updatePosition);
        window.removeEventListener('resize', this.updatePosition);
        this.$el.remove();
    },
};
</script>
