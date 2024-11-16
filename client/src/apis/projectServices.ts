import axios from "axios"

const API_URL = 'https://todo-app-o03m.onrender.com'

const getToken = async () => {
    return localStorage.getItem('accessToken');
}

const authHeaders = async () => {
    const token = await getToken();
    return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
}

export const fetchAllProjects =  async () => {
    return await axios.get(`${API_URL}/api/project`, await authHeaders());
}

export const fetchProjectById = async (projectId: string) => {
    return await axios.get(`${API_URL}/api/project/${projectId}`, await authHeaders());
}

interface ProjectData {
    title: string;
    description: string;
    // Add other fields as necessary
}

export const createNewProject = async (projectData: ProjectData) => {
    return await axios.post(`${API_URL}/api/project/create`, projectData, await authHeaders());    
}

export const updateTodoStatus = async (projectId: string, todoId: string, status: boolean) => {
    return await axios.patch(`${API_URL}/api/project/${projectId}/todo`, {todoId, status}, await authHeaders());
}

export const updateTodoDescription = async (projectId: string, todoId: string, description: string) => {
    return await axios.patch(`${API_URL}/api/project/${projectId}/todo`, {todoId, description}, await authHeaders());
}

export const deleteProjectById = async (projectId: string) => {
    return await axios.delete(`${API_URL}/api/project/${projectId}`, await authHeaders());
}

export const updateProjectTitle = async (projectId: string, title: string) => {    
     return await axios.put(`${API_URL}/api/project/${projectId}`, {title}, await authHeaders());    
}

export const deleteTodoItem = async (projectId: string, todoId: string) => {
    return await axios.delete(`${API_URL}/api/project/${projectId}/todo?todoId=${todoId}`, await authHeaders());
}

export const addNewTodo = async (projectId: string, description: string) => {
    return await axios.post(`${API_URL}/api/project/${projectId}/todo`, {description}, await authHeaders());
}

export const generateGist = async (projectId: string) => {
    return await axios.get(`${API_URL}/api/project/exportAsGist/${projectId}`, await authHeaders());
}