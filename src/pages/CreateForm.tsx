import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addSavedForm } from "../features/savedForms/savedFormsSlice";
import { v4 as uuidv4 } from "uuid";
import FormBuilder from "../components/FormBuilder/FormBuilder";

const CreateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentForm = useAppSelector((state) => state.forms.currentForm);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [formName, setFormName] = useState("");

  const handleSaveForm = () => {
    if (formName.trim()) {
      const newForm = {
        ...currentForm,
        id: uuidv4(),
        name: formName,
        createdAt: new Date().toISOString(),
      };
      dispatch(addSavedForm(newForm));
      setOpenSaveDialog(false);
      setFormName("");
      alert(`Form "${formName}" saved successfully!`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Create New Form
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenSaveDialog(true)}
              disabled={currentForm.fields.length === 0}
            >
              Save Form
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          {/* This is the FormBuilder component where all the magic happens */}
          <FormBuilder />
        </Box>

        {/* Save Form Dialog */}
        <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
          <DialogTitle>Save Form</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Form Name"
              type="text"
              fullWidth
              variant="standard"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSaveDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveForm} disabled={!formName.trim()}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default CreateForm;
