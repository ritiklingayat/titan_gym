import API from "../api/axios";

export const getAllMembers = async () => {
    const response = await API.get("/members");
    return response.data;
};

export const getMemberById = async (id) => {
    const response = await API.get(`/members/${id}`);
    return response.data;
};

export const addMember = async (formData) => {
    const res = await API.post(
        "/members",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};

export const updateMember = async (id, member, photo) => {

    const formData = new FormData();

    formData.append(
        "member",
        JSON.stringify(member)
    );

    if (photo instanceof File) {
        formData.append("photo", photo);
    }

    const response = await API.put(
        `/members/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteMember = async (id) => {
    return API.delete(`/members/${id}`);
};