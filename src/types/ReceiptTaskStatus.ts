export type ReceiptUploadResponseType = {
  receipt_id: string;
};

export enum ReceiptTaskStatus {
  created = "CREATED",
  inProgress = "IN_PROGRESS",
  success = "SUCCESS",
  failed = "FAILED",
}

export type ReceiptStatusResponseType = {
  status: ReceiptTaskStatus;
  detail: string | null;
};

export type ReceiptOcrResultResponseType = {
  receipt_text: any;
};