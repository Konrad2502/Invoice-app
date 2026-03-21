import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from '../features/appData/appDataSlice';

export const store = configureStore({
    reducer: {
        appData: appDataReducer
    }
});

//  typ całego stanu aplikacji
export type RootState = ReturnType<typeof store.getState>;

//  typ dispatch
export type AppDispatch = typeof store.dispatch;
