import React from 'react'
import {mount} from 'enzyme'
import User from 'app/home/components/user/user'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from 'app/reducers';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


function setup() {
    const store = createStore(reducers, applyMiddleware(thunk));
    const enzymeWrapper = mount(
        <Provider store={store}>
            <MuiThemeProvider>
                <User />
            </MuiThemeProvider>
        </Provider>
    );

    return {
        enzymeWrapper
    }
}

describe('components', () => {
    describe('User', () => {
        it('should self-render', () => {
            const {enzymeWrapper} = setup();
            expect(enzymeWrapper.find(User)).toBeTruthy();
        });
    })
});
