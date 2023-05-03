import { createSlice } from "@reduxjs/toolkit";

const initialValue = sessionStorage.getItem('view') ? sessionStorage.getItem('view') : 'list'

const viewSlice = createSlice({
    name: "view",
    initialState: { value: initialValue },
    reducers: {
        list: (state, action) => {
            state.value = 'list'
            sessionStorage.setItem('view', 'list');
        },
        kanban: (state, action) => {
            state.value = 'kanban'
            sessionStorage.setItem('view', 'kanban');
        },
        calendar: (state, action) => {
            state.value = 'calendar'
            sessionStorage.setItem('view', 'calendar');
        },
        timeline: (state, action) => {
            state.value = 'timeline'
            sessionStorage.setItem('view', 'timeline');
        },
    }
})

export const { list, kanban, calendar, timeline } = viewSlice.actions;  //for useDispatch

export default viewSlice.reducer;   //for Store