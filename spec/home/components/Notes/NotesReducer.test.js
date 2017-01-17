import reducer from 'app/home/components/Notes/NotesReducer'
import * as types from 'app/home/components/Notes/NotesActionsTypes'

describe('Notes reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer({notes: []}, {})
        ).toEqual({notes: []})
    });

    it('should handle ADD_NOTE', () => {
        expect(
            reducer({notes: []}, {
                type: types.ADD_NOTE,
                data: {id: 1, text: 'text'}
            })
        ).toEqual({notes: [{id: 1, text: 'text'}]});
    });

    it('should handle REMOVE_NOTE', () => {
        expect(
            reducer({notes: [{id: 1, text: 'text'}]}, {
                type: types.REMOVE_NOTE,
                data: {id: 1, text: 'text'}
            })
        ).toEqual({notes: []});
    });

    it('should handle EDIT_NOTE', () => {
        expect(
            reducer({notes: [{id: 1, text: 'text'}]}, {
                type: types.EDIT_NOTE,
                data: {note: {id: 1, text: 'text'}, text: 'newText'}
            })
        ).toEqual({notes: [{id: 1, text: 'newText'}]});
    });

    it('should handle LIST_NOTE', () => {
        expect(
            reducer({notes: []}, {
                type: types.LIST_NOTES,
                data: [{id: 1, text: 'text1'}, {id: 2, text: 'text2'}, {id: 3, text: 'text3'}]
            })
        ).toEqual({
            notes: [{id: 1, text: 'text1'}, {id: 2, text: 'text2'}, {id: 3, text: 'text3'}]
        });
    })
});
