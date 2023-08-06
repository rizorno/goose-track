import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTasksAPI,
  getTaskByIdAPI,
  addTaskAPI,
  deleteTaskAPI,
  deleteTasksAPI,
  updateTaskAPI,
  updateTaskStatusAPI,
  updateTaskPriorityAPI,
  getFilterTasksAPI,
} from 'services/tasksService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const getTasksThunk = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTasksAPI();
      return data;
    } catch (error) {
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const getTaskByIdThunk = createAsyncThunk(
  'tasks/getTaskById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getTaskByIdAPI(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  'task/addTask',
  async (dataTask, { rejectWithValue }) => {
    try {
      const data = await addTaskAPI(dataTask);
      Notify.success('The task has been successfully added.');
      return data;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'task/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteTaskAPI(id);
      Notify.success('The task has been successfully deleted.');
      return result;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const deleteTasksThunk = createAsyncThunk(
  'task/deleteTasks',
  async (_, { rejectWithValue }) => {
    try {
      const result = await deleteTasksAPI();
      return result;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  'task/updateTask',
  async ({ id, dataTask }, { rejectWithValue }) => {
    try {
      const data = await updateTaskAPI(id, dataTask);
      Notify.success('The task has been successfully changed.');
      return data;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const updateTaskStatusThunk = createAsyncThunk(
  'task/updateStatus',
  async ({ id, dataStatus }, { rejectWithValue }) => {
    try {
      const data = await updateTaskStatusAPI(id, dataStatus);
      Notify.success('The task status has been successfully changed.');
      return data;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const updateTaskPriorityThunk = createAsyncThunk(
  'task/updatePriority',
  async ({ id, dataPriority }, { rejectWithValue }) => {
    try {
      const data = await updateTaskPriorityAPI(id, dataPriority);
      Notify.success('The task priority has been successfully changed.');
      return data;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const getFilterTasksThunk = createAsyncThunk(
  'tasks/getFilterTasks',
  async (dataTask, { rejectWithValue }) => {
    try {
      const data = await getFilterTasksAPI(dataTask);
      return data;
    } catch (error) {
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);
