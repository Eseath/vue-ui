import { shallowMount } from '@vue/test-utils';
import UiIcon from '../src/components/icon';

describe('Support of svg icons', () => {
    const wrapper = shallowMount(UiIcon, {
        propsData: {
            name: 'info',
        },
    });

    const svgElement = wrapper.element.querySelector('svg');
    const useElement = svgElement.querySelector('use');

    it('Should render inline svg with local path to icon', () => {
        expect(svgElement).toBeInstanceOf(SVGSVGElement);
        expect(useElement).toBeInstanceOf(SVGElement);
        expect(useElement.attributes.getNamedItem('xlink:href').value).toBe('#info');
    });
});

describe('Support of element-ui icons', () => {
    const wrapper = shallowMount(UiIcon, {
        propsData: {
            name: 'el-icon-info',
        },
    });

    it('Should render span with name as class', () => {
        expect(wrapper.classes()).toContain('el-icon-info');
    });
});
