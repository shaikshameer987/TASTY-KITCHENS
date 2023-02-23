import { useState, useEffect, useCallback } from "react";
import { Box, Stack } from "@mui/material";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images: string[] = [
    "https://res.cloudinary.com/dquxo9syn/image/upload/v1674751519/Tasty%20Kitchens/tacos_c7zysf.jpg",
    "https://res.cloudinary.com/dquxo9syn/image/upload/v1674751519/Tasty%20Kitchens/sushi_eoqm9y.jpg",
    "https://res.cloudinary.com/dquxo9syn/image/upload/v1674751519/Tasty%20Kitchens/pizza_ilzqiq.jpg",
  ];

  const goToNextSlide: () => void = useCallback(() => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, images.length]);

  useEffect(() => {
    let slide = setInterval(function () {
      goToNextSlide();
    }, 3500);

    return () => {
      clearInterval(slide);
    };
  }, [goToNextSlide]);

  return (
    <Box padding={"0px  30px"}>
      <Stack flexDirection={"row"} overflow="hidden" borderRadius="20px">
        {images.map((image, index) => (
          <Stack width={"100%"} flexShrink={0} key={index}>
            <img
              src={image}
              alt=""
              className="carousal-image banners"
              key={index}
              style={{
                width: "100%",
                transform: `translateX(calc(-${currentIndex}* 100%))`,
                transition: "transform 900ms ",
                borderRadius: "20px",
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Carousel;
