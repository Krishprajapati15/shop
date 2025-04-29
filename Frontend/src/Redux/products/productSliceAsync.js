/*** This component is actually not used in the application, However I have kept here just for learning purpose */
// https://hemanthkollanur.medium.com/react-fetch-data-with-redux-toolkit-using-createasyncthunk-tutorial-eeb4e817477e

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// Define the async thunk for fetching user data
export const fetchProductssData = createAsyncThunk('product/fetchProductssData', async () => {
  let myHeaders = new Headers();
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const response = await fetch('/api/products',requestOptions);
    const jsonData = await response.json();
    // console.log(jsonData);
    if (jsonData.message) {
      // handle error and return empty array
      console.log(jsonData.message);
      return []
    }
    return jsonData;
});

const initialState = {
    allProducts: [],
    loading: false, 
    error: null
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProductssData.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProductssData.fulfilled, (state, action) => {
            state.loading = false;
            state.allProducts = action.payload;
          })
          .addCase(fetchProductssData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})

// export const { fetchProductData } = productSlice.actions

export default productSlice.reducer