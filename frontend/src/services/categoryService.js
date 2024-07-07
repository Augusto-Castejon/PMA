import axios from 'axios';

const API_URL = 'http://localhost:3025/category';

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  await axios.delete(`${API_URL}/${categoryId}`);
};

export const updateCategory = async (categoryId, categoryData) => {
  const response = await axios.put(`${API_URL}/${categoryId}`, categoryData);
  return response.data;
};