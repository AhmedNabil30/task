import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getItems = async (
  page = 1,
  limit = 10,
  searchQuery = '',
  filterQuery = '',
) => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: {
        _page: page,
        _limit: limit,
        q: searchQuery,
        title_like: filterQuery,
      },
    });
    return {
      data: response.data,
      totalItems: response.headers['x-total-count'],
    };
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getItemById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

export interface Post {
  title: string;
  body: string;
}

export const createItem = async (item: Post) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, item);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const updateItem = async (id: number, item: Post) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, item);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItem = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
