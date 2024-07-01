import axios from 'axios';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../services/api';

jest.mock('axios');

describe('API tests', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should fetch items', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ id: 1, title: 'Test Item', body: 'This is a test item.' }],
      headers: { 'x-total-count': '1' },
    });

    const response = await getItems();
    expect(response.data).toEqual([
      { id: 1, title: 'Test Item', body: 'This is a test item.' },
    ]);
    // Convert totalItems to number when asserting
    expect(Number(response.totalItems)).toBe(1);
  });

  it('should fetch an item by ID', async () => {
    const id = 1;
    const mockResponse = {
      data: { id, title: 'Test Item', body: 'This is a test item.' },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const item = await getItemById(id);
    expect(item).toEqual({
      id,
      title: 'Test Item',
      body: 'This is a test item.',
    });
  });

  it('should create an item', async () => {
    const newItem = { title: 'New Item', body: 'This is a new item.' };
    const mockResponse = { data: { id: 1, ...newItem } };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const item = await createItem(newItem);
    expect(item).toEqual({ id: 1, ...newItem });
  });

  it('should update an item', async () => {
    const updatedItem = {
      title: 'Updated Item',
      body: 'This is an updated item.',
    };
    const id = 1;
    const mockResponse = { data: { id, ...updatedItem } };
    mockedAxios.put.mockResolvedValueOnce(mockResponse);

    const item = await updateItem(id, updatedItem);
    expect(item).toEqual({ id, ...updatedItem });
  });

  it('should delete an item', async () => {
    const id = 1;
    const mockResponse = { data: {} };
    mockedAxios.delete.mockResolvedValueOnce(mockResponse);

    const response = await deleteItem(id);
    expect(response).toEqual({});
  });
});
