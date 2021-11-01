import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios.js';
import { setCookie } from '../cookie';

export const get_items = createAsyncThunk(
    "getting_items",
    async () => {
        const { data } = await axios.get('/products/get_items');
        return data;
    }
)

export const getDescription = createAsyncThunk(
    "getting_Description",
    async (_id , ThunkApi) => {
        try{
            const { data } = await axios.get(`/products/getDescription/${_id}`);
            return data;
        }catch(e){
            return ThunkApi.rejectWithValue(e.message);
        }
    }
)

export const siguUP = createAsyncThunk(
    'signUP',
    async(user_data , ThunkApi) =>{
        console.log("signup", user_data);
        try{
            const config = {
                method: 'POST',
                url: '/auth/signup',
                data: user_data
            }
            const { data } = await axios(config);
            return data;
        }catch (error) {
            console.log("=>>>>>", error)
            return ThunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const signIn = createAsyncThunk(
    'signIn',
    async(user_data , ThunkApi) =>{
        console.log("signin ", user_data);
        try{
            console.log("in try " ,user_data.Token);
            const config = {
                method: 'POST',
                url: '/auth/login',
                headers: {
                    'x-auth-token': `bearer ${user_data.Token} .`
                },
                data: { email: user_data.email , password: user_data.password }
            }
            const data = await axios(config);
            console.log("token   ", data.data);
            return data.data;
        }catch (e){
            return ThunkApi.rejectWithValue(e.response.data);
        }
    }
)


const item_slice = createSlice({
    name: "getting_items",
    initialState: {
        data: [],
        Description: [],
        status: null,
        signUP: null,
        signIN: null,
        error: null,
        errorSignup: null,
        email: null
    },
    extraReducers: {
        [get_items.pending]: (state, action) => ({
            ...state,
            status: 'pending'
        }),
        [get_items.fulfilled]: (state, action) => ({
            ...state,
            data: action.payload,
            status: 'fulfilled'
        }),
        [get_items.rejected]: (state, action) => ({
            ...state,
            status: 'rejected'
        }),
        [getDescription.fulfilled]: (state, action) => {

            state.Description = action.payload;
        },
        [siguUP.panding]: (state , action) =>({
            ...state,
        }),
        [siguUP.fulfilled]: (state , action) =>{
            console.log("i am in fullfilled")
            return{
            ...state,
            signUP: true,
        }},
        [siguUP.rejected]: (state , action) =>({
            ...state,
            errorSignup: action.payload.error,
        }),

        [signIn.panding]: (state , action) =>({
            ...state,
            signIN: 'pandind'
        }),
        [signIn.fulfilled]: (state , action) =>
        {
            console.log("action", action)
            setCookie('token' , action.payload.token);
            return {
            ...state,
            signIN: true,
            
        }},
        [signIn.rejected]: (state , action) =>{
            return{
            ...state,
            error: action.payload.error[0].msg,
        }},
    },
    reducers: {
        setEmaill: (state, action) => {
            state.email = action.payload;
        }
    }
})

export const { setEmaill } = item_slice.actions;
export default item_slice.reducer;