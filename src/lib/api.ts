import axios from 'axios';
import { StudentRecord, TeacherRecord } from '../data/mockData';

const BASE_URL = 'http://localhost:5212/api'; // Updated port

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export const getStudents = async (): Promise<StudentRecord[]> => {
  const response = await api.get('/Students');
  return response.data;
};

export const addStudent = async (student: Omit<StudentRecord, "id">): Promise<StudentRecord> => {
  const response = await api.post('/Students', student);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await api.delete(`/Students/${id}`);
};

export const getTeachers = async (): Promise<TeacherRecord[]> => {
  const response = await api.get('/Teachers');
  return response.data;
};

export const addTeacher = async (teacher: Omit<TeacherRecord, "id">): Promise<TeacherRecord> => {
  const response = await api.post('/Teachers', teacher);
  return response.data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
  await api.delete(`/Teachers/${id}`);
};
