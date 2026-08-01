import API from "../api/axios";

export const getAllMembers = async () => {
  const response = await API.get("/members");
  return response.data;
};

export const getMemberById = async (id) => {
  const response = await API.get(`/members/${id}`);
  return response.data;
};

export const addMember = async (
  member,
  photoFile,
) => {
  const formData = new FormData();

  formData.append(
    "member",
    JSON.stringify(member),
  );

  if (photoFile instanceof File) {
    formData.append("photo", photoFile);
  }

  const response = await API.post(
    "/members",
    formData,
  );

  return response.data;
};

export const updateMember = async (
  id,
  member,
  photoFile,
) => {
  const formData = new FormData();

  formData.append(
    "member",
    JSON.stringify(member),
  );

  if (photoFile instanceof File) {
    formData.append("photo", photoFile);
  }

  const response = await API.put(
    `/members/${id}`,
    formData,
  );

  return response.data;
};

export const deleteMember = async (id) => {
  const response = await API.delete(
    `/members/${id}`,
  );

  return response.data;
};