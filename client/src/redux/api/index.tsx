import axios from "axios";
const API = axios.create({ baseURL:"http://localhost:3001/api"});
// const API = axios.create({ baseURL:"https://invoicesystm-app.onrender.com/api"});

API.interceptors.request.use((req:any) => {
  const authData = localStorage.getItem("InvoiceAuth");
  if (authData && typeof authData === "string") {
    const token = JSON.parse(authData).data.token;
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return req;
});

// Auth
export const signUp = (user:any) => API.post("/auth/register", user);
export const signIn = (user:any) => API.post("/auth/login", user);
export const addUser = (user:any) => API.post("/auth/addUser", user);


// user profile
export const fetchCurrentUser = () => API.get("/auth/user/current-user");
export const fetchUsers = () => API.get("/auth");
export const fetchUser = (id:String) => API.get(`/auth/${id}`);
export const updateUser = (id:String, user:any) => API.put(`/auth/${id}`, user);
export const deleteUser = (id:String) => API.delete(`/auth/${id}`);

// customer
export const createCustomer = (customer:any) => API.post("/clients", customer);
export const fetchCustomers = (searchQuery:any) => API.get(`/clients?searchQuery=${searchQuery}`);
export const fetchCustomer = (id:String) => API.get(`/clients/${id}`);
export const updateCustomer = (id:String, customer:any) => API.put(`/clients/${id}`, customer);
export const deleteCustomer = (id:String) => API.delete(`/clients/${id}`);

// Invoice
export const createInvoice = (invoice:any) => API.post("/invoices", invoice);
export const fetchInvoices = () => API.get("/invoices");
export const fetchInvoice = (id:String) => API.get(`/invoices/${id}`);
export const fetchInvoicesBySearch = (searchQuery:any) =>API.get(`/invoices?searchQuery=${searchQuery}`);
export const updateInvoice = (id:String, invoice:any) => API.put(`/invoices/${id}`, invoice);
export const deleteInvoice = (id:String) => API.delete(`/invoices/${id}`);

// Invoice Status
export const markInvoiceStatusPaid =   (id:String) => API.put(`/invoices/${id}/mark-as-paid`);
export const markInvoiceStatusUnPaid = (id:String) => API.put(`/invoices/${id}/mark-as-unpaid`);
export const markInvoiceStatusRead =   (id:String) => API.put(`/invoices/${id}/mark-as-read`);

// Item
export const createItem = (item:any) => API.post("/items", item);
export const updateItem = (id:String,item:any) => API.put(`/items/${id}`, item);

// Company
export const fetchCompanies = () => API.get('/companies');
export const updateCompany = (id:String,company:any) => API.patch(`/companies/${id}`, company);

// AdditionalFields
export const createAdditionalFields= (additionalFields:any) => API.post('/items/custom',additionalFields);
export const fetchAdditionalFieldsByCompanyId= (companyId:String) => API.get(`/items/custom/${companyId}`);

