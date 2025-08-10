import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form, FormField } from '../../types/form.types';

interface FormsState {
    currentForm: Form;
}

const initialState: FormsState = {
    currentForm: {
        id: '',
        name: '',
        fields: [],
        createdAt: '',
    },
};

const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        // Reducer to add a new field to the current form
        addFormField: (state, action: PayloadAction<FormField>) => {
            state.currentForm.fields.push(action.payload);
        },
        // Reducer to update a field in the current form
        updateField: (state, action: PayloadAction<{ fieldId: string; updates: Partial<FormField> }>) => {
            const { fieldId, updates } = action.payload;
            const existingField = state.currentForm.fields.find(field => field.id === fieldId);
            if (existingField) {
                Object.assign(existingField, updates);
            }
        },
        // Reducer to delete a field from the current form
        deleteFormField: (state, action: PayloadAction<string>) => {
            state.currentForm.fields = state.currentForm.fields.filter(field => field.id !== action.payload);
        },
        // Reducer to reorder fields in the current form
        reorderFields: (state, action: PayloadAction<FormField[]>) => {
            state.currentForm.fields = action.payload;
        },
        // New reducer to load a form from the saved forms list
        loadForm: (state, action: PayloadAction<Form>) => {
            state.currentForm = action.payload;
        },
    },
});

export const { addFormField, updateField, deleteFormField, reorderFields, loadForm } = formsSlice.actions;
export default formsSlice.reducer;