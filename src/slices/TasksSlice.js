import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasksArray: [], // Correct initial state
    isRefresh:false
  },
  reducers: {
    // toggle refresh
    toggleRefresh:(state)=>{
      state.isRefresh = !state.isRefresh;
    },
    // set all tasks to slice
    getTasks: (state) => {
      return state;
    },
    // get all tasks from slice
    setTasks: (state, action) => {
      state.tasksArray = action.payload; 
    }
  },
});

export const { getTasks, setTasks,toggleRefresh} = tasksSlice.actions;
export default tasksSlice.reducer;