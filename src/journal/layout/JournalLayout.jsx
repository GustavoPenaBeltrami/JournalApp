import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Navbar, Sidebar } from "../components";

const drawerWidth = 260;

export const JournalLayout = ({ children }) => {
  return (
    <Box className="animate__animated animate__fadeIn" sx={{ display: "flex" }}>
      <Navbar drawerWidth={drawerWidth} />

      <Sidebar drawerWidth={drawerWidth}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        {children}
      </Box>
    </Box>
  );
};
