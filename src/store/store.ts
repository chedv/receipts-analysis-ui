import { configureStore} from "@reduxjs/toolkit";
import appReducer from "./notificationReducer.ts";

const store = configureStore({
  reducer: {
    app: appReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>