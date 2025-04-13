import React from "react";
import {
  Typography,
  Slider,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Button,
  Box,
} from "@mui/material";

interface Props {
  categories: string[];
  brands: string[];
  selectedCategory: string[];
  selectedBrand: string[];
  priceRange: number[];
  sortBy: string;
  onPriceChange: (range: number[]) => void;
  onCategoryChange: (val: string[]) => void;
  onBrandChange: (val: string[]) => void;
  onSortChange: (val: string) => void;
  onClearAll: () => void; // ✅ New prop
}

const ProductFilters: React.FC<Props> = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  priceRange,
  sortBy,
  onPriceChange,
  onCategoryChange,
  onBrandChange,
  onSortChange,
  onClearAll,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: { xs: "90%", sm: "90%", md: "250px" },
        p: 3,
        height: "400px",
        borderRadius: 3,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)",
        flexShrink: 0,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          Filters
        </Typography>
        <Button
          onClick={onClearAll}
          size="small"
          color="error"
          sx={{ fontSize: "12px", textTransform: "none" }}
        >
          Clear All
        </Button>
      </Box>

      <Typography mt={2} fontWeight={500}>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(e, val) => onPriceChange(val as number[])}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />

      <Typography mt={2} fontWeight={500}>
        Categories
      </Typography>
      <FormControl fullWidth size="small" sx={{ mt: 1 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as string[])}
          label="Categories"
          renderValue={(selected) => selected.join(", ")}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Checkbox checked={selectedCategory.includes(cat)} />
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography mt={2} fontWeight={500}>
        Brands
      </Typography>
      <FormControl fullWidth size="small" sx={{ mt: 1 }}>
        <InputLabel>Brands</InputLabel>
        <Select
          multiple
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value as string[])}
          label="Brands"
          renderValue={(selected) => selected.join(", ")}
        >
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              <Checkbox checked={selectedBrand.includes(brand)} />
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography mt={2} fontWeight={500}>
        Sort By
      </Typography>
      <FormControl fullWidth size="small" sx={{ mt: 1 }}>
        <InputLabel>Sort</InputLabel>
        <Select label="Sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default ProductFilters;
