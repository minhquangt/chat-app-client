import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const getConversactions = createAsyncThunk(
    'conversaction/getConversactions',
    async (userId) => {
        try {
            const response = await axiosClient.get(`/conversaction/${userId}`);
            return response.data;
        } catch (err) {
            throw new Error(err.response.data.msg);
        }
    }
);

export const createConversaction = createAsyncThunk(
    'conversaction/createConversaction',
    async (members) => {
        try {
            const response = await axiosClient.post(`/conversaction`, {
                senderId: members.senderId,
                receiverId: members.receiverId,
            });
            return response.data;
        } catch (err) {
            throw new Error(err.response.data.msg);
        }
    }
);

const initialState = {
    conversactions: [],
};

export const conversactionSlice = createSlice({
    name: 'conversaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getConversactions.fulfilled, (state, action) => {
            state.conversactions = action.payload;
        });
        builder.addCase(createConversaction.fulfilled, (state, action) => {
            state.conversactions = [...state.conversactions, action.payload];
        });
    },
});

// Action creators are generated for each case reducer function
// export const {} = conversactionSlice.actions;

export default conversactionSlice.reducer;
