import axios from "axios";
import {config} from "./config.ts";
import type {
  ReceiptUploadResponseType,
  ReceiptStatusResponseType,
  ReceiptOcrResultResponseType
} from "./types/ReceiptTaskStatus.ts";

const axiosClient = axios.create({
  baseURL: config.apiBaseURL,
});

export const addAccessTokenInterceptor = (getAccessTokenSilently: () => Promise<string>) => {
  axiosClient.interceptors.request.use(
    async (config) => {
      const accessToken = await getAccessTokenSilently();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const receiptUpload = async (fileContent: Blob, fileName: string) => {
  const form = new FormData();
  form.append("receipt_file", fileContent, fileName);

  return await axiosClient.post<ReceiptUploadResponseType>(
    "/receipts/upload",
    form,
  ).then(
    (response) => response.data
  );
};

export const getReceiptStatus = async (receiptId: string) => {
  return await axiosClient.get<ReceiptStatusResponseType>(
    `/receipts/status/${receiptId}`,
  ).then(
    (response) => response.data
  );
};

export const getReceiptOcrResult = async (receiptId: string) => {
  return await axiosClient.get<ReceiptOcrResultResponseType>(
    `/receipts/result/${receiptId}`,
  ).then(
    (response) => response.data
  );
};