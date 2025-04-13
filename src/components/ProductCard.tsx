import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Product } from "../types/product";

interface Props {
  product: Product;
  onQuickView: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onQuickView }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={product.thumbnail}
      alt={product.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {product.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ${product.price} - ⭐ {product.rating}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={onQuickView}>
        View
      </Button>
    </CardActions>
  </Card>
);

export default ProductCard;
