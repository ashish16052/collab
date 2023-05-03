import { createSlice } from "@reduxjs/toolkit";

const initialValue = {}

const projectSlice = createSlice({
    name: "project",
    initialState: { value: initialValue },
    reducers: {
        setProject: (state, action) => {
            state.value = action.payload
            // console.log("project reducer called");
        },
    }
})

export const { setProject } = projectSlice.actions;  //for useDispatch

export default projectSlice.reducer;   //for Store