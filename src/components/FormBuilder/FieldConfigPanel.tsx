import React from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { FormField } from "../../types/form.types";
import { useAppDispatch } from "../../hooks/redux";
import { updateField } from "../../store/slices/formsSlice"; // You'll create this action

interface FieldConfigPanelProps {
  field: FormField;
}

const FieldConfigPanel: React.FC<FieldConfigPanelProps> = ({ field }) => {
  const dispatch = useAppDispatch();

  const handleUpdate = (updates: Partial<FormField>) => {
    dispatch(updateField({ fieldId: field.id, updates }));
  };

  return (
    <Box sx={{ p: 2, borderLeft: "1px solid grey.300", minWidth: 300 }}>
      <Typography variant="h6" gutterBottom>
        Configure Field
      </Typography>
      <TextField
        label="Label"
        value={field.label}
        onChange={(e) => handleUpdate({ label: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={field.required}
            onChange={(e) => handleUpdate({ required: e.target.checked })}
          />
        }
        label="Required"
      />
      {/* ... Add more controls for validation, options, derived fields, etc. */}
    </Box>
  );
};

export default FieldConfigPanel;
