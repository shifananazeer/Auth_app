import { createSlice } from '@reduxjs/toolkit' ;



const adminSlice = createSlice({
    name:'admin' ,
    initialState: {
        user:null,
        error:null,
        loading:false
    },
    reducers : {
        adminLoginStart : (state) => {
            state.loading = true;
            state.error = null
        },
        adminLoginSuccess : (state , action) => {
            state.loading = false ;
            state.user = action.payload.user;
            state.error = false;
        },
        adminLoginFailer : (state , action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearError : (state) => {
            state.error = null
        },
       
    }
})


export const {
    adminLoginFailer,
    adminLoginStart, 
    adminLoginSuccess,
    clearError,
  
} = adminSlice.actions

export default adminSlice.reducer;