import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  HStack,
  Flex,
  Menu,
  Link as A,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Center,
  MenuDivider,
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  VStack,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import LogoutButton from "../logoutButton.component";
import { useAuth } from "../../hooks/useAuth";
import logoImage from "../../assets/images/logo2.png";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const headerItems = [
    { label: "Choose us", path: "#chooseUs" },
    { label: "How To Rent", path: "#howToRent" },
    { label: "We Offer", path: "#weOffer" },
    { label: "Clients", path: "#clients" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-md"
      style={{
        background:
          "linear-gradient(90deg, rgba(72,187,120,0.8) 0%, rgba(134,239,172,0.8) 100%)",
      }}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        py={3}
        px={{ base: 4, md: 12 }}
      >
        {/* Logo */}
        <Link to="/">
          <img src={logoImage} className="sm:w-24 w-12 max-w-none" />
        </Link>

        {/* Desktop Navigation */}
        <HStack as="nav" spacing="8" display={{ base: "none", md: "flex" }}>
          <Link to="/">
            <Button
              paddingStart={0}
              paddingEnd={0}
              className="group hover:text-white focus:text-white"
              variant="nav"
              color="white"
              _hover={{ bg: "green.600", transition: "all 0.3s ease-in-out" }}
              pos="relative"
            >
              Home
            </Button>
          </Link>

          {headerItems.map((item, i) => (
            <A key={i} href={window.location.origin + "/" + item.path}>
              <Button
                paddingStart={0}
                paddingEnd={0}
                className="group hover:text-white focus:text-white"
                variant="nav"
                color="white"
                _hover={{ bg: "green.600", transition: "all 0.3s ease-in-out" }}
                pos="relative"
              >
                {item.label}
              </Button>
            </A>
          ))}

       
        </HStack>

        {/* Auth / Avatar */}
        <div>
          {!user?.id ? (
            <Flex>
              <Link to="/login">
                <Button
                  colorScheme="green"
                  color="white"
                  variant={location.pathname === "/login" ? "solid" : "outline"}
                  size={{ base: "sm", md: "md" }}
                  _hover={{ bg: "green.600" }}
                >
                  Signin
                </Button>
              </Link>
              <Link to="/signup" className="ml-3">
                <Button
                  colorScheme="green"
                  color="white"
                  variant={location.pathname === "/signup" ? "solid" : "outline"}
                  size={{ base: "sm", md: "md" }}
                  _hover={{ bg: "green.600" }}
                >
                  Signup
                </Button>
              </Link>
            </Flex>
          ) : (
            <Flex alignItems="center">
              <Menu>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                  <Avatar size="lg" src={user?.image} />
                </MenuButton>
                <MenuList zIndex={99}>
                  <Center>
                    <Avatar size="2xl" src={user?.image} />
                  </Center>
                  <Center>
                    <Text color="green.600" fontWeight={500} fontSize={18} className="my-1 capitalize">
                      {user?.name}
                    </Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem justifyContent="center" _hover={{ bg: "none" }} _focus={{ bg: "none" }} px="14px">
                    <Link to="/profile" className="w-full rounded-md hover:bg-green-50 focus:bg-green-50 text-center py-2">
                      <Text fontWeight={500} fontSize={16}>Profile</Text>
                    </Link>
                  </MenuItem>
                  <MenuItem justifyContent="center" _hover={{ bg: "none" }} _focus={{ bg: "none" }} px="14px">
                    <Link to="/setting-profile/information" className="w-full rounded-md hover:bg-green-50 focus:bg-green-50 text-center py-2">
                      <Text fontWeight={500} fontSize={16}>Settings</Text>
                    </Link>
                  </MenuItem>
                  <MenuItem _hover={{ bg: "none" }} _focus={{ bg: "none" }} color="red.400" borderRadius="8px" px="14px">
                    <LogoutButton>
                      <TbLogout className="mr-2 text-red-500" />
                      <Text color="red.400">Logout</Text>
                    </LogoutButton>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </div>

        {/* Mobile Drawer */}
        <IconButton
          size="sm"
          aria-label="Toggle navigation"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onOpen}
          display={{ base: "block", md: "none" }}
        />
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <VStack as="nav" spacing="8">
                <Link to="/">
                  <Button
                    paddingStart={0}
                    paddingEnd={0}
                    className="group hover:text-white focus:text-white"
                    color="white"
                    variant="nav"
                    _hover={{ bg: "green.600", transition: "all 0.3s ease-in-out" }}
                    pos="relative"
                    onClick={onClose}
                  >
                    Home
                  </Button>
                </Link>
                {headerItems.map((item, i) => (
                  <A key={i} href={item.path} onClick={onClose}>
                    <Button
                      paddingStart={0}
                      paddingEnd={0}
                      className="group hover:text-white focus:text-white"
                      color="white"
                      variant="nav"
                      _hover={{ bg: "green.600", transition: "all 0.3s ease-in-out" }}
                      pos="relative"
                    >
                      {item.label}
                    </Button>
                  </A>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </header>
  );
};

export default Header;