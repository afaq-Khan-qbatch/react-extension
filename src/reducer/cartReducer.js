import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios.js';
import { getCookie } from '../cookie.js';

export const get_cart = createAsyncThunk(
    "getting_cart",
    async (id , ThunkApi) => {
        const token = getCookie('token');
        try{
            const config = {
                method: 'POST',
                url: '/carts/get_cart',
                headers: {
                    'x-auth-token': `bearer ${token}`
                },
            }
            const { data } = await axios(config);
            console.log(data);
            return data;
        }catch(e){
            return ThunkApi.rejectWithValue(e);
        }
        console.log(id);
        const { data } = await axios.get(`/${id}`);
        console.log("data get_cart: " , data);
        return data;
    }
)

export const delete_cart = createAsyncThunk(
    "delete_cart",
    async (Id, ThunkAPI) => {
        const config = {
            method: 'DELETE',
            url: '/carts/delete_cart',
            data: { "items_Id": Id }
        }
        const { data } = await axios(config);
        return data;
    }
)

export const addInCart = createAsyncThunk(
    "add_to_cart",
    async (userdata , ThunkApi) => {
        console.log('id', userdata);
        const config = {
            method: 'POST',
            url: '/carts/save_to_cart',
            headers: {
                'x-auth-token': `bearer ${userdata.userId}`
            },
            data: { id: userdata.id }
        }
        try {
            const { data } = await axios(config);
            console.log(data);
            return data;
        } catch (e) {
            return ThunkApi.rejectWithValue(e.message);
        }
    }
)

const cart_slice = createSlice({
    name: "cart_items",
    initialState: {
        count: 0,
        cart_item: [],
    },
    extraReducers: {
        [get_cart.fulfilled]: (state, action) => {
            state.cart_item = action.payload;
            state.count = 0;
            action.payload.forEach(element => {
                state.count = state.count + element.quantity;
            })
        },
        [delete_cart.fulfilled]: (state, action) => {
            state.cart_item = state.cart_item.filter(element => {
                return action.payload._id !== element._id
            })
        },
    },
    reducers: {

        setCount: (state, action) => {
            state.count = state.count + action.payload;
        },
        clearState: ( state , action ) =>{
            state.count = 0;
            state.cart_item = [];
        }

    }
})

export const { setCount,clearState } = cart_slice.actions;
export default cart_slice.reducer;