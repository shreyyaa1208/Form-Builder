import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import { loadForm } from "../store/slices/formsSlice";
import { Form } from "../types/form.types";

const MyForms: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const savedForms = useAppSelector((state) => state.savedForms.forms);

  const handleFormClick = (form: Form) => {
    dispatch(loadForm(form));
    navigate("/preview");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Saved Forms
        </Typography>
        <List>
          {savedForms.length > 0 ? (
            savedForms.map((form) => (
              <ListItem key={form.id} disablePadding>
                <ListItemButton onClick={() => handleFormClick(form)}>
                  <ListItemText
                    primary={form.name}
                    secondary={`Created: ${new Date(
                      form.createdAt
                    ).toLocaleDateString()}`}
                  />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No forms saved yet. Go to the "Create Form" page to build your
              first one!
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default MyForms;
