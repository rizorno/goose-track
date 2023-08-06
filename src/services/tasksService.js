import { privateAPI } from './http';

export const getTasksAPI = async () => {
  const { data } = await privateAPI.get('api/tasks');
  return data;
};

export const getTaskByIdAPI = async id => {
  const { data } = await privateAPI.get(`api/tasks/${id}`);
  return data;
};

export const addTaskAPI = async dataTask => {
  const { data } = await privateAPI.post('api/tasks', dataTask);
  return data;
};

export const deleteTaskAPI = async id => {
  const { data } = await privateAPI.delete(`api/tasks/${id}`);
  return data;
};

export const deleteTasksAPI = async () => {
  const { data } = await privateAPI.delete('api/tasks');
  return data;
};

export const updateTaskAPI = async (id, dataTask) => {
  const { data } = await privateAPI.put(`api/tasks/${id}`, dataTask);
  return data;
};

export const updateTaskStatusAPI = async (id, dataTask) => {
  const { data } = await privateAPI.patch(`api/tasks/${id}/status`, {
    status: dataTask,
  });
  return data;
};

export const updateTaskPriorityAPI = async (id, dataTask) => {
  const { data } = await privateAPI.patch(`api/tasks/${id}/priority`, {
    priority: dataTask,
  });
  return data;
};

export const getFilterTasksAPI = async dataTask => {
  const { data } = await privateAPI.post('api/tasks/filter', dataTask);
  return data;
};
