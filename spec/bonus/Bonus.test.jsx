import React from 'react'
import {shallow} from 'enzyme'
import Bonus from '../../src/app/bonus/Bonus.jsx'

function setup() {
    const enzymeWrapper = shallow(<Bonus />);

    return {
        enzymeWrapper
    }
}


describe('components', () => {
    describe('Bonus', () => {
        it('should self-render', () => {
            const {enzymeWrapper} = setup();
            expect(enzymeWrapper.find('.bonus').hasClass('bonus')).toBe(true);
        });
    })
});