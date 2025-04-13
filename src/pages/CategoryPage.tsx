// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { Product } from "../types/product";
import ProductList from "../components/ProductList";
import QuickViewModal from "../components/QuickViewModal";
import { Box, Typography, CircularProgress } from "@mui/material";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      api
        .get(`/products/category/${categoryName}`)
        .then((res) => setProducts(res.data.products))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }
  }, [categoryName]);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {categoryName?.toUpperCase()}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : products.length ? (
        <ProductList products={products} onQuickView={setQuickViewProduct} />
      ) : (
        <Typography>No products found in this category.</Typography>
      )}

      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Box>
  );
};

export default CategoryPage;
