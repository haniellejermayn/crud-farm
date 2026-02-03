import axios from "axios";

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const animalsApi = {
  getAll: () => api.get("/animals"),
  getOne: (id: number) => api.get(`/animals/${id}`),
  create: (data: unknown) => api.post("/animals", data),
  update: (id: number, data: unknown) => api.patch(`/animals/${id}`, data),
  delete: (id: number) => api.delete(`/animals/${id}`),
};

export const farmersApi = {
  getAll: () => api.get("/farmers"),
  getOne: (id: number) => api.get(`/farmers/${id}`),
  create: (data: unknown) => api.post("/farmers", data),
  update: (id: number, data: unknown) => api.patch(`/farmers/${id}`, data),
  delete: (id: number) => api.delete(`/farmers/${id}`),
};

// UPDATED FEEDS API
export const feedsApi = {
  // Inventory
  getAllStock: () => api.get("/feeds/stock"),
  addStock: (data: { name: string; quantity: number }) =>
    api.post("/feeds/stock", data),
  updateStock: (id: number, data: unknown) =>
    api.patch(`/feeds/stock/${id}`, data),
  deleteStock: (id: number) => api.delete(`/feeds/stock/${id}`),

  // Actions
  feedAnimal: (data: {
    animalId: number;
    feedStockId: number;
    amount: number;
  }) => api.post("/feeds/feed-animal", data),

  // History
  getHistory: () => api.get("/feeds/history"),
  deleteLog: (id: number) => api.delete(`/feeds/history/${id}`),
};

export const tasksApi = {
  getAll: () => api.get("/tasks"),
  getOne: (id: number) => api.get(`/tasks/${id}`),
  create: (data: unknown) => api.post("/tasks", data),
  update: (id: number, data: unknown) => api.patch(`/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/tasks/${id}`),
};
