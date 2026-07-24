import API from "../api/axios";

export const recordPayment = async (payment) => {
  const response = await API.post("/payments", payment);
  return response.data;
};

export const getPaymentsByMember = async (memberId) => {
  const response = await API.get(`/payments/member/${memberId}`);
  return response.data;
};

export const getAllPayments = async () => {

    const response = await API.get("/payments");

    return response.data;

};