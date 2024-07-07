import axios from 'axios';

const API_URL = 'http://localhost:3025/user';

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${API_URL}/${userId}`);
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData);
  return response.data;
};
