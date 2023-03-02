import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const loginUser = createAsyncThunk('user/login', async (user) => {
    try {
        const response = await axiosClient.post('/user/login', user);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg);
    }
});

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
