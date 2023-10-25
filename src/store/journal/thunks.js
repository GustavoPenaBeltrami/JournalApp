import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers/fileUpload"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, deleteNodeById, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, updateNotePhotos } from "./journalSlice"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        //uid
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes/`))
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }


}

export const startLoadingNotes = (uid) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        if (!uid) throw new Error('El id del usuario no existe!')

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active: activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(activeNote));

    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch, getState) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls= await Promise.all(fileUploadPromises);

        dispatch(updateNotePhotos(photosUrls));
    }
}

export const startDeletingNote = () =>{
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active: activeNote} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNodeById(activeNote.id));
    }
}