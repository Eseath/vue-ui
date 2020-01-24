import { shallowMount } from '@vue/test-utils';
import UiButton from '../src/components/button.vue';

describe('Button', () => {
    const wrapper = shallowMount(UiButton, {
        stubs: ['ui-icon'],
    });

    it('Should not render icon slot if icon is not specified', () => {
        //
    });
});
