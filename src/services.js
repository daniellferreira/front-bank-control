import axios from "axios";
const BASE_BACKEND_URL = "https://ts-bank-control-api.herokuapp.com";

const services = {
  getCreatedAccount: () => axios.get(`${BASE_BACKEND_URL}/account`),
  getFinanceHistory: (accountId) =>
    axios.get(`${BASE_BACKEND_URL}/finance/${accountId}`),
  addDeposit: (data) => axios.post(`${BASE_BACKEND_URL}/finance/deposit`, data),
  addDraft: (data) => axios.post(`${BASE_BACKEND_URL}/finance/draft`, data),
  addTicketPayment: (data) =>
    axios.post(`${BASE_BACKEND_URL}/finance/payment/ticket`, data),
};

export default services;
