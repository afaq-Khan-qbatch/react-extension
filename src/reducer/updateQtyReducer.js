import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios.js';

export const updateQty = createAsyncThunk(
    "updateQty",
    async (values, ThunkAPI) => {
        const config = {
            method: 'POST',
            url: '/carts/updateQty',
            data: { _id: values._id, quantity: values.quantity === '' || values.quantity <= 0 ? 1 : values.quantity }
        }
        const { data } = await axios(config);
        return data;
    }
)

const update_slice = createSlice({
    name: "updating_items",
    initialState: {
        updateFlag: null,
    },
    extraReducers: {

        [updateQty.pending]: (state, action) => {
            state.updateFlag = null
        },
        [updateQty.fulfilled]: (state, action) => {
            state.updateFlag = true
        }
    }
})

export default update_slice.reducer;