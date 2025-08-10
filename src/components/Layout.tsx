import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form Builder
          </Typography>
          <Box>
            <Button color="inherit" component={NavLink} to="/">
              Create
            </Button>
            <Button color="inherit" component={NavLink} to="/preview">
              Preview
            </Button>
            <Button color="inherit" component={NavLink} to="/myforms">
              My Forms
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
