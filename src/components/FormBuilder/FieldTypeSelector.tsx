import React from "react";
import { Box, Button, Grid } from "@mui/material"; // Only core MUI components here

// Import icons individually from @mui/icons-material
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TextareaAutosizeIcon from "@mui/icons-material/Notes"; // or pick any relevant icon
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useAppDispatch } from "../../hooks/redux";
import { addFormField } from "../../store/slices/formsSlice";
import { v4 as uuidv4 } from "uuid";
import { FormField } from "../../types/form.types";

// Define the available field types and their icons
const fieldTypes: {
  type:
    | "number"
    | "text"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "date";
  label: string;
  icon: React.ReactNode;
}[] = [
  { type: "text", label: "Text", icon: <TextFieldsIcon /> },
  { type: "number", label: "Number", icon: <FormatListBulletedIcon /> },
  { type: "textarea", label: "Textarea", icon: <TextareaAutosizeIcon /> },
  { type: "select", label: "Select", icon: <FormatListBulletedIcon /> },
  { type: "radio", label: "Radio", icon: <RadioButtonCheckedIcon /> },
  { type: "checkbox", label: "Checkbox", icon: <CheckBoxIcon /> },
  { type: "date", label: "Date", icon: <DateRangeIcon /> },
];

const FieldTypeSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddField = (
    type:
      | "number"
      | "text"
      | "textarea"
      | "select"
      | "radio"
      | "checkbox"
      | "date"
  ) => {
    const newField: FormField = {
      id: uuidv4(),
      type,
      label: "New " + type.charAt(0).toUpperCase() + type.slice(1) + " Field",
      required: false,
      validation: [],
      isDerived: false,
      options: type === "select" || type === "radio" ? ["Option 1"] : [],
    };

    dispatch(addFormField(newField));
  };

  return (
    <Box sx={{ p: 2, border: "1px dashed grey.400", borderRadius: 1 }}>
      <Grid container spacing={1}>
        {fieldTypes.map((fieldType) => (
          <Grid key={fieldType.type}>
            <Button
              variant="outlined"
              startIcon={fieldType.icon}
              fullWidth
              onClick={() => handleAddField(fieldType.type)}
            >
              {fieldType.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FieldTypeSelector;
