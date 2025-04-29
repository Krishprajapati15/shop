import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sales : []
};

export const saleSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {
        setSale: (state,action) => {
            state.sales = action.payload //action.payload should be array
        },
    },
})

export const { setSale } = saleSlice.actions

export default saleSlice.reducer