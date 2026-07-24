import API from "../api/axios";

export const getAllTrainers = () =>
    API.get("/trainers");

export const getTrainerById = (id) =>
    API.get(`/trainers/${id}`);

export const addTrainer = (formData) =>
    API.post("/trainers", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const updateTrainer = (id, formData) =>
    API.put(`/trainers/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteTrainer = (id) =>
    API.delete(`/trainers/${id}`);