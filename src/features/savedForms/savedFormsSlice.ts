import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form } from '../../types/form.types';

interface SavedFormsState {
    forms: Form[];
}

const loadFormsFromLocalStorage = (): Form[] => {
    try {
        const serializedState = localStorage.getItem('savedForms');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState) as Form[];
    } catch (err) {
        console.error("Could not load state from localStorage", err);
        return [];
    }
};

const initialState: SavedFormsState = {
    forms: loadFormsFromLocalStorage(),
};

const savedFormsSlice = createSlice({
    name: 'savedForms',
    initialState,
    reducers: {
        addSavedForm: (state, action: PayloadAction<Form>) => {
            state.forms.push(action.payload);
            // It's important to save immediately after adding
            localStorage.setItem('savedForms', JSON.stringify(state.forms));
        },
        // You might also add reducers for deleting or updating saved forms
    },
});

export const { addSavedForm } = savedFormsSlice.actions;
export default savedFormsSlice.reducer;