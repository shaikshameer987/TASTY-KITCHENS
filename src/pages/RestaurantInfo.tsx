import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Stack, Box, Typography, Grid } from "@mui/material";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { RestaurantsType } from "../components/Restaurants";
import Dish from "../components/Dish";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const RestaurantInfo = () => {
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantsType>({});
  const cookie = Cookies.get("accessToken");
  const { id } = useParams();
  const arr = new Array(12).fill(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie) {
      fetch("https://apis.ccbp.in/restaurants-list/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.food_items.forEach((i: RestaurantsType) => (i.qty = 0));
          setRestaurantInfo(res);
        });
    }
  }, [cookie, id]);

  useEffect(() => {
    if (!cookie) {
      navigate("/login");
    }
  }, [cookie, navigate]);

  return (
    <>
      <Header />
      <Stack
        pl={4}
        pr={4}
        flexDirection={{ xs: "column", sm: "row" }}
        marginBottom={2}
      >
        {restaurantInfo.food_items && restaurantInfo.food_items.length > 0 ? (
          <>
            <Stack
              justifyContent="center"
              marginBottom={{ xs: 2, sm: 0 }}
              maxWidth={{ xs: "100%", sm: "300px" }}
              maxHeight={{ xs: "200px", sm: "200px" }}
              marginRight={{ xs: "0px", sm: "20px" }}
              overflow="clip"
            >
              <img src={restaurantInfo.image_url} width="100%" alt="dish" />
            </Stack>
            <Stack justifyContent="center">
              <Typography variant="h6" gutterBottom>
                {restaurantInfo.name}
              </Typography>
              <Typography gutterBottom>{restaurantInfo.cuisine}</Typography>
              <Typography mb={1}>{restaurantInfo.location}</Typography>
              <Stack flexDirection="row">
                <Box borderRight="1px solid black" pr={2}>
                  <Typography>&#9733; {restaurantInfo.rating}</Typography>
                  <Typography>
                    {restaurantInfo.reviews_count} + ratings
                  </Typography>
                </Box>
                <Box pl={2}>
                  <Typography>&#8377; {restaurantInfo.cost_for_two}</Typography>
                  <Typography>cost for two</Typography>
                </Box>
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack flexGrow={1} flexDirection={{ xs: "column", sm: "row" }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: { xs: "100%", sm: "250px", md: "300px" },
                height: { xs: "150px", sm: "150px" },
                marginRight: { xs: "0px", sm: "20px" },
              }}
            />
            <Stack
              flexDirection="column"
              flexGrow={1}
              justifyContent="center"
              mt={2}
            >
              <Skeleton
                height="30px"
                sx={{
                  width: { xs: "100%", sm: "80%", md: "50%" },
                  marginBottom: "5px",
                }}
              />
              <Skeleton
                height="30px"
                sx={{
                  width: { xs: "100%", sm: "80%", md: "50%" },
                  marginBottom: "5px",
                }}
              />
              <Skeleton
                height="30px"
                sx={{
                  width: { xs: "100%", sm: "80%", md: "50%" },
                  marginBottom: "5px",
                }}
              />
              <Skeleton
                height="30px"
                sx={{
                  width: { xs: "100%", sm: "80%", md: "50%" },
                  marginBottom: "5px",
                }}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
      {restaurantInfo.food_items && restaurantInfo.food_items.length > 0 ? (
        <Grid container spacing={6} p={4} mb={2}>
          {restaurantInfo.food_items.map((item: RestaurantsType) => (
            <Dish key={item.id} item={item} />
          ))}
        </Grid>
      ) : (
        <Grid container p={4} spacing={4}>
          {arr.map((i, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton
                variant="rectangular"
                height={140}
                sx={{ marginBottom: "15px" }}
              />
              <Skeleton
                variant="rectangular"
                width="70%"
                sx={{ marginBottom: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width="70%"
                sx={{ marginBottom: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width="70%"
                sx={{ marginBottom: "10px" }}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Footer />
    </>
  );
};

export default RestaurantInfo;
