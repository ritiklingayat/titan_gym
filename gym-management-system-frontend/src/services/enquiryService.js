import API from "../api/axios";

export const addEnquiry = async (data) => {
  const response = await API.post(
    "/enquiries",
    data,
  );

  return response.data;
};

export const getAllEnquiries = async () => {
  const response = await API.get(
    "/enquiries",
  );

  return response.data;
};

export const updateStatus = async (
  id,
  status,
) => {
  const response = await API.put(
    `/enquiries/${id}/status`,
    null,
    {
      params: {
        status,
      },
    },
  );

  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await API.delete(
    `/enquiries/${id}`,
  );

  return response.data;
};