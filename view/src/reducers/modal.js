import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    taskModal: false,
    taskData: {},
    projectModal: false,
    projectData: {}
}

const modalSlice = createSlice({
    name: "modal",
    initialState: { value: initialValue },
    reducers: {
        showTaskModal: (state, action) => {
            state.value.taskModal = true
            state.value.taskData = action.payload
        },
        hideTaskModal: (state, action) => {
            state.value.taskModal = false
            state.value.taskData = {}
        },
        showProjectModal: (state, action) => {
            state.value.projectModal = true
            state.value.projectData = action.payload
        },
        hideProjectModal: (state, action) => {
            state.value.projectModal = false
            state.value.projectData = {}
        }
    }
})

export const { showTaskModal, hideTaskModal, showProjectModal, hideProjectModal } = modalSlice.actions;  //for useDispatch

export default modalSlice.reducer;   //for Store