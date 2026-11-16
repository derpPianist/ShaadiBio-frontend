import { configureStore } from "@reduxjs/toolkit";
import profiles from "./profilesSlice";

export const makeStore = () => configureStore({ reducer: { profiles } });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
