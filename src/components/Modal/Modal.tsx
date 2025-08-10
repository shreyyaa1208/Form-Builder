import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FieldType,
  FormField,
  ValidationRule,
  ValidationRuleType,
} from "../../types/form.types";
import { useAppDispatch } from "../../hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { addFormField } from "../../features/forms/formsSlice";
import {
  Input,
  Checkbox,
  Stack,
  FormGroup,
  FormControlLabel,
  TextField,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateNewFieldModal = ({
  open,
  setOpen,
  fieldType,
  setFieldType,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fieldType: FieldType | null;
  setFieldType: React.Dispatch<React.SetStateAction<FieldType | null>>;
}) => {
  const dispatch = useAppDispatch();

  const [validationRules, setValidationRules] = React.useState<
    ValidationRule[]
  >([]);
  const [minLength, setMinLength] = React.useState<number>(0);
  const [maxLength, setMaxLength] = React.useState<number>(0);
  const [newOption, setNewOption] = React.useState("");

  const [newField, setNewField] = React.useState<FormField>({
    id: uuidv4(),
    type: fieldType || "text",
    label: "",
    required: false,
    validations: validationRules,
    isDerived: false,
    options: [],
  });

  const createNewField = () => {
    console.log("fieldType:", fieldType);
    console.log("Creating new field:", newField);
    dispatch(addFormField(newField));
    setOpen(false);
    setFieldType(null);
    setNewField({
      id: uuidv4(),
      type: fieldType || "text",
      label: "",
      required: false,
      validations: [],
      isDerived: false,
      options: [],
    });
    setFieldType(null);
  };

  React.useEffect(() => {
    setNewField((prev) => ({ ...prev, type: fieldType || "text" }));
  }, [fieldType]);

  const handleValidations = (type: ValidationRuleType, isChecked: boolean) => {
    let validationRule: ValidationRule = {
      type: "minLength",
      message: "Minimum length validation is enabled.",
    };
    if (type === "minLength" && isChecked) {
      validationRule = {
        type: "minLength",
        message: "Minimum length validation is enabled.",
        value: minLength,
      };
    }
    if (type === "maxLength" && isChecked) {
      validationRule = {
        type: "maxLength",
        message: "Maximum length validation is enabled.",
        value: maxLength,
      };
    }
    if (type === "email" && isChecked) {
      validationRule = {
        type: "email",
        message: "Email validation is enabled.",
      };
    }
    if (type === "password" && isChecked) {
      validationRule = {
        type: "password",
        message: "Password validation is enabled.",
      };
    }
    if (isChecked) {
      setNewField({
        ...newField,
        validations: [...newField.validations, validationRule],
      });
    } else {
      setNewField({
        ...newField,
        validations: newField.validations.filter((v) => v.type !== type),
      });
    }
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setNewField((prev) => ({
        ...prev,
        options: [...(prev.options || []), newOption.trim()],
      }));
      setNewOption("");
    }
  };

  const handleDeleteOption = (index: number) => {
    setNewField((prev) => ({
      ...prev,
      options: (prev?.options || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >{`Create a New ${
              (fieldType || "")?.charAt(0)?.toUpperCase() + fieldType?.slice(1)
            } Field`}</Typography>
            <Box sx={{ mt: 2 }}>
              <div>
                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                  Please provide the Field Label
                </Typography>
                <Input
                  type="text"
                  value={newField.label}
                  onChange={(e) =>
                    setNewField({ ...newField, label: e.target.value })
                  }
                  placeholder="Field Label"
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                  }}
                  required
                  aria-label="Field Label"
                />
              </div>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography variant="caption">
                  Is this a required field?
                </Typography>
                <Checkbox
                  checked={newField.required}
                  onChange={(e) =>
                    setNewField({ ...newField, required: e.target.checked })
                  }
                  aria-label="Is this a required field?"
                />
              </Stack>
              <div>
                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                  Do you want to set validation rules?
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newField.validations
                          .map((v) => v.type)
                          .includes("minLength")}
                        onChange={(e) =>
                          handleValidations("minLength", e.target.checked)
                        }
                        aria-label="minLength-validations"
                      />
                    }
                    label="Min Length"
                  />
                  {newField.validations.some((v) => v.type === "minLength") && (
                    <TextField
                      type="number"
                      label="Min Length Value"
                      value={minLength}
                      onChange={(e) => setMinLength(Number(e.target.value))}
                      size="small"
                      style={{ marginLeft: 16 }}
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newField.validations
                          .map((v) => v.type)
                          .includes("maxLength")}
                        onChange={(e) =>
                          handleValidations("maxLength", e.target.checked)
                        }
                        aria-label="maxLength-validations"
                      />
                    }
                    label="Max Length"
                  />
                  {newField.validations.some((v) => v.type === "maxLength") && (
                    <TextField
                      type="number"
                      label="Max Length Value"
                      value={maxLength}
                      onChange={(e) => setMaxLength(Number(e.target.value))}
                      size="small"
                      style={{ marginLeft: 16 }}
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newField.validations
                          .map((v) => v.type)
                          .includes("email")}
                        onChange={(e) =>
                          handleValidations("email", e.target.checked)
                        }
                        aria-label="email-validations"
                      />
                    }
                    label="Email Validation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newField.validations
                          .map((v) => v.type)
                          .includes("password")}
                        onChange={(e) =>
                          handleValidations("password", e.target.checked)
                        }
                        aria-label="password-validations"
                      />
                    }
                    label="Password Validation"
                  />
                </FormGroup>
              </div>
              {(fieldType === "select" || fieldType === "radio") && (
                <div>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1 }}
                  >
                    Options
                  </Typography>
                  <div
                    style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                  >
                    <TextField
                      label="New Option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      size="small"
                    />
                    <Button variant="contained" onClick={handleAddOption}>
                      Add
                    </Button>
                  </div>

                  {newField.options && (
                    <List>
                      {newField?.options.map((opt, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              onClick={() => handleDeleteOption(index)}
                            >
                              {/* <DeleteIcon /> */}
                            </IconButton>
                          }
                        >
                          <ListItemText primary={opt} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              )}
            </Box>
            <Box>
              <Button onClick={createNewField}>Create Field</Button>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </Box>
          </Box>
        </>
      </Modal>
    </div>
  );
};
