import { urlApi } from "./apiConfig";

// User services
export const createUser = async (user) => {
  try {
    const response = await urlApi.post("/api/v1/users/save", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const getUsers = async (queries) => {
  try {
    const response = await urlApi.get(`/api/v1/users?${queries}`);
    return response.data;
  } catch (error) {
    console.error("Error getting users: ", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await urlApi.get(`/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user by ID: ", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await urlApi.get(`/api/v1/users/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user by email: ", error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await urlApi.put(`/api/v1/users/update/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await urlApi.delete(`/api/v1/users/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};

// Task services
export const createTask = async (task) => {
  try {
    const response = await urlApi.post("/api/v1/tasks/save", task);
    return response.data;
  } catch (error) {
    console.error("Error creating task: ", error);
    throw error;
  }
};

export const getTasks = async (queries) => {
  try {
    const response = await urlApi.get(`/api/v1/tasks?${queries}`);
    return response.data;
  } catch (error) {
    console.error("Error getting tasks: ", error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await urlApi.get(`/api/v1/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting task by ID: ", error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await urlApi.put(`/api/v1/tasks/update/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await urlApi.patch(`/api/v1/tasks/patch/${id}`, status);
    return response.data;
  } catch (error) {
    console.error("Error updating task status: ", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await urlApi.delete(`/api/v1/tasks/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};

export const deleteAllTasks = async (id) => {
  try {
    const response = await urlApi.delete(`/api/v1/tasks/deleteAll/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting all tasks: ", error);
    throw error;
  }
};

// Comments services
export const createComment = async (comment) => {
  try {
    const response = await urlApi.post("/api/v1/comments/save", comment);
    return response.data;
  } catch (error) {
    console.error("Error creating comment: ", error);
    throw error;
  }
};

export const getComments = async (queries) => {
  try {
    const response = await urlApi.get(`/api/v1/comments?${queries}`);
    return response.data;
  } catch (error) {
    console.error("Error getting comments: ", error);
    throw error;
  }
};

export const getCommentById = async (id) => {
  try {
    const response = await urlApi.get(`/api/v1/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting comment by ID: ", error);
    throw error;
  }
};

export const updateComment = async (id, comment) => {
  try {
    const response = await urlApi.put(`/api/v1/comments/update/${id}`, comment);
    return response.data;
  } catch (error) {
    console.error("Error updating comment: ", error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await urlApi.delete(`/api/v1/comments/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment: ", error);
    throw error;
  }
};

// Views services
export const getCommentsUserView = async (id) => {
  try {
    const response = await urlApi.get(`/api/v1/comments-user-view/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting comments user view: ", error);
    throw error;
  }
};

export const getTasksUserView = async () => {
  try {
    const response = await urlApi.get("/api/v1/tasks-user-view");
    return response.data;
  } catch (error) {
    console.error("Error getting tasks user view: ", error);
    throw error;
  }
};

export const getTasksImagesUserView = async (id) => {
  try {
    const response = await urlApi.get(`/api/v1/tasks-images-user-view/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting tasks images user view: ", error);
    throw error;
  }
};

export const getTasksImageUsersView = async () => {
  try {
    const response = await urlApi.get("/api/v1/tasks-images-users-view");
    return response.data;
  } catch (error) {
    console.error("Error getting tasks image users view: ", error);
    throw error;
  }
};
