import axios from './axios.js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const deductPayment = createAsyncThunk(
    "deductingPayment",
    async(user_data, ThunkApi) => {
        console.log("user data ==>> ", user_data)
        try {
            const config = {
                method: 'POST',
                url: '/checkPayment/deductPayment',
                data: user_data
            }
            const { data } = await axios(config);
            return data;
        } catch (error) {
            return ThunkApi.rejectWithValue(error);
        }
    }
)


const stripePayment = createSlice({
    name: "deducting payment",

    initialState: {
        status: null,
    },

    extraReducers: {
        [deductPayment.pending]: (state, action) => ({
            ...state,
            status: 'pending'
        }),
        [deductPayment.fulfilled]: (state, action) => ({
            ...state,
            status: 'fulfilled'
        }),
        [deductPayment.rejected]: (state, action) => ({
            ...state,
            status: 'rejected'
        }),
        
    }
})

export default stripePayment.reducer;