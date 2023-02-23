import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch } from "../store/hook";
import { addItem, removeItem, changeQty } from "../store/cartReducer";

interface DishProps {
  item: { [key: string]: any };
}
const Dish = ({ item }: DishProps) => {
  const [qty, setQty] = useState(item.qty);
  const dispatch = useAppDispatch();

  const handleQtyChange = (newqty: number) => {
    if (newqty === 1) {
      dispatch(addItem(item));
    } else if (newqty <= 0) {
      dispatch(removeItem(item));
    }
    dispatch(changeQty([item, newqty]));
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
      <Card>
        <CardMedia
          component="img"
          sx={{
            height: { xs: "250px", sm: "180px", md: "150px" },
          }}
          image={item.image_url}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {item.name}
          </Typography>
          <Typography gutterBottom>{item.cost} &#8377;</Typography>
          <Typography gutterBottom>{item.rating} &#9733;</Typography>
          {qty <= 0 && (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                handleQtyChange(qty + 1);
                setQty(qty + 1);
              }}
            >
              Add
            </Button>
          )}
          {qty >= 1 && (
            <Stack flexDirection="row" alignItems="center" mt={1}>
              <IconButton
                onClick={() => {
                  handleQtyChange(qty - 1);
                  if (qty >= 1) {
                    setQty(qty - 1);
                  }
                }}
              >
                <RemoveIcon color="error" />
              </IconButton>
              <Typography ml={1} mr={1}>
                {qty}
              </Typography>
              <IconButton
                onClick={() => {
                  handleQtyChange(qty + 1);
                  setQty(qty + 1);
                }}
              >
                <AddIcon color="primary" />
              </IconButton>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Dish;
