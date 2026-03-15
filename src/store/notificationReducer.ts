import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {NotificationType, UUIDNotificationType} from "../types/commonTypes.ts";

export type NotificationStateType = {
  notificationsList: UUIDNotificationType[];
};

const initialState: NotificationStateType = {
  notificationsList: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notificationsList = [...state.notificationsList, {uuid: crypto.randomUUID(), ...action.payload}];
    },
    removeNotification: (state, {payload}: PayloadAction<{uuid: string}>) => {
      state.notificationsList = state.notificationsList.filter(notification => notification.uuid !== payload.uuid);
    }
  }
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;