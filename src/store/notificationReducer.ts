import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {NotificationType} from "../types/commonTypes.ts";

export type NotificationStateType = {
  notificationsList: NotificationType[];
};

const initialState: NotificationStateType = {
  notificationsList: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notificationsList = [...state.notificationsList, action.payload];
    }
  }
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;