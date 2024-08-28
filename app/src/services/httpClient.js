import { urlApi } from "./apiConfig";

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
