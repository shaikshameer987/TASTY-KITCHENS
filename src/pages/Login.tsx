import { Stack, TextField, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

interface Error {
  isError: boolean;
  errorMessage: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [error, setError] = useState<Error>({
    isError: false,
    errorMessage: "",
  });
  const navigate = useNavigate();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("https://apis.ccbp.in/login", JSON.stringify(user))
      .then((res) => {
        Cookies.set("accessToken", res.data.jwt_token);
        setError({
          isError: false,
          errorMessage: "",
        });
        setUser({ username: "", password: "" });
        navigate("/");
      })
      .catch((error) => {
        setError({
          isError: true,
          errorMessage: `${error.response.data.error_msg}`,
        });
      });
  };

  return (
    <Stack direction={{ xs: "column-reverse", sm: "row" }}>
      <Stack
        height={{ xs: "35vh", sm: "100vh" }}
        width={{ xs: "100%", sm: "50%" }}
        alignItems={{ xs: "flexstart", sm: "center" }}
        justifyContent="center"
      >
        <Stack
          alignItems="center"
          width="100%"
          display={{ xs: "none", sm: "flex" }}
        >
          <img
            height="50px"
            width="60px"
            src="https://res.cloudinary.com/dllshtsed/image/upload/v1670287415/Frame_274_vkglt2.png"
            alt="Chef Cap Logo"
          />
          <Typography
            mt={"10px"}
            variant="h6"
            color="#f7931e"
            fontWeight="bold"
          >
            <i>TASTY KITCHENS</i>
          </Typography>
        </Stack>
        <Typography
          variant="h5"
          mt={"30px"}
          mb={"30px"}
          fontWeight="bold"
          ml={{ xs: "5%", sm: "0px" }}
        >
          Login
        </Typography>
        <form
          onSubmit={handleUserLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <TextField
            label="USERNAME"
            value={user.username}
            name="username"
            onChange={handleUserInput}
            sx={{
              marginBottom: "30px",
              width: { ...{ xs: "90%", sm: "70%" } },
            }}
            color="primary"
            required
            type={"text"}
            size="medium"
          />
          <TextField
            label="PASSWORD"
            name="password"
            value={user.password}
            onChange={handleUserInput}
            sx={{
              marginBottom: "30px",
              width: { ...{ xs: "90%", sm: "70%" } },
            }}
            color="primary"
            required
            type={"password"}
            size="medium"
            helperText={error.isError ? error.errorMessage : ""}
            {...(error.isError ? { error: true } : {})}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              height: "45px",
              marginBottom: "30px",
              width: { ...{ xs: "90%", sm: "70%" } },
            }}
            size="medium"
          >
            LOGIN
          </Button>
        </form>
      </Stack>
      <Stack
        overflow="hidden"
        width={{ xs: "100%", sm: "50%" }}
        height={{ xs: "55vh", sm: "100vh" }}
      >
        <Box
          component="img"
          position={{ xs: "relative" }}
          right={{ xs: "-40px", sm: "0px" }}
          top={{ xs: "-30px", sm: "0px" }}
          width={{ xs: "95%", sm: "100%" }}
          sx={{
            height: "100%",
            borderTopLeftRadius: { xs: "50%", sm: "0%" },
            borderBottomLeftRadius: { xs: "50%", sm: "0%" },
            borderBottomRightRadius: { xs: "50%", sm: "0%" },
          }}
          alt="Egg Sandwitch"
          src="https://res.cloudinary.com/dquxo9syn/image/upload/v1674744325/Tasty%20Kitchens/ts_dys49r.jpg"
        />
      </Stack>
    </Stack>
  );
};

export default Login;
