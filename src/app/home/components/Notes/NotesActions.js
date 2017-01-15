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
                    let parsedData = data.map((item) => {
                        if (item) {
                            return {id: data.indexOf(item), text: item}
                        }
                    }).filter((item) => item);
                    nextActionId = parsedData[parsedData.length - 1].id + 1;
                    dispatch({type: LIST_NOTES, data: parsedData})
                } else if (is.object(data) && !data.hasOwnProperty('error')) {
                    let parsedData = Object.keys(data).map((item) => {
                        return {id: item, text: data[item]};
                    }).filter((item) => is.not.null(item.text));
                    nextActionId = parsedData[parsedData.length - 1].id + 1;
                    dispatch({type: LIST_NOTES, data: parsedData})
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