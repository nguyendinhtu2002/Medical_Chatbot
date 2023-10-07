import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
    access_token: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
               _id="",
                firstName="",
                lastName="",
                email="",
                isAdmin=false,
                access_token=""
            } = action.payload;
            state.id = _id;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.isAdmin = isAdmin;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.isAdmin = false;
            state.access_token = "";
        }
    }
})

export const {updateUser, resetUser} = userSlice.actions

export default UserSlice.reducer