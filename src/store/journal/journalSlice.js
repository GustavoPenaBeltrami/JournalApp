import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',

    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null
        //Ejemplo de nota activa:
        //   id: 'ABC123'
        //   title: '',
        //   body: '',
        //   date: 1234567,
        //   imageURL: [], https://foto1.jpg, https://foto2.jpg, https://foto3.jpg,
    },

    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false;
        },
        //obtener
        setActiveNote: (state, action) => {
            state.active = action.payload
        },
        //establecer
        setNotes: (state, action) => {
            state.notes = action.payload
            state.isSaving = false;
        },
        setSaving: (state) => {
            state.isSaving = true

        },
        //actualiar
        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note)
            state.savedMessage = `${action.payload.title} se ha actializado`
        },
        //Declarar imagesURL en active
        updateNotePhotos: (state, action) => {
            console.log(state.active.imageUrls);
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload],
            state.isSaving = false

        },
        //limpiar notas al cerrar sesion
        clearNotesLogout: (state) => {
            state.notes = []
            state.isSaving = false,
            state.savedMessage = '',
            state.notes = [],
            state.active = null
        },
        //borrar
        deleteNodeById: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload)
            state.isSaving = false
            state.active = null
        }
    }
})

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    updateNotePhotos,
    clearNotesLogout,
    deleteNodeById, } = journalSlice.actions