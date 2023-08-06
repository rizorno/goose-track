import { createSlice } from '@reduxjs/toolkit';
import {
  getTasksThunk,
  addTaskThunk,
  updateTaskStatusThunk,
  updateTaskPriorityThunk,
  deleteTaskThunk,
  getFilterTasksThunk,
} from './tasksOperations';
import { logOutThunk } from 'redux/auth/authOperations';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      //? get tasks

      .addCase(getTasksThunk.pending, handlePending)
      .addCase(getTasksThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(getTasksThunk.rejected, handleRejected)

      //? add task

      .addCase(addTaskThunk.pending, handlePending)
      .addCase(addTaskThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = [...state.tasks, payload];
        state.error = null;
      })
      .addCase(addTaskThunk.rejected, handleRejected)

      //? delete task

      .addCase(deleteTaskThunk.pending, handlePending)
      .addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = state.tasks.filter(task => task._id !== payload);
      })
      .addCase(deleteTaskThunk.rejected, handleRejected)

      //? update status task

      .addCase(updateTaskStatusThunk.pending, handlePending)
      .addCase(updateTaskStatusThunk.fulfilled, (state, { payload }) => {
        if (payload === undefined || payload === null) {
          return;
        }
        const { _id, status } = payload;
        state.isLoading = false;
        state.error = null;
        const index = state.tasks.findIndex(task => task._id === _id);
        const task = state.tasks[index];
        task.status = status;
      })
      .addCase(updateTaskStatusThunk.rejected, handleRejected)

      //? update priority task

      .addCase(updateTaskPriorityThunk.pending, handlePending)
      .addCase(updateTaskPriorityThunk.fulfilled, (state, { payload }) => {
        if (payload === undefined || payload === null) {
          return;
        }
        const { _id, priority } = payload;
        state.isLoading = false;
        state.error = null;
        const index = state.tasks.findIndex(task => task._id === _id);
        const task = state.tasks[index];
        task.priority = priority;
      })
      .addCase(updateTaskPriorityThunk.rejected, handleRejected)

      //? get filter tasks

      .addCase(getFilterTasksThunk.pending, handlePending)
      .addCase(getFilterTasksThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(getFilterTasksThunk.rejected, handleRejected)

      //? logout

      .addCase(logOutThunk.pending, handlePending)
      .addCase(logOutThunk.fulfilled, state => {
        state.tasks = [];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOutThunk.rejected, handleRejected);
  },
});

export const tasksReducer = tasksSlice.reducer;
