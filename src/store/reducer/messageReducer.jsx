import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const getMessages = createAsyncThunk(
    'message/getMessages',
    async (conversactionId) => {
        try {
            const response = await axiosClient.get(
                `/message/${conversactionId}`
            );
            return response.data;
        } catch (err) {
            throw new Error(err.response.data.msg);
        }
    }
);

export const createMessage = createAsyncThunk(
    'message/createMessage',
    async (message) => {
        try {
            const response = await axiosClient.post(`/message`, {
                conversactionId: message.conversactionId,
                sender: message.sender,
                text: message.text,
            });
            return response.data;
        } catch (err) {
            throw new Error(err.response.data.msg);
        }
    }
);

const initialState = {
    messages: [],
};

export const messageSlice = createSlice({
    name: 'conversaction',
    initialState,
    reducers: {},
    reducers: {
        setMessages: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
        });
        builder.addCase(createMessage.fulfilled, (state, action) => {
            state.messages = [...state.messages, action.payload];
        });
    },
});

// Action creators are generated for each case reducer function
export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
