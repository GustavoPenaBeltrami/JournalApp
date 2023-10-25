import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
       status: 'checking', // checking, not-authenticated, authenticated
       uid: null,
       email: null,
       displayName: null,
       photoURL: null,
       errorMessage: null
   },

   reducers: { //Son las funciones que voy a tener que se disparan en base a las condiciones del estado
       login: (state, {payload}) => {
        state.status = 'authenticated';
        state.uid = payload.uid;
        state.email = payload.email;
        state.displayName = payload.displayName;
        state.photoURL = payload.photoURL;
        state.errorMessage = null;
       },


       logout: (state, {payload}) => {
        const errorMessage = payload || null;

        state.status = 'not-authenticated';
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = errorMessage;
       },

       
       checkingCredentials: (state) => {
        state.status = 'checking';
       },
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions