import Branding from "./Branding";
import { Stack, Typography, Link, IconButton } from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <footer>
      <Stack alignItems="center" bgcolor="#0F172A" p={5}>
        <Branding />
        <Typography
          variant="body1"
          color="white"
          marginTop={3}
          marginBottom={3}
        >
          The only thing we are serious about is food. Contact us on
        </Typography>
        <Stack flexDirection="row">
          <Link marginRight={2}>
            <IconButton aria-label="pinterest">
              <PinterestIcon fontSize="large" color="primary"/>
            </IconButton>
          </Link>
          <Link marginRight={2}>
            <IconButton aria-label="pinterest">
              <InstagramIcon fontSize="large" color="primary" />
            </IconButton>
          </Link>
          <Link marginRight={2}>
            <IconButton aria-label="pinterest">
              <TwitterIcon fontSize="large" color="primary" />
            </IconButton>
          </Link>
          <Link marginRight={2}>
            <IconButton aria-label="pinterest">
              <FacebookIcon fontSize="large" color="primary" />
            </IconButton>
          </Link>
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
