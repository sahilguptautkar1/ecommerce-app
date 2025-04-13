import React from "react";
import { Box } from "@mui/material";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  onQuickView: (product: Product) => void;
}

const ProductList: React.FC<Props> = ({ products, onQuickView }) => (
  <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
    {products.map((product) => (
      <Box
        key={product.id}
        flex="1 1 calc(25% - 16px)" // Adjust this based on screen size or replace with responsive styles
        minWidth={280}
        maxWidth="100%"
      >
        <ProductCard
          product={product}
          onQuickView={() => onQuickView(product)}
        />
      </Box>
    ))}
  </Box>
);

export default ProductList;
