import fetch from 'isomorphic-fetch';
import is from 'is_js'
import {ADD_NOTE, REMOVE_NOTE, EDIT_NOTE, LIST_NOTES} from './NotesActionsTypes.js';

let nextActionId = 0;

const listNotes = (user) => {
    return dispatch => fetch(`https://github-profiler-1ac46.firebaseio.com/${user}/notes/.json`)
        .then(response => response.json())
        .then(
            data => {
                if (is.array(data)) {
                    data = data.map((item) => {
                        if (item) {
                            return {id: data.indexOf(item), text: item}
                        }
                    }).filter((item) => item);
                    nextActionId = data[data.length - 1].id + 1;
                    dispatch({type: LIST_NOTES, data})
                } else if (is.object(data)) {
                    dispatch({type: LIST_NOTES, data: [{id: Object.keys(data)[0], text: data[Object.keys(data)[0]]}]})
                } else {
                    dispatch({type: LIST_NOTES, data: []})
                }
            }
        )
};

const addNoteAction = (note, user) => {
    return dispatch => fetch(`https://github-profiler-1ac46.firebaseio.com/${user}/notes/.json?format=export`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            [nextActionId]: note
        })
    }).then(
        data => dispatch({type: ADD_NOTE, data: {id: nextActionId++, text: note}})
    )
};

const removeNoteAction = (note, user) => {
    return dispatch => fetch(`https://github-profiler-1ac46.firebaseio.com/${user}/notes/${note.id}.json?format=export`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            [note.id]: note.text
        })
    }).then(
        data => dispatch({type: REMOVE_NOTE, data: note})
    )
};

const editNoteAction = (note, text, user) => {
    return dispatch => fetch(`https://github-profiler-1ac46.firebaseio.com/${user}/notes/.json?format=export`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            [note.id]: text
        })
    }).then(
        dispatch({type: EDIT_NOTE, data: {note: note, text: text}})
    )
};

export {addNoteAction, removeNoteAction, editNoteAction, listNotes}