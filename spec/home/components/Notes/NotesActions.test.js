import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'app/home/components/Notes/NotesActions'
import * as types from 'app/home/components/Notes/NotesActionsTypes'
import nock from 'nock'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Notes actions', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it('creates ADD_NOTE when addNoteAction has been done', () => {
        nock('http://test.com/')
            .post('/test');

        const expectedActions = [
            {type: types.ADD_NOTE, data: {id: 0, text: 'text'}}
        ];
        const store = mockStore({notes: []});

        return store.dispatch(actions.addNoteAction('text', 'test'))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    });

    it('creates EDIT_NOTE when editNoteAction has been done', () => {
        nock('http://test.com/')
            .patch('/test');

        const expectedActions = [
            {type: types.EDIT_NOTE, data: {note: {id: 0, text: 'text'}, text: 'newText'}}
        ];
        const store = mockStore({notes: []});

        return store.dispatch(actions.editNoteAction({id: 0, text: 'text'}, 'newText', 'test'))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    });

    it('creates REMOVE_NOTE when removeNoteAction has been done', () => {
        nock('http://test.com/')
            .delete('/test');

        const expectedActions = [
            {type: types.REMOVE_NOTE, data: {id: 0, text: 'text'}}
        ];
        const store = mockStore({notes: []});

        return store.dispatch(actions.removeNoteAction({id: 0, text: 'text'}, 'test'))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    });

    it('creates LIST_NOTES when listNotes has been done', () => {
        nock('https://github-profiler-1ac46.firebaseio.com')
            .get('/test/notes/.json')
            .reply(200, [null, 'text']);

        const expectedActions = [
            {type: types.LIST_NOTES, data: [{id: 1, text: 'text'}]}
        ];
        const store = mockStore({notes: []});

        return store.dispatch(actions.listNotes('test'))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
});