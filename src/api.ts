import axios from "axios";
import {config} from "./config.ts";
import type {
  ReceiptUploadResponseType,
  ReceiptStatusResponseType,
  ReceiptTaskResultResponseType
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

export const receiptUpload = async (file: File) => {
  const form = new FormData();
  form.append("receipt_file", file, file.name);

  return await axiosClient.post<ReceiptUploadResponseType>(
    "/receipts/upload",
    form,
  ).then(
    (response) => response.data
  );
};

export const getReceiptTaskStatuses = async (receiptIds: string[]) => {
  return await axiosClient.get<Map<string, ReceiptStatusResponseType>>(
    `/receipts/status`,
    {
      params: {receipt_ids: receiptIds},
      paramsSerializer: { indexes: null },
    }
  ).then(
    (response) => response.data
  );
};

export const getReceiptTaskResult = async (receiptId: string) => {
  return await axiosClient.get<ReceiptTaskResultResponseType>(
    `/receipts/result/${receiptId}`,
  ).then(
    (response) => response.data
  );
};