import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appReducer from "./notificationReducer.ts";

const rootReducer = combineReducers({
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;