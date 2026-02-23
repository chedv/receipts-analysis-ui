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
};

export type ReceiptOcrResultResponseType = {
  receipt_text: any;
};