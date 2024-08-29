import axios from "axios";

const AWS_API = import.meta.env.VITE_URL_AWS_API;

export const uploadImage = async (file) => {
  try {
    const response = await axios.post(`${AWS_API}/saveImage`, {
      body: JSON.stringify({
        imageBase64: file.base64,
        filename: file.name,
      }),
    });
    return response.data;
  } catch (error) {
    console.error("Error al subir la imagen: ", error);
    throw error;
  }
};

export const deleteImage = async (filename) => {
  try {
    const response = await axios.delete(`${AWS_API}/deleteImage/${filename}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting image: ", error);
    throw error;
  }
};
