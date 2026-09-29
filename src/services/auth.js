import api from "./api";

export const signup = async ({
  fullName,
  email,
  password,
  passwordConfirm,
}) => {
  const response = await api.post("/users/signup", {
    name: fullName,
    email,
    password,
    passwordConfirm,
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await api.post("/users/login", { email, password });
  const token = response.data.token ?? response.data.data?.token;
  if (token) localStorage.setItem("token", token);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const updateCurrentUser = async ({ fullName, avatar }) => {
  const formData = new FormData();
  if (fullName) formData.append("name", fullName);
  if (avatar) formData.append("photo", avatar);

  const res = await api.patch("/users/updateMe", formData);
  return res.data;
};

export const updatePassword = async ({
  passwordCurrent,
  password,
  passwordConfirm,
}) => {
  const res = await api.patch("/users/updatePassword", {
    passwordCurrent,
    password,
    passwordConfirm,
  });

  const token = res.data.token;
  if (token) localStorage.setItem("token", token);

  return res.data;
};
