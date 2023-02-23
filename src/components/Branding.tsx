import { Stack, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Branding = () => {
  return (
    <Stack flexDirection="row" alignItems="center">
      <Box display={{ xs: "none", sm: "flex" }}>
        <img
          height="50px"
          width="60px"
          src="https://res.cloudinary.com/dllshtsed/image/upload/v1670287415/Frame_274_vkglt2.png"
          alt="Chef Cap Logo"
        />
      </Box>
      <Link to="/">
        <Typography color="#ed6c02" ml={{xs: 0, sm: 2}} variant="h6">
          <b>
            <i>TASTY KITCHENS</i>
          </b>
        </Typography>
      </Link>
    </Stack>
  );
};

export default Branding;
