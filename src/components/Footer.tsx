import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      p: 2,
      textAlign: "center",
      bgcolor: "primary.main",
      color: "white",
      mt: "auto", // Important for sticky footer behavior
    }}
  >
    <Typography variant="body2">
      © 2025 Shoppingo. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;