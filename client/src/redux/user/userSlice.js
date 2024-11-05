import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuser: null,
    users: [], 
    loading: false,
    error: null, 
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null; 
        },
        updateUserFailure: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = null; 
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signout: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = null; 
        },
        fetchUsersStart: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action) => {
            state.users = action.payload; 
            state.loading = false;
            state.error = null;
        },
        fetchUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addUserSuccess: (state, action) => {
            state.users.push(action.payload); 
        },
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure, 
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure, 
    signout,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    addUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
