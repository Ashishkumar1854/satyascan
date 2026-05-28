import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:8899') + '/api'
});

export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getReportStatus = async (id) => {
  const response = await api.get(`/report/${id}/status`);
  return response.data;
};

export const getReport = async (id) => {
  const response = await api.get(`/report/${id}`);
  return response.data;
};

export const getAllReports = async () => {
  const response = await api.get('/reports');
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await api.delete(`/report/${id}`);
  return response.data;
};
