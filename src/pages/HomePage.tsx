import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Product } from "../types/product";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";

import QuickViewModal from "../components/QuickViewModal";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CardMedia,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

export interface Category {
  slug: string;
  name: string;
  url: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [flashDeals, setFlashDeals] = useState<Product[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const getQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    api.get("/products?limit=12").then((res) => setProducts(res.data.products));
    api.get("/products/categories").then((res) => setCategories(res.data));
    api
      .get("/products?limit=5&skip=10")
      .then((res) => setFlashDeals(res.data.products));
  }, []);

  const navigate = useNavigate();

  return (
    <Box p={2} mt={8}>
      <Box sx={{ px: { xs: 1, sm: 2 }, overflow: "hidden" }}>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            600: {
              slidesPerView: 1.2,
              spaceBetween: 24,
            },
            960: {
              slidesPerView: 1.5,
              spaceBetween: 30,
            },
          }}
          style={{
            paddingBottom: "30px",
            overflow: "visible",
          }}
        >
          {products.slice(0, 5).map((product) => (
            <SwiperSlide key={product.id}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                gap={3}
                sx={{
                  background: "linear-gradient(to right, #fdfbfb, #ebedee)",
                  p: { xs: 2, sm: 3, md: 4 },
                  cursor: "pointer",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
                onClick={() => setQuickViewProduct(product)}
              >
                <Box
                  flexShrink={0}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { xs: "100%", md: "40%" },
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      maxHeight: "250px",
                      width: "100%",
                      borderRadius: "12px",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Box
                  flex={1}
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  {/* <Box minWidth={300} mb={1}> */}
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "16px", sm: "18px", md: "20px" },
                      lineHeight: 1.3,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      fontSize: { xs: "14px", sm: "15px" },
                    }}
                  >
                    {product.description}
                  </Typography>

                  {/* </Box> */}
                  <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={700}
                    mb={1}
                  >
                    ${product.price}
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "grey",
                        ml: 1,
                      }}
                    >
                      ${Math.round(product.price * 1.4)}
                    </Typography>
                  </Typography>

                  <Box
                    mb={1}
                    display="flex"
                    flexWrap="wrap"
                    justifyContent={{ xs: "center", md: "flex-start" }}
                  >
                    <Chip
                      label={`${product.rating} ★`}
                      color={
                        product.rating >= 3.5
                          ? "success"
                          : product.rating > 2
                          ? "warning"
                          : "error"
                      }
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      label={product.brand}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color={product.stock < 10 ? "error" : "textSecondary"}
                  >
                    {product.stock < 10 ? "Low Stock" : "In Stock"} (
                    {product.stock} items left)
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Category Showcase */}
      <Box mt={6} mb={4}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 400,
            mb: 3,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          SHOP BY CATEGORY
        </Typography>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={18}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          slidesPerGroup={3}
          breakpoints={{
            0: { slidesPerView: 2.3, spaceBetween: 10, slidesPerGroup: 2 },
            360: { slidesPerView: 2.8, slidesPerGroup: 2 },
            480: { slidesPerView: 3.5, slidesPerGroup: 3 },
            600: { slidesPerView: 4.5, slidesPerGroup: 3 },
            960: { slidesPerView: 5.5, slidesPerGroup: 3 },
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  backgroundColor: "rgba(170, 211, 241, 0.5)",
                  p: 1.5,
                  borderRadius: 2,
                  height: "70px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  minWidth: 100,
                  flexShrink: 0,
                  mb: 4,
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/products?category=${encodeURIComponent(
                      cat.name.toLowerCase()
                    )}`
                  )
                }
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "12px", sm: "16px", md: "18px" },
                    overflowWrap: "anywhere",
                    wordBreak: "break-word", // handle long unbroken strings
                  }}
                >
                  {cat.name.toUpperCase()}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* New Arrivals */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 400, mb: 3, textAlign: { xs: "center", sm: "left" } }}
      >
        NEW ARRIVALS
      </Typography>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          960: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        spaceBetween={16}
        style={{ marginBottom: "30px" }}
      >
        {products.slice(0, 6).map((product) => (
          <SwiperSlide key={product.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4,
                my: 4,
                overflow: "hidden",
                background: "linear-gradient(to bottom, #fff, #f9f9f9)",
                transition: "all 0.3s ease",
                position: "relative",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                image={product.thumbnail}
                alt={product.title}
                sx={{ objectFit: "cover", height: { xs: 150, sm: 180 } }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 0,
                  backgroundColor: "#ffd700",
                  px: 1.5,
                  py: 0.5,
                  fontSize: "12px",
                  fontWeight: 600,
                  borderRadius: "0 6px 6px 0",
                  color: "#333",
                }}
              >
                New
              </Box>

              <CardContent>
                <Typography
                  fontSize={{ xs: 14, sm: 15 }}
                  fontWeight={600}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  mb={1}
                >
                  {product.title}
                </Typography>

                <Typography variant="h6" color="primary" fontWeight={700}>
                  ${product.price}
                </Typography>

                <Box my={1}>
                  <Chip
                    label={`${product.rating} ★`}
                    color={
                      product.rating >= 3.5
                        ? "success"
                        : product.rating > 2
                        ? "warning"
                        : "error"
                    }
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {product.brand && (
                    <Chip
                      label={product.brand}
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Box>
              </CardContent>

              <Box
                px={2}
                pb={2}
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                gap={1}
              >
                <Button
                  variant="outlined"
                  color="info"
                  sx={{
                    width: { xs: "100%", sm: "40%" },
                    height: "40px",
                  }}
                  onClick={() => setQuickViewProduct(product)}
                >
                  View
                </Button>

                {getQuantity(product.id) === 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      dispatch(addToCart({ ...product, quantity: 1 }))
                    }
                    sx={{
                      width: { xs: "100%", sm: "60%" },
                      height: "40px",
                    }}
                  >
                    ADD
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{
                      width: { xs: "100%", sm: "60%" },

                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: getQuantity(product.id) - 1,
                          })
                        )
                      }
                    >
                      −
                    </Button>
                    <Typography fontWeight={500}>
                      {getQuantity(product.id)}
                    </Typography>
                    <Button
                      color="primary"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: getQuantity(product.id) + 1,
                          })
                        )
                      }
                    >
                      +
                    </Button>
                  </Button>
                )}
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flash Deals */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3, mt: 6 }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#e53935", fontStyle: "italic" }}
        >
          EXCLUSIVE OFFERS
        </Typography>
      </Box>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        // navigation={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          960: { slidesPerView: 3.5 },
        }}
        style={{ marginBottom: "40px" }}
      >
        {products.slice(6, 12).map((product) => {
          const productDeadline = new Date(
            Date.now() + (Math.random() * 1.5 + 0.5) * 60 * 60 * 1000
          );
          return (
            <SwiperSlide key={product.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  marginTop: 2,
                  height: 420,
                  marginBottom: 5,
                  overflow: "hidden",
                  background: "linear-gradient(to top right, #fff8f6, #ffe3e3)",
                  position: "relative",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ objectFit: "cover", filter: "brightness(95%)" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 0,
                    backgroundColor: "#ff1744",
                    px: 1.5,
                    py: 0.5,
                    fontSize: "13px",
                    fontWeight: 700,
                    borderRadius: "0 8px 8px 0",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  Flash Deal
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mb: 0.5,
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography variant="h5" color="error" fontWeight={700}>
                    ${product.price}
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "grey",
                        ml: 1,
                      }}
                    >
                      ${Math.round(product.price * 1.4)}
                    </Typography>
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Box mt={1}>
                      <Chip
                        label={`${product.rating} ★`}
                        color={
                          product.rating >= 3.5
                            ? "success"
                            : product.rating > 2
                            ? "warning"
                            : "error"
                        }
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {product.brand && (
                        <Chip
                          label={product.brand}
                          variant="outlined"
                          size="small"
                        />
                      )}
                    </Box>
                  </Box>
                </CardContent>
                <Box px={2} pb={2} display="flex" flexDirection="row" gap={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      width: "40%",
                      height: "40px",
                    }}
                    onClick={() => setQuickViewProduct(product)}
                  >
                    View
                  </Button>
                  {getQuantity(product.id) === 0 ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        dispatch(addToCart({ ...product, quantity: 1 }))
                      }
                      sx={{
                        width: "60%",
                        height: "40px",
                      }}
                    >
                      Grab Now
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{
                        width: "60%",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // gap: 1,
                      }}
                      color="error"
                    >
                      <Button
                        // variant=""
                        color="error"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: product.id,
                              quantity: getQuantity(product.id) - 1,
                            })
                          )
                        }
                      >
                        −
                      </Button>
                      <Typography fontWeight={400}>
                        {getQuantity(product.id)}
                      </Typography>
                      <Button
                        // variant="outlined"
                        color="error"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: product.id,
                              quantity: getQuantity(product.id) + 1,
                            })
                          )
                        }
                      >
                        +
                      </Button>
                    </Button>
                  )}
                </Box>
                <Box px={2} pb={2}>
                  <CountdownTimer deadline={productDeadline} />
                </Box>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Box>
  );
};

/* Countdown Timer Component */
const CountdownTimer: React.FC<{ deadline: Date }> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    Math.floor((deadline.getTime() - Date.now()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}h : ${m
      .toString()
      .padStart(2, "0")}m : ${s.toString().padStart(2, "0")}s`;
  };

  return (
    <Typography variant="body2">Ends in: {formatTime(timeLeft)}</Typography>
  );
};

export default HomePage;
