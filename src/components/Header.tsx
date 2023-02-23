import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Stack, Button, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Branding from "./Branding";

const Header = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    Cookies.remove("accessToken");
    navigate("/login");
  }, [navigate]);

  return (
    <header>
      <Stack padding={3} flexDirection="row" justifyContent="space-between">
        <Branding />
        <Stack display={{ xs: "flex", sm: "none" }}>
          <IconButton
            aria-label="menu"
            onClick={() => setMobileNav(!mobileNav)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Stack
          flexDirection="row"
          alignItems="center"
          display={{ xs: "none", sm: "flex" }}
        >
          <Link to="/">
            <Typography variant="body1" sx={{ color: "black" }} mr={2}>
              <b>Home</b>
            </Typography>
          </Link>
          <Link to="/cart">
            <Typography variant="body1" sx={{ color: "black" }} mr={2}>
              <b>Cart</b>
            </Typography>
          </Link>
          <Button
            variant="contained"
            size="small"
            color="warning"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Stack>

      <Stack
        flexDirection="row"
        ml={4}
        mb={3}
        alignItems="center"
        display={mobileNav ? { xs: "flex", sm: "none" } : "none"}
      >
        <Link to="/">
          <Typography variant="body1" sx={{ color: "black" }} mr={2}>
          <b>Home</b>
          </Typography>
        </Link>
        <Link to="/cart">
          <Typography variant="body1" sx={{ color: "black" }} mr={2}>
          <b>Cart</b>
          </Typography>
        </Link>
        <Button
          variant="contained"
          size="small"
          color="warning"
          onClick={() => {
            Cookies.remove("accessToken");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Stack>
    </header>
  );
};

export default Header;
