import axios from "axios";
const API = axios.create({ baseURL:"http://localhost:3001/api"});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("InvoiceAuth")) {
    const token = JSON.parse(localStorage.getItem("InvoiceAuth")).data.token;
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return req;
});

// Auth
export const signUp = (user) => API.post("/auth/register", user);
export const signIn = (user) => API.post("/auth/login", user);

// user profile
export const fetchCurrentUser = () => API.get("/auth/user/current-user");
export const fetchUsers = () => API.get("/auth");

// customer
export const createCustomer = (customer) => API.post("/clients", customer);
export const fetchCustomers = () => API.get("/clients");
export const fetchCustomer = (id) => API.get(`/clients/${id}`);
export const updateCustomer = (id, customer) => API.put(`/clients/${id}`, customer);
export const deleteCustomer = (id) => API.delete(`/clients/${id}`);

// Invoice
export const createInvoice = (invoice) => API.post("/invoices", invoice);
export const fetchInvoices = () => API.get("/invoices");
export const fetchInvoice = (id) => API.get(`/invoices/${id}`);
export const fetchInvoicesBySearch = (searchQuery) =>API.get(`/invoices?searchQuery=${searchQuery}`);
export const updateInvoice = (id, invoice) => API.put(`/invoices/${id}`, invoice);
export const deleteInvoice = (id) => API.delete(`/invoices/${id}`);

// Invoice Status
export const markInvoiceStatusPaid =   (id) => API.put(`/invoices/${id}/mark-as-paid`);
export const markInvoiceStatusUnPaid = (id) => API.put(`/invoices/${id}/mark-as-unpaid`);
export const markInvoiceStatusRead =   (id) => API.put(`/invoices/${id}/mark-as-read`);

// Item
export const createItem = (item) => API.post("/items", item);
export const updateItem = (id,item) => API.put(`/items/${id}`, item);

