// services/settings.js
import api from "./api";

export const getSettings = async () => {
  const response = await api.get("/settings");
  return response.data.data.settings;
};

export const updateSettings = async (settingsData) => {
  const response = await api.patch("/settings", settingsData);
  return response.data.data.settings;
};
