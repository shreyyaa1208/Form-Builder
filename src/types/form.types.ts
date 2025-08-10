
export type ValidationRuleType = 'required' | 'minLength' | 'maxLength' | 'email' | 'password' | 'custom';

export interface ValidationRule {
    type: ValidationRuleType;
    value?: string | number;
    message: string;
}

// the structure of a single form field
export interface FormField {
    id: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
    label: string;
    placeholder?: string;
    required: boolean;
    defaultValue?: any;
    validation: ValidationRule[];
    isDerived: boolean;
    parentFields?: string[];
    derivedFormula?: string;
    options?: string[];
}

// the structure of a complete form
export interface Form {
    id: string;
    name: string;
    fields: FormField[];
    createdAt: string;
}

export interface FormField {
    id: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
    label: string;
    placeholder?: string;
    required: boolean;
    defaultValue?: any;
    validation: ValidationRule[];
    // New properties for derived fields
    isDerived: boolean;
    parentFields?: string[];
    derivedFormula?: string;
    options?: string[];
}