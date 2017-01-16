import React from 'react'
import {shallow} from 'enzyme'
import Home from '../../src/app/home/Home'

function setup() {
    const enzymeWrapper = shallow(<Home />);

    return {
        enzymeWrapper
    }
}


describe('components', () => {
    describe('Home', () => {
        it('should self-render', () => {
            const {enzymeWrapper} = setup();
            expect(enzymeWrapper.find('.home').hasClass('home')).toBe(true);
        });
    })
});
