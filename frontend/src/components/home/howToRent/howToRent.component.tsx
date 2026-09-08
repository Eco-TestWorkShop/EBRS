import { Center, Flex, Heading, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Reveal } from "../../motion/reveal.component";
import {
  FaMagnifyingGlassLocation,
  FaMapLocationDot,
  FaRoute,
} from "react-icons/fa6";
import { MdOutlineElectricBike } from "react-icons/md";
import CardSteps from "./cardSteps.component";
import { motion } from "framer-motion";

const HowToRent: React.FC = () => {
  const dataSteps = [
    {
      icon: FaMagnifyingGlassLocation,
      title: "Location",
      text: "Pick the location and the date.",
      after: true,
      delay: 0.5,
      id: 1,
    },
    {
      icon: MdOutlineElectricBike,
      title: "Choose A Bike",
      text: "Select the bike you like.",
      after: true,
      delay: 1.0,
      id: 2,
    },
    {
      icon: FaRoute,
      title: "Enjoy Your Ride",
      text: "Explore new sights and places with comfort.",
      after: true,
      delay: 1.5,
      id: 3,
    },
    {
      icon: FaMapLocationDot,
      title: "Return The Bike",
      text: "Leave the bike at one of our parks.",
      after: false,
      delay: 2,
      id: 4,
    },
  ];

  return (
    <Flex
      id="howToRent"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={8}
      py={"50px"}
      minHeight={"90vh"}
      className="relative overflow-hidden"
    >
      {/*   Big Background Circles */}
      <Box
        className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-green-200 rounded-full opacity-30 animate-pulse-slow -z-10"
      />
      <Box
        className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] bg-teal-200 rounded-full opacity-25 animate-pulse-slow -z-10"
      />
      <Box
        className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-orange-200 rounded-full opacity-20 animate-pulse-slow -z-10"
      />

      {/*   Geometric Shapes */}
      <motion.div
        className="absolute w-28 h-28 bg-green-300 rotate-45 rounded-lg opacity-40 top-[20%] left-[40%] -z-10"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute w-36 h-20 bg-teal-300 skew-y-12 rounded-lg opacity-30 top-[60%] right-[20%] -z-10"
        animate={{ x: [0, 40, -40, 0] }}
        transition={{ repeat: Infinity, duration: 40, ease: "easeInOut" }}
      />

      {/*   Tree Shapes */}
      <motion.div
        className="absolute w-20 h-36 bg-green-500 rounded-tl-full rounded-tr-full bottom-[10%] left-[25%] -z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-44 bg-green-600 rounded-tl-full rounded-tr-full bottom-[5%] right-[15%] -z-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/*   Animated Floating Leaves */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-green-400 rounded-full -z-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/*   Section Headings */}
      <Center flexDirection="column" gap={4}>
        <Reveal>
          <Heading
            as="h3"
            size={{ base: "sm", md: "2xl" }}
            className="capitalize text-center text-green-800"
          >
            How to rent
          </Heading>
        </Reveal>
        <Reveal>
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            className="py-4 text-center text-orange-500"
          >
            Simple & Easy Steps
          </Heading>
        </Reveal>
        <Reveal>
          <Text
            className="font-medium text-gray-700 text-center"
            fontSize={{ base: "xs", md: "md" }}
          >
            Choose Location, Bike & Enjoy Your Ride
          </Text>
        </Reveal>
        <Reveal>
          <Text
            className="text-md font-medium text-gray-700 text-center"
            fontSize={{ base: "xs", md: "md" }}
          >
            When you finish, return the bike to one of our parking stations.
          </Text>
        </Reveal>
      </Center>

      {/*   Steps Cards */}
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap={6}
        justifyContent="space-between"
      >
        {dataSteps.map(({ icon, title, text, id, after, delay }) => (
          <CardSteps
            key={id}
            Icon={icon}
            title={title}
            text={text}
            after={after}
            delay={delay}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default HowToRent;