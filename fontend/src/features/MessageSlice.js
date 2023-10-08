import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const MessageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updateMessage: (state, action) => {
      const newMessage = action.payload;
      state.messages.push(newMessage); // Thêm tin nhắn mới vào mảng messages
    },
    resetMessage: (state) => {
      state.messages = []; // Đặt lại mảng messages về trạng thái ban đầu
    },
  },
});

export const { updateMessage, resetMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
