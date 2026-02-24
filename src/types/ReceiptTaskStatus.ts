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

export type ReceiptTaskResultResponseType = {
  receipt_text: any;
};

export type ReceiptStatusesType = {
  receipt_id: string;
  status: ReceiptTaskStatus;
  detail: string | null;
};