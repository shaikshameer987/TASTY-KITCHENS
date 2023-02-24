import { useState } from "react";
import { useAppDispatch } from "../store/hook";
import { removeItem, changeQty } from "../store/cartReducer";
import { Stack, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItemProps {
  item: {
    [key: string]: any;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const [cartQty, setCartQty] = useState(item.qty);
  const dispatch = useAppDispatch();

  const handleQtyChange = (newQty: number) => {
    if (newQty <= 0) {
      setCartQty(0);
      dispatch(removeItem(item));
    } else {
      setCartQty(newQty);
      dispatch(changeQty([item, newQty]));
    }
  };

  return (
    <Stack
      mb={5}
      flexDirection="row"
      alignItems="center"
      justifyContent={{ xs: "space-between", sm: "flex-start" }}
    >
      <Stack
        overflow="clip"
        mr={2}
        sx={{
          height: { xs: "120px", sm: "140px" },
          width: { xs: "180px", sm: "230px" },
        }}
      >
        <img src={item.image_url} alt="dish" />
      </Stack>
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        flexGrow={1}
        justifyContent={{ xs: "flex-start", sm: "space-between" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Typography
          variant="h6"
          minWidth={{ xs: "none", sm: "100px" }}
          maxWidth={{ xs: "none", sm: "100px" }}
        >
          {item.name}
        </Typography>
        <Stack flexDirection="row" alignItems="center">
          <IconButton
            onClick={() => {
              handleQtyChange(cartQty - 1);
              if (cartQty >= 1) {
                setCartQty(cartQty - 1);
              }
            }}
          >
            <RemoveIcon color="error" />
          </IconButton>
          <Typography ml={1} mr={1}>
            {cartQty}
          </Typography>
          <IconButton
            onClick={() => {
              handleQtyChange(cartQty + 1);
              setCartQty(cartQty + 1);
            }}
          >
            <AddIcon color="primary" />
          </IconButton>
        </Stack>
        <Typography variant="h6">
          <b>{Math.ceil(item.cost * item.qty)}</b>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CartItem;
