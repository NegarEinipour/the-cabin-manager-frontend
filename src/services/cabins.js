// services/cabins.js
import api from "./api";

export const getCabins = async () => {
  try {
    const response = await api.get("/cabins");

    // Check if data is an array
    const cabins = response.data.data.data;

    return cabins;
  } catch (error) {
    console.error(" Error fetching cabins:", error);
    throw error;
  }
};

export const createCabin = async (formData) => {
  try {
    // Make sure you're sending the right headers
    const response = await api.post("/cabins", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.error(
      "Cannot create cabin:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteCabin = async (id) => {
  await api.delete(`/cabins/${id}`);
};

export const updateCabin = async ({ id, cabinData }) => {
  const response = await api.patch(`/cabins/${id}`, cabinData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data.data;
};
