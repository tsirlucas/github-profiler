import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../../src/app/home/components/User/UserActions'
import * as types from '../../../../src/app/home/components/User/UserActionsTypes'
import nock from 'nock'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User actions', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it('creates SEARCH_USER when searchUserAction has been done', () => {
        //Can't nock request because data is too big! See NotesActions.test.js for nock cases.
        const expectedActions = [
            {type: types.SEARCH_USER, data: {username: 'username', data: 'data'}}
        ];
        const store = mockStore({user: {}});

        return store.dispatch(actions.searchUserAction('user'))
            .then(() => {
                expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
            })
    })
});