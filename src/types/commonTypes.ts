export interface FileType extends File {
  preview: string;
}

export enum NotificationLevelType {
  info = "info",
  warning = "warning",
  error = "error",
}

export type NotificationType = {
  level: NotificationLevelType;
  message: string;
}