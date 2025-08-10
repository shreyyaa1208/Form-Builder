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
  Box,
} from "@mui/material";
import { FormField } from "../../types/form.types";

interface FieldRendererProps {
  field: FormField;
  onClick?: (fieldId: string) => void;
  isSelected?: boolean;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  onClick,
  isSelected,
}) => {
  const [formValues, setFormValues] = React.useState<Record<string, any>>({});

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "number":
      case "date":
        return (
          <TextField
            fullWidth
            label={field.label}
            type={field.type}
            variant="outlined"
            required={field.required}
            inputProps={{
              "aria-label": field.label,
              minLength: field.validations.find(
                (rule) => rule.type === "minLength"
              )?.value,
              maxLength: field.validations.find(
                (rule) => rule.type === "maxLength"
              )?.value,
            }}
            onChange={(e) =>
              setFormValues({ ...formValues, [field.id]: e.target.value })
            }
            value={formValues[field.id] || ""}
          />
        );
      case "textarea":
        return (
          <TextField
            fullWidth
            label={field.label}
            multiline
            rows={4}
            variant="outlined"
            required={field.required}
            inputProps={{
              "aria-label": field.label,
              minLength: field.validations.find(
                (rule) => rule.type === "minLength"
              )?.value,
              maxLength: field.validations.find(
                (rule) => rule.type === "maxLength"
              )?.value,
            }}
            onChange={(e) =>
              setFormValues({ ...formValues, [field.id]: e.target.value })
            }
            value={formValues[field.id] || ""}
          />
        );
      case "select":
        return (
          <Select
            fullWidth
            label={field.label}
            variant="outlined"
            onChange={(e) =>
              setFormValues({ ...formValues, [field.id]: e.target.value })
            }
            value={formValues[field.id] || ""}
          >
            {field.options?.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      case "radio":
        return (
          <Box>
            <FormLabel>{field.label}</FormLabel>
            <RadioGroup row>
              {field.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>
        );
      case "checkbox":
        return <FormControlLabel control={<Checkbox />} label={field.label} />;
      default:
        return null;
    }
  };

  return (
    // <Box
    //   sx={{
    //     p: 2,
    //     mb: 2,
    //     border: "1px solid",
    //     borderColor: isSelected ? "primary.main" : "grey.300",
    //     borderRadius: 1,
    //     cursor: "pointer",
    //     "&:hover": {
    //       boxShadow: 2,
    //     },
    //   }}
    //   // onClick={() => onClick && onClick(field.id)}
    //   onClick={(e) => {
    //     const input = e.currentTarget.querySelector("input, textarea, select") as HTMLElement;
    //     input?.focus();
    //   }}
    // >
    <>{renderField()}</>
    // </Box>
  );
};

export default FieldRenderer;
