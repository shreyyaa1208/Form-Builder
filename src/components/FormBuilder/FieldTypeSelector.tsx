import React from "react";
import { Button, Stack } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TextareaAutosizeIcon from "@mui/icons-material/Notes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { FieldType } from "../../types/form.types";
import { CreateNewFieldModal } from "../Modal/Modal";

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
  const [open, setOpen] = React.useState(false);
  const [fieldType, setFieldType] = React.useState<FieldType | null>("text");

  const handleAddField = (type: FieldType) => {
    setFieldType(type);
    setOpen(true);
  };

  return (
    <>
      <Stack p={2} direction={"row"} gap={1} flexWrap={"wrap"}>
        {fieldTypes.map((fieldType) => (
          <Button
            sx={{ minWidth: "auto" }}
            variant="outlined"
            startIcon={fieldType.icon}
            onClick={() => handleAddField(fieldType.type)}
            key={fieldType.label}
          >
            {fieldType.label}
          </Button>
        ))}
      </Stack>
      <CreateNewFieldModal
        open={open}
        setOpen={setOpen}
        fieldType={fieldType}
        setFieldType={setFieldType}
      />
    </>
  );
};

export default FieldTypeSelector;
