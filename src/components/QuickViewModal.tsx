import React from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Rating,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../types/product";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<Props> = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box
        display="flex"
        p={3}
        gap={4}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          position: "relative", // Needed for absolute positioning of close button
        }}
      >
        {/* Close Button Fixed to Top Right */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Image Panel */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              maxHeight: 400,
              width: "100%",
              objectFit: "contain",
              borderRadius: 8,
              background: "#f5f5f5",
              padding: 8,
            }}
          />
        </Box>

        {/* Details Panel */}
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          {/* Title */}
          <Typography variant="h6" fontWeight={700}>
            {product.title}
          </Typography>

          {/* Price */}
          <Typography variant="h5" color="error" fontWeight={700}>
            ${product.price}
            <Typography
              component="span"
              sx={{ textDecoration: "line-through", color: "grey", ml: 1 }}
            >
              ${Math.round(product.price * 1.4)}
            </Typography>
          </Typography>

          {/* Rating */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {product.rating} / 5
            </Typography>
          </Stack>

          {/* Description */}
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <Divider />

          {/* Additional Details */}
          <Box>
            <Typography variant="body2">
              <strong>Brand:</strong> {product.brand}
            </Typography>
            <Typography variant="body2">
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography variant="body2">
              <strong>In Stock:</strong>{" "}
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </Typography>
          </Box>

          {/* Tags / Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label={product.category} variant="outlined" />
            <Chip label={product.brand} variant="outlined" />
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};

export default QuickViewModal;
