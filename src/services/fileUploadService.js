import AxiosInstance from "./baseService";

export const getFiles = (payload) => {
  return AxiosInstance.get(`/files`);
};

export const uploadFile = (payload) => {
  console.log("form data service", payload.file);
  return AxiosInstance.post(`/files/upload/${payload.fileType}`, payload.file);
};

export const deleteFile = (fileId) => {
  return AxiosInstance.delete(`/files/${fileId}`);
};

export const getFileData = (payload) => {
  return AxiosInstance.get(`/files/${payload.fileType}/${payload.fileId}`);
};
