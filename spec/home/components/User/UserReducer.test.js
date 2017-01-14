import reducer from '../../../../src/app/home/components/User/UserReducer'
import * as types from '../../../../src/app/home/components/User/UserActionsTypes'

describe('User reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer({data: {user: {}, repos: []}}, {})
        ).toEqual({data: {user: {}, repos: []}})
    });

    it('should handle SEARCH_USER', () => {
        expect(
            reducer({data: {user: {}, repos: []}}, {
                type: types.SEARCH_USER,
                data: [1, 2]
            })
        ).toEqual({data: {user: 1, repos: 2}});
    })
});
