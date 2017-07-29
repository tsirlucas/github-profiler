import {
	ADD_NOTE,
	ADD_NOTE_ERROR,
	RESOLVE_ADD_NOTE,
	REMOVE_NOTE,
	RESOLVE_REMOVE_NOTE,
	REMOVE_NOTE_ERROR,
	RESOLVE_EDIT_NOTE,
	RESOLVE_LIST_NOTES
} from './notes.constants';

const NotesReducer = (state = {content: []}, {payload, type}) => {
	switch (type) {
		case RESOLVE_LIST_NOTES:
			return state.deepMergeIn(
				['content'],
				(content = []) => content.merge(payload)
			);
		case ADD_NOTE:
			return state.merge({
				sending: true,
				content: state.content
			});
		case ADD_NOTE_ERROR:
			return state.merge({
				sending: false,
				content: state.content
			});
		case RESOLVE_ADD_NOTE:
			return state.merge({
				sending: false,
				content: state.content.merge([...state.content, payload])
			});
		case REMOVE_NOTE:
			return state.deepMergeIn(
				['content'],
				(content = []) => state.content.map((note) => {
					if (note.id === payload.note.id) {
						note.removing = true;
					}
					return note;
				})
			);
		case RESOLVE_REMOVE_NOTE:
			return state.deepMergeIn(
				['content'],
				(content = []) => state.content.filter(note => note.id !== payload.note.id)
			);
		case REMOVE_NOTE_ERROR:
			return state.deepMergeIn(
				['content'],
				(content = []) => state.content.map((note) => {
					if (note.id === payload.note.id) {
						note.removing = false;
					}
					return note;
				})
			);
		case RESOLVE_EDIT_NOTE:
			return state.deepMergeIn(
				['content'],
				(content = []) => content.merge(state.content.map((note) => {
					if (note.id === payload.note.id) {
						note.text = payload.note.text;
					}
					return note;
				}))
			);
		default:
			return state;
	}
};

export default NotesReducer;
