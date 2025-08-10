import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './features/forms/formsSlice';
import savedFormsReducer from './features/savedForms/savedFormsSlice'; // New import


export const store = configureStore({
    reducer: {
        forms: formsReducer,
        savedForms: savedFormsReducer, // New reducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;