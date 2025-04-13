import React from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShoppingBag, Storefront } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="fixed" elevation={2}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "row", sm: "row" },
          alignItems: { xs: "center", sm: "center" },
          gap: { xs: 1, sm: 0 },
          px: { xs: 1, sm: 3 },
          py: { xs: 1, sm: 0 },
        }}
      >
        {/* Logo */}
        <Button
          onClick={() => navigate("/")}
          disableRipple
          startIcon={
            <Badge color="secondary">
              <Storefront fontSize="large" />
            </Badge>
          }
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { xs: "20px", sm: "28px" },
            fontWeight: 900,
            letterSpacing: "2px",
            color: "#fff",
            background:
              "linear-gradient(to right,rgb(248, 253, 255), rgb(198, 217, 251))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
            "&:hover": {
              background:
                "linear-gradient(to right,rgb(248, 253, 255), rgb(198, 217, 251))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          SHOPPINGO
        </Button>

        {/* Right Navigation Buttons */}
        <Box
          display="flex"
          flexDirection={{ xs: "row", sm: "row" }}
          gap={1}
          alignItems={{ xs: "flex-start", sm: "center" }}
          // mt={{ xs: 2, sm: 0 }}
        >
          {/* All Products */}
          <Button
            color="inherit"
            onClick={() => navigate("/products")}
            startIcon={<ShoppingBag />}
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              width: { xs: "40px", sm: "auto" },
              justifyContent: "center",
              minWidth: isMobile ? "40px" : "auto",
              "& .MuiButton-startIcon": {
                margin: 1,
                "& svg": {
                  fontSize: { xs: "26px", sm: "20px" }, // 🔥 Bigger icon on small screens
                },
              },
            }}
          >
            {!isMobile && "All Products"}
          </Button>

          {/* Cart */}
          <Button
            color="inherit"
            onClick={() => navigate("/cart")}
            startIcon={
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            }
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              width: { xs: "40px", sm: "auto" },
              justifyContent: "center",
              minWidth: isMobile ? "40px" : "auto",
              "& .MuiButton-startIcon": {
                margin: 1,
                "& svg": {
                  fontSize: { xs: "26px", sm: "20px" }, // 🔥 Bigger icon on small screens
                },
              },
            }}
          >
            {!isMobile && "Cart"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
