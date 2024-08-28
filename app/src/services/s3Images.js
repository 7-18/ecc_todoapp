import axios from "axios";

export const uploadImage = async (file) => {
  const AWS_API = import.meta.env.VITE_URL_AWS_API;
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
