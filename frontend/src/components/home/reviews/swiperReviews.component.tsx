import { useRef, useState } from "react";
import { Heading, Box, Center, Text, Flex } from "@chakra-ui/react";
import { Reveal } from "../../motion/reveal.component";
import CardReview from "./cardReview.component";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import { Swiper as SwiperCore } from "swiper/types";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const SwiperReviews = () => {
  const swiperRef = useRef<SwiperCore>();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "— Sarah Smith, Commuter Extraordinaire",
      tag: "@sarahsmith",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
      review:
        "EcoWheel has redefined my biking experience! The bikes are gateways to adventure. The seamless rental process keeps me coming back. EcoWheel, you've turned my daily commute into a joyride!",
    },
    {
      id: 2,
      name: "— Michael Johnson, Cycling Enthusiast",
      tag: "@michaeljohnson",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3",
      review:
        "EcoWheel stands out for its commitment to excellence. The bikes are well-maintained, and the customer service is unmatched. Whether weekend or daily ride, EcoWheel is my go-to choice.",
    },
    {
      id: 3,
      name: "— Alex Turner, Adventure Seeker",
      tag: "@alexturner",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      review:
        "Finding EcoWheel was a game-changer. Variety of bikes for all preferences and ease of renting makes spontaneous rides a breeze. Thank you, EcoWheel!",
    },
    {
      id: 4,
      name: "— Meriem, Fitness Enthusiast",
      tag: "@meriem",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      review:
        "EcoWheel has nailed convenience and quality. Renting a bike has never been this easy, and the bikes are top-notch. Kudos to EcoWheel for a hassle-free experience!",
    },
  ];

  return (
    <Flex
      id="clients"
      minHeight={"70vh"}
      className="relative flex-col md:flex-row items-center justify-center gap-4 overflow-hidden"
    >
      {/*   Big Background Circles */}
      <Box className="absolute w-[700px] h-[700px] top-[-20%] left-[-15%] bg-green-200 rounded-full opacity-30 animate-pulse-slow -z-10" />
      <Box className="absolute w-[500px] h-[500px] top-[40%] right-[-15%] bg-teal-200 rounded-full opacity-25 animate-pulse-slow -z-10" />
      
      {/*   Geometric & leaf shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-green-500 rounded-full -z-10"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{ y: [0, -15, 0], x: [0, 10, -10, 0], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 4 + Math.random() * 3, ease: "easeInOut" }}
        />
      ))}

      <Center
        flexDirection={"column"}
        gap={4}
        zIndex={99}
        className="mt-20 md:mt-40"
      >
        <Reveal>
          <Heading as="h2" size={{ base: "md", md: "lg" }} className="text-green-800 text-center">
            What Our Clients Say
          </Heading>
        </Reveal>
        <Reveal>
          <Text className="text-gray-600 text-center sm:text-lg text-sm font-medium">
            Discovering the Joy of Riding with EcoWheel
          </Text>
        </Reveal>
        <Flex gap={4} justifyContent="center" mt={2}>
          <HiArrowLeft
            size={28}
            className={`cursor-pointer transform hover:scale-125 transition-transform ${
              activeSlideIndex === 0 ? "text-gray-400" : "text-green-500"
            }`}
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <HiArrowRight
            size={28}
            className={`cursor-pointer transform hover:scale-125 transition-transform ${
              activeSlideIndex === reviews.length - 1 ? "text-gray-400" : "text-green-500"
            }`}
            onClick={() => swiperRef.current?.slideNext()}
          />
        </Flex>
      </Center>

      {/* Swiper */}
      <Box className="w-11/12 sm:w-2/3 mt-12 md:mt-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => <CardReview review={review} isActive={isActive} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

export default SwiperReviews;