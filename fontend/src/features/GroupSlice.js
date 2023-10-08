import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

export const GroupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    updateGroup: (state, action) => {
      const newGroup = action.payload;
      state.groups.push(newGroup);
    },
    resetGroup: (state) => {
      state.groups = [];
    },
    updateCount: (state, action) => {
      const { groupId } = action.payload;
      const groupToUpdate = state.groups.find((group) => group._id === groupId);
      if (groupToUpdate) {
        groupToUpdate.countMessage += 1;
      }
    },
    updateMessageToGroup: (state, action) => {
      //   const { groupId, message } = action.payload;
      const newMessage = action.payload;
      console.log("🚀 ~ file: GroupSlice.js:31 ~ newMessage:", newMessage)

      const groupToUpdate = state.groups.find(
        (group) => group._id === newMessage.groupMessage
      );
      if (groupToUpdate) {
        groupToUpdate.messages.push(newMessage);
      }
    },
  },
});

export const { updateGroup, resetGroup, updateCount, updateMessageToGroup } =
  GroupSlice.actions;

export default GroupSlice.reducer;
