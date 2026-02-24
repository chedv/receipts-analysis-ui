export type Config = {
  auth0Domain: string;
  auth0ClientId: string;
  auth0ApiAudience: string;
  apiBaseURL: string;
  pollReceiptTaskStatusIntervalMs: number;
};

export const config: Config = {
  auth0Domain: import.meta.env.VITE_AUTH0_DOMAIN,
  auth0ClientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  auth0ApiAudience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
  apiBaseURL: import.meta.env.VITE_API_BASE_URL,
  pollReceiptTaskStatusIntervalMs: import.meta.env.VITE_POLL_RECEIPT_TASK_STATUS_INTERVAL_MS,
};