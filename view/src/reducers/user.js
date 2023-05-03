import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { value: {} },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state, action) => {
            state.value = {}
        }
    }
})

export const { login, logout } = userSlice.actions;  //for useDispatch

export default userSlice.reducer;   //for Store