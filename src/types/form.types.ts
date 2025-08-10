
export type ValidationRuleType = 'minLength' | 'maxLength' | 'email' | 'password';

export interface ValidationRule {
    type: ValidationRuleType;
    value?: string | number;
    message: string;
}

export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

// the structure of a single form field
export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    required: boolean;
    defaultValue?: any;
    validations: ValidationRule[];
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