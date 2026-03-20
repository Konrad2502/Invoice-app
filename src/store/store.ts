import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        
    }
});

//  typ całego stanu aplikacji
export type RootState = ReturnType<typeof store.getState>;

//  typ dispatch
export type AppDispatch = typeof store.dispatch;
