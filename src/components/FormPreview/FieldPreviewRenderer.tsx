// src/components/FormPreview/FieldPreviewRenderer.tsx
import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  InputLabel,
  Box,
  FormHelperText,
} from "@mui/material";
import { FormField } from "../../types/form.types";

interface FieldPreviewRendererProps {
  field: FormField;
  register: any; // Use the register function from react-hook-form
  errors: any; // Pass the errors object from react-hook-form
  setValue: (name: string, value: any) => void;
}

const FieldPreviewRenderer: React.FC<FieldPreviewRendererProps> = ({
  field,
  register,
  errors,
  setValue,
}) => {
  const commonProps = {
    ...register(field.id),
    label: field.label,
    error: !!errors[field.id],
    helperText: errors[field.id]?.message,
    fullWidth: true,
    disabled: field.isDerived,
    sx: { mb: 2 },
  };

  switch (field.type) {
    case "text":
    case "number":
    case "date":
      return (
        <TextField
          {...commonProps}
          type={field.type}
          InputLabelProps={{ shrink: field.type === "date" }}
        />
      );
    case "textarea":
      return <TextField {...commonProps} multiline rows={4} />;
    case "select":
      return (
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          disabled={field.isDerived}
          error={!!errors[field.id]}
        >
          <InputLabel>{field.label}</InputLabel>
          <Select label={field.label} {...commonProps}>
            {field.options?.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors[field.id]?.message}</FormHelperText>
        </FormControl>
      );
    case "radio":
      return (
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          disabled={field.isDerived}
          error={!!errors[field.id]}
        >
          <FormLabel>{field.label}</FormLabel>
          <RadioGroup row {...register(field.id)}>
            {field.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{errors[field.id]?.message}</FormHelperText>
        </FormControl>
      );
    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox {...register(field.id)} disabled={field.isDerived} />
          }
          label={field.label}
          sx={{ mb: 2 }}
        />
      );
    default:
      return null;
  }
};

export default FieldPreviewRenderer;
