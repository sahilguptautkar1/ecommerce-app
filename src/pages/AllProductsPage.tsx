import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Pagination,
} from "@mui/material";
import api from "../utils/api";
import { Product } from "../types/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart, updateQuantity } from "../features/cart/cartSlice";
import QuickViewModal from "../components/QuickViewModal";
import { useLocation } from "react-router-dom";
import ProductFilters from "../components/ProductFilter";

const AllProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("");
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  const PRODUCTS_PER_PAGE = 6;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    api.get("/products?limit=100").then((res) => {
      const data: Product[] = res.data.products;
      setProducts(data);
      setFilteredProducts(data);
      setCategories([...new Set(data.map((p) => p.category))]);
      setBrands([...new Set(data.map((p) => p.brand))]);
    });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory.length) {
      result = result.filter((p) => selectedCategory.includes(p.category));
    }

    if (selectedBrand.length) {
      result = result.filter((p) => selectedBrand.includes(p.brand));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(result);
    setPage(1);
  }, [selectedCategory, selectedBrand, priceRange, sortBy, products]);

  const getQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const paginated = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const handleClearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setPriceRange([0, 1000]);
    setSortBy("");
  };

  return (
    <Box p={2} mt={8} sx={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 400, mb: 3, textAlign: { xs: "center", sm: "left" } }}
      >
        ALL PRODUCTS
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* Filters */}
        <ProductFilters
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          priceRange={priceRange}
          sortBy={sortBy}
          onPriceChange={setPriceRange}
          onCategoryChange={setSelectedCategory}
          onBrandChange={setSelectedBrand}
          onSortChange={setSortBy}
          onClearAll={handleClearAllFilters}
        />

        {/* Products */}
        <Box flex={1} display="flex" flexWrap="wrap" gap={3}>
          {paginated.map((product) => (
            <Box
              key={product.id}
              width={{ xs: "98%", sm: "46%", md: "30%" }}
              sx={{
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ height: { xs: 140, sm: 180 }, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600} noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="h5" color="error" fontWeight={700}>
                    ${product.price}
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        ml: 1,
                        color: "grey",
                      }}
                    >
                      ${Math.round(product.price * 1.4)}
                    </Typography>
                  </Typography>
                  <Box
                    mt={1}
                    display="flex"
                    flexDirection={{ md: "column", sm: "row", lg: "row" }}
                    alignItems={{ xs: "flex-start", sm: "flex-start" }}
                    gap={1}
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
                  flexDirection={{ md: "column", sm: "row", lg: "row" }}
                  gap={1}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    color="info"
                    onClick={() => setQuickViewProduct(product)}
                    sx={{
                      height: "40px",
                      width: { md: "100%", sm: "40%", lg: "40%" },
                    }}
                  >
                    View
                  </Button>

                  {getQuantity(product.id) === 0 ? (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        dispatch(addToCart({ ...product, quantity: 1 }))
                      }
                      sx={{
                        height: "40px",
                        width: { md: "100%", sm: "60%", lg: "60%" },
                      }}
                    >
                      ADD
                    </Button>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      border="1px solid #7fc3e8"
                      borderRadius={1}
                      sx={{
                        height: "40px",
                        width: { md: "100%", sm: "60%", lg: "60%" },
                      }}
                    >
                      <Button
                        size="small"
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
                        size="small"
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
                    </Box>
                  )}
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={6}>
        <Pagination
          count={Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
        />
      </Box>

      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Box>
  );
};

export default AllProductsPage;
