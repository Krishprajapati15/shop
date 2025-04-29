import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginStatus : document.cookie !== "" //check for cookie
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setloginStatus: (state,action) => {
            state.loginStatus = (action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setloginStatus } = loginSlice.actions

export default loginSlice.reducer