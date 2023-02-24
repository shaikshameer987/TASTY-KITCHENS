import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Divider,
  Grid,
  Link,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

export interface RestaurantsType {
  [key: string]: any;
}

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantsType[]>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const cookie = Cookies.get("accessToken");
  const arr = new Array(12).fill(null);

  useEffect(() => {
    if (cookie) {
      fetch(
        `https://apis.ccbp.in/restaurants-list?offset=${
          (page - 1) * 12
        }&limit=${12}&sort_by_rating=${"HIGH"}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setTotal(res.total);
          if (sortValue === "sort by highest") {
            setRestaurants(
              res.restaurants.sort(
                (a: RestaurantsType, b: RestaurantsType) =>
                  b.user_rating.rating - a.user_rating.rating
              )
            );
          } else if (sortValue === "sort by lowest") {
            setRestaurants(
              res.restaurants.sort(
                (a: RestaurantsType, b: RestaurantsType) =>
                  a.user_rating.rating - b.user_rating.rating
              )
            );
          } else {
            setRestaurants(res.restaurants);
          }
        })
        .catch((error) => console.log(error.message));
    }
  }, [cookie, page, sortValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSortValue(e.target.value);
    if (e.target.value === "sort by highest") {
      setRestaurants((res) =>
        res.sort(
          (a: RestaurantsType, b: RestaurantsType) =>
            b.user_rating.rating - a.user_rating.rating
        )
      );
    } else {
      setRestaurants((res) =>
        res.sort(
          (a: RestaurantsType, b: RestaurantsType) =>
            a.user_rating.rating - b.user_rating.rating
        )
      );
    }
  }, []);

  return (
    <Box marginBottom={3}>
      <Box padding={3}>
        <Typography variant="h4" ml={1} gutterBottom>
          Popular Restaurants
        </Typography>
        <Stack
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Typography
            variant="body1"
            ml={1}
            mr={{ xs: 0, sm: 3 }}
            mb={{ xs: 3, sm: 0 }}
          >
            Select Your favourite restaurant special dish and make your day
            happy...
          </Typography>
          <TextField
            size="small"
            sx={{ width: "160px", flexShrink: 0 }}
            label="Sort by Rating"
            select
            value={sortValue}
            onChange={handleChange}
          >
            <MenuItem value="sort by highest">Sort by Highest</MenuItem>
            <MenuItem value="sort by lowest">Sort by Lowest</MenuItem>
          </TextField>
        </Stack>
      </Box>
      <Divider variant="middle" sx={{ borderColor: `rgba(0,0,0,0.5)` }} />
      <Grid container spacing={3} p={4}>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={3} key={restaurant.id}>
              <Link href={"/restaurants/" + restaurant.id} underline="none">
                <Card>
                  <CardMedia
                    component="img"
                    height="150px"
                    width="50%"
                    image={restaurant.image_url}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {restaurant.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {restaurant.menu_type}
                    </Typography>
                    <Typography variant="body1">
                      {restaurant.user_rating.rating} &#9733;
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Grid container p={4} spacing={4}>
            {arr.map((i, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
      </Grid>
      <Stack flexDirection="row" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="previous page"
          disabled={page === 1 ? true : false}
          onClick={() => {
            if (page === 1) return;
            setRestaurants([]);
            setPage(page - 1);
          }}
        >
          <ArrowBackIosNewIcon fontSize="large" sx={{ marginRight: "15px" }} />
        </IconButton>
        <Typography variant="h6">
          {page} of {Math.ceil(total / 12)}
        </Typography>
        <IconButton
          aria-label="previous page"
          disabled={page >= Math.ceil(total / 12) ? true : false}
          onClick={() => {
            if (page >= Math.ceil(total / 12)) return;
            setRestaurants([]);
            setPage(page + 1);
          }}
        >
          <ArrowForwardIosIcon fontSize="large" sx={{ marginLeft: "15px" }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Restaurants;
