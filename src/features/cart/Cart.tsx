import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateQuantity, removeFromCart } from "./cartSlice";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box
      px={{ xs: 2, sm: 3, md: 6 }}
      py={4}
      mt={5}
      sx={{ background: "#f5f7fa", minHeight: "80vh" }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          mb: 3,
          textAlign: { xs: "center", sm: "left" },
          textTransform: "uppercase",
        }}
      >
        Your Cart
      </Typography>

      {items.length === 0 ? (
        <Box
          mt={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="empty-cart"
            width={isMobile ? 120 : 160}
            style={{ opacity: 0.6 }}
          />
          <Typography variant="h6" mt={2} color="text.secondary">
            Your cart is empty!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            href="/products"
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            maxWidth="900px"
            mx="auto"
          >
            {items.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { sm: "center" },
                  justifyContent: "space-between",
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  boxShadow: 3,
                  gap: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{
                    height: 80,
                    width: 80,
                    objectFit: "cover",
                    borderRadius: 2,
                    mx: { xs: "auto", sm: 0 },
                  }}
                />
                <Box flex={1} width="100%">
                  <CardContent
                    sx={{
                      p: 0,
                      textAlign: { xs: "center", sm: "left" }, // Center on small screens
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                      sx={{
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        fontSize: { xs: "14px", sm: "16px" },
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{
                        fontSize: { xs: "13px", sm: "14px" },
                      }}
                    >
                      ${item.price} each
                    </Typography>

                    <Box
                      display="flex"
                      justifyContent={{ xs: "center", sm: "flex-start" }}
                      alignItems="center"
                      gap={1}
                      mt={1}
                    >
                      <Button
                        size="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity === 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Typography fontWeight={500}>{item.quantity}</Typography>
                      <Button
                        size="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        <AddIcon fontSize="small" />
                      </Button>
                    </Box>
                  </CardContent>
                </Box>

                <CardActions
                  sx={{
                    flexDirection: "column",
                    gap: 1,
                    alignItems: { xs: "center", sm: "flex-end" },
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    onClick={() => dispatch(removeFromCart(item.id))}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>

          <Box textAlign="center" mt={2}>
            <Typography variant="h5" fontWeight={600} mb={2}>
              Total: ${total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
