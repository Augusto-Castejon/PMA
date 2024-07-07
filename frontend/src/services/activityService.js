import axios from 'axios';

const API_URL = 'http://localhost:3025/activity';

export const getActivities = async (userId) => {
  const response = await axios.get(`${API_URL}?userId=${userId}`);
  return response.data;
};

export const createActivity = async (activity) => {
  const response = await axios.post(API_URL, activity);
  return response.data;
};

export const deleteActivity = async (activityId) => {
  await axios.delete(`${API_URL}/${activityId}`);
};

export const updateActivity = async (activityId, updatedActivity) => {
  const response = await axios.put(`${API_URL}/${activityId}`, updatedActivity);
  return response.data;
};
