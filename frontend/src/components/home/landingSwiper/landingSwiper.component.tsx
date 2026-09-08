import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CardSlider from "./cardSlider.component";
import bannerImage0 from "../../../assets/images/landing/banner0.png";
import bannerImage1 from "../../../assets/images/landing/bannerBike.jpg";
import bannerImage2 from "../../../assets/images/landing/banner1.jpg";
import bannerImage3 from "../../../assets/images/landing/banner2.jpg";
import bannerImage4 from "../../../assets/images/landing/4.png";
import bannerImage5 from "../../../assets/images/landing/5.png";
import bannerImage6 from "../../../assets/images/landing/6.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LandingSwiper = () => {
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    // Dynamically set slides with CO2 info
    const data = [
      {
        id: 0,
        img: bannerImage0,
        title: "Explore the City, One Ride at a Time",
        sousTitle: "Starting from 2$ per hour",
        text1: "Discover hidden gems and scenic routes",
        text2: "As you pedal through the heart of the city.",
        co2Saved: 1.5,
      },
      {
        id: 1,
        img: bannerImage1,
        title: "Explore the City, One Ride at a Time",
        sousTitle: "Starting from 2$ per hour",
        text1: "Discover hidden gems and scenic routes",
        text2: "As you pedal through the heart of the city.",
        co2Saved: 1.5,
      },
      {
        id: 2,
        img: bannerImage2,
        title: "Feel the Wind, Embrace the Ride",
        sousTitle: "Starting from 15$ per day",
        text1: "Experience the thrill of riding with our",
        text2: "Premium bikes designed for speed and comfort.",
        co2Saved: 3.8,
      },
      {
        id: 3,
        img: bannerImage3,
        title: "Unlock the Joy of Riding",
        sousTitle: "Starting from 50$ per month",
        text1: "Elevate your mood and boost your energy",
        text2: "With every ride on our joyful bicycles.",
        co2Saved: 12.2,
      },
      {
        id: 4,
        img: bannerImage4,
        title: "Unlock the Joy of Riding",
        sousTitle: "Starting from 50$ per month",
        text1: "Elevate your mood and boost your energy",
        text2: "With every ride on our joyful bicycles.",
        co2Saved: 12.2,
      },{
        id: 5,
        img: bannerImage5,
        title: "Unlock the Joy of Riding",
        sousTitle: "Starting from 50$ per month",
        text1: "Elevate your mood and boost your energy",
        text2: "With every ride on our joyful bicycles.",
        co2Saved: 12.2,
      },{
        id: 6,
        img: bannerImage6,
        title: "Unlock the Joy of Riding",
        sousTitle: "Starting from 50$ per month",
        text1: "Elevate your mood and boost your energy",
        text2: "With every ride on our joyful bicycles.",
        co2Saved: 12.2,
      }
    ];
    setSlides(data);
  }, []);

  return (
    <Box height="80vh" position="relative">
      <Swiper
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        direction="vertical"
        slidesPerView={1}
        spaceBetween={30}
        modules={[Autoplay]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) =>
              isActive && (
                <Box position="relative" w="full" h="full">
                  {/* Main CardSlider */}
                  <CardSlider
                    img={slide.img}
                    title={slide.title}
                    sousTitle={slide.sousTitle}
                    text1={slide.text1}
                    text2={slide.text2}
                  />

                  {/* CO2 feature unique per slide */}
                  <Flex
                    position="absolute"
                    bottom="6"
                    right="6"
                    bg="green.500"
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="xl"
                    fontWeight="bold"
                    alignItems="center"
                    gap={2}
                    boxShadow="md"
                    zIndex={20}
                  >
                    🌍 {slide.co2Saved} kg CO₂ saved
                  </Flex>
                </Box>
              )
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LandingSwiper;