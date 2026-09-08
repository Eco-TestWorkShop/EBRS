import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { IoTimeOutline } from "react-icons/io5";
import { CiWallet } from "react-icons/ci";
import { MdDirectionsBike } from "react-icons/md";
import { Reveal } from "../../motion/reveal.component";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

import BikeImage from "../../../assets/images/bikes/bikeChoose.jpg";

type CardChooseProps = {
  id: number;
  title: string;
  description: string;
  Icon: IconType;
};

const CardChoose = ({ id, title, description, Icon }: CardChooseProps) => {
  return (
    <Box
      key={id}
      className="group flex items-center justify-center bg-white rounded-lg px-8 py-4 gap-4 transition-all duration-300 ease-in-out cursor-pointer"
      width={{ base: "80%", md: "400px" }}
      height={{ base: "auto", md: "150px" }}
      shadow={
        "0px 0px 25px -5px rgba(0, 0, 0, 0.1), 0px 7px 10px -5px rgba(0, 0, 0, 0.04)"
      }
      _hover={{
        color: "white",
        bg: "teal.400",
        shadow: "2xl",
        transform: "scale(1.05)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Box
        className="flex items-center justify-center rounded-full bg-teal-200 p-3"
        _groupHover={{ bg: "teal.300", transition: "all 0.3s ease-in-out" }}
      >
        <Icon className="text-teal-500 sm:text-3xl text-xl group-hover:text-white" />
      </Box>
      <Box className="flex flex-col items-start justify-center gap-2">
        <Reveal>
          <Heading
            as="h2"
            size={{ base: "14px", md: "18px" }}
            className="capitalize"
          >
            {title}
          </Heading>
        </Reveal>
        <Reveal>
          <Text
            className="text-gray-500 sm:text-sm text-xs font-normal"
            _groupHover={{ color: "white", transition: "all 0.3s ease-in-out" }}
          >
            {description}
          </Text>
        </Reveal>
      </Box>
    </Box>
  );
};

const WhyChoose = () => {
  const data = [
    {
      id: 1,
      title: "Community Vibes",
      description:
        "When you choose EcoWheel, you join a community of like-minded cyclists. Share your favorite routes, discover new ones, and be part of a movement that celebrates the joy of biking.",
      icon: IoTimeOutline,
    },
    {
      id: 2,
      title: "Pay as You Ride",
      description:
        "No need to commit to long-term contracts. With EcoWheel, you pay for the ride when you need it. Tailor your biking experience to your schedule and your wallet.",
      icon: CiWallet,
    },
    {
      id: 3,
      title: "Easy Rentals",
      description:
        "With the EcoWheel app, renting a bike is as easy as a few taps. Find your ride, unlock, and roll out. We've streamlined the process so you can focus on the joy of riding.",
      icon: MdDirectionsBike,
    },
  ];

  return (
    <Box
      id="chooseUs"
      className="relative flex flex-col justify-center items-center gap-12 my-5 py-5 overflow-hidden"
    >
      {/*   Background Geometrics */}
      <Box
        className="absolute w-2/5 h-full top-1 right-12 bg-teal-100 -z-10 opacity-25"
        clipPath={"polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)"}
      />
      <motion.div
        className="absolute w-28 h-28 bg-green-300 rotate-45 rounded-lg opacity-30 top-[10%] left-[15%] -z-10"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
      />
      <motion.div
        className="absolute w-36 h-20 bg-teal-300 skew-y-12 rounded-lg opacity-25 top-[60%] right-[5%] -z-10"
        animate={{ x: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 35, ease: "easeInOut" }}
      />

      {/*   Animated Floating Leaves */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-green-400 rounded-full -z-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      <Reveal>
        <Heading
          as="h2"
          size={{ base: "sm", md: "xl" }}
          className="mb-3 capitalize text-center"
          mt={100}
        >
          why choose EcoWheel 🚴‍♂️✨
        </Heading>
      </Reveal>
      <Reveal>
        <Text className="text-gray-500 sm:text-base text-sm font-medium mb-2" maxWidth="600px">
          🚲 Dive into urban adventures on stylish, eco-friendly bikes.
        </Text>
        <Text className="text-gray-500 sm:text-base text-sm font-medium mb-2" maxWidth="600px">
          ⚙️ Easy Rentals: Swift and smart with our user-friendly app.
        </Text>
        <Text className="text-gray-500 sm:text-base text-sm font-medium mb-2" maxWidth="600px">
          🌍 Eco-Friendly: Ride green, reduce your carbon footprint.
        </Text>
        <Text className="text-gray-500 sm:text-base text-sm font-medium mb-2" maxWidth="600px">
          🤝 Community Vibes: Join a cyclist family!
        </Text>
        <Text className="text-gray-500 sm:text-base text-sm font-medium" maxWidth="600px">
          Choose EcoWheel – Where Every Ride is an Adventure!🚴‍♀️
        </Text>
      </Reveal>

      <Box className="w-full flex md:flex-row flex-col justify-evenly gap-5">
        <Box className="flex-1 text-center">
          <Image
            src={BikeImage}
            mx={"auto"}
            width={{ base: "80%", md: "100%" }}
            mt={10}
          />
        </Box>
        <Box className="flex flex-1 flex-col gap-4 md:justify-start items-center">
          {data.map((item) => (
            <CardChoose
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              Icon={item.icon}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WhyChoose;