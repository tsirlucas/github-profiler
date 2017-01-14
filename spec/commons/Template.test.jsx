import React from 'react'
import {shallow} from 'enzyme'
import Template from '../../src/app/commons/Template.jsx'

function setup() {
    const enzymeWrapper = shallow(<Template />);

    return {
        enzymeWrapper
    }
}


describe('components', () => {
    describe('Template', () => {
        it('should self-render', () => {
            const {enzymeWrapper} = setup();
            expect(enzymeWrapper.find('.template').hasClass('template')).toBe(true);
        });
    })
});
