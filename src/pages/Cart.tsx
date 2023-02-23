import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppSelector } from "../store/hook";
import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import CartItem from "../components/CartItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [cartTotal, setCartTotal] = useState(0);
  const cookie = Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    function handleCartTotal() {
      for (let item of cartItems) {
        total += item.cost * item.qty;
      }
    }
    handleCartTotal();
    setCartTotal(total);
  }, [cartItems]);

  useEffect(() => {
    if (!cookie) {
      navigate("/login");
    }
  }, [cookie, navigate]);

  return (
    <>
      <Header />
      {cartItems.length > 0 ? (
        <>
          <Box pl={3} pr={3}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              mb={3}
              display={{ xs: "none", sm: "flex" }}
            >
              <Typography variant="h6">
                <b>Item</b>
              </Typography>
              <Typography
                sx={{ position: "relative", left: "150px" }}
                variant="h6"
              >
                <b>Quantity</b>
              </Typography>
              <Typography variant="h6">
                <b>Rate</b>
              </Typography>
            </Stack>
            <Box>
              {cartItems.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </Box>
          </Box>
          <Divider sx={{ borderBottom: "1px solid rgba(0,0,0,0.5)" }} />
          <Stack flexDirection="row" justifyContent="space-between" p={4}>
            <Typography variant="h6">Order Total</Typography>
            <Typography variant="h6">{cartTotal}</Typography>
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="flex-end"
            pl={3}
            pr={3}
            mb={3}
          >
            <Button variant="contained" color="warning">
              Place Order
            </Button>
          </Stack>
        </>
      ) : (
        <Stack pt={6} pb={10} justifyContent="center">
          <Typography variant="h4" align="center">
            Cart is Empty
          </Typography>
        </Stack>
      )}
      <Footer />
    </>
  );
};

export default Cart;
