import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DvrIcon from '@mui/icons-material/Dvr';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
// import authImage from "../images/authImage.jpg"
import authImage from "../../images/authImage.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutAction } from "../../Actions/userActions";
import { useEffect } from "react";
import  { useState } from 'react';

const SidebarContent = ({ onClose, ...rest }) => {
  const LinkItems = [
    { name: "DashBoard", icon: FiHome, link: "/home" },
    { name: "Inventory", icon: InventoryIcon, link: "/inventory-page" },
    { name: "Orders", icon: ShoppingCartIcon, link: "/orders-page" },
    { name: "Users", icon: PeopleAltIcon, link: "/user-management-page" },
    { name: "Requisition", icon: InsertDriveFileIcon, link: "/requisiton-page" },
    { name: "Inward", icon: InsertInvitationIcon, link: "/inward-page" },
    { name: "Archive", icon: RestoreFromTrashIcon, link: "/archive-page" },
    { name: "Order Generation", icon: AddTaskIcon, link: "/OrderGeneration-page" },
    { name: "Contract Order", icon: DvrIcon, link: "/Contract-Order-page" },
    { name: "Vendor Master-Form ", icon: HowToRegIcon, link: "/Vendor-Master-Form" },
  ];
  
  const [isArchiveDropdownOpen, setArchiveDropdownOpen] = useState(false);
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isOrderGenerationOpen, setOrderGenerationOpen] = useState(false);

  const toggleArchiveDropdown = () => {
    setArchiveDropdownOpen(!isArchiveDropdownOpen);
  };

  const toggleOrdersDropdown = () => {
    setOrdersDropdownOpen(!isOrdersDropdownOpen);
  };

  const toggleOrderGenerationDropdown = () => {
    setOrderGenerationOpen(!isOrderGenerationOpen)
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY={"auto"}
      className="hide-scrollbar"
      {...rest}
    >
      <div className='p-2'>
        <div className="flex flex-row items-center ">
          <div className="p-2 justify-center">
            {" "}
            <img className=" w-8 h-6" src={authImage} />
          </div>{" "}
          <div className="items-center  ">
            <span className='text-lg items-center font-bold'>Inventory MG</span>
          </div>
        </div>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </div>

      {LinkItems.map((link) => (
        <div key={link.link}>
          {link.name === 'Archive' ? (
            <div>
              <NavItem
                icon={link.icon}
                className="text-[#667085] hover:text-white"
                onClick={toggleArchiveDropdown}
              >
                <p className='w-full h-full font-bold'>{link.name}</p>
              </NavItem>
              {isArchiveDropdownOpen && (
                <div className="pl-1  flex flex-col ml-2">
                  <Link to="/order-archive-page">
                    <div className='p-2 ml-2 my-1 w-3/4 rounded-lg hover:bg-[#5C59E8] text-sm h-full font-bold text-[#667085] hover:text-white '>
                      <ArrowRightAltIcon /> Orders Archive
                    </div>
                  </Link>
                  <Link to="/inward-archive-page">
                    <div className='p-2 my-1 ml-2 rounded-lg hover:bg-[#5C59E8] text-sm w-3/4 h-full font-bold text-[#667085] hover:text-white '>
                      <ArrowRightAltIcon /> Inward Archive
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : link.name === 'Orders' ? (
            <div>
              <NavItem
                icon={link.icon}
                className="text-[#667085] hover:text-white"
                onClick={toggleOrdersDropdown}
              >
                <p className='w-full h-full font-bold'>{link.name}</p>
              </NavItem>
              {isOrdersDropdownOpen && (
                <div className="pl-1  flex flex-col ml-2">
                 <Link to="/orders-page">
                  <div className='p-2 ml-2 my-1 w-3/4 rounded-lg hover:bg-[#5C59E8] text-sm h-full font-bold text-[#667085] hover:text-white '>
                      <ArrowRightAltIcon /> All Orders
                    </div>
                  </Link>
                  <Link to="/approved-orders-page">
                  <div className='p-2 ml-2 my-1 w-3/4 rounded-lg hover:bg-[#5C59E8] text-sm h-full font-bold text-[#667085] hover:text-white '>
                      <ArrowRightAltIcon /> Approved Orders
                    </div>
                  </Link>
                  <Link to="/rejected-orders-page">
                  <div className='p-2 ml-2 my-1 w-3/4 rounded-lg hover:bg-[#5C59E8] text-sm h-full font-bold text-[#667085] hover:text-white '>
                      <ArrowRightAltIcon /> Rejected Orders
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : link.name === 'Order Generation' ? (
            <div>
              <NavItem
                icon={link.icon}
                className="text-[#667085] hover:text-white"
                onClick={toggleOrderGenerationDropdown}
              >
                <p className='w-full h-full font-bold'>{link.name}</p>
              </NavItem>
              {isOrderGenerationOpen && (
                <div className="pl-1  flex flex-col ml-2">
                 <Link to="/Purchase-Order-page">
                  <div className='p-2 ml-2 my-1 w-3/4 rounded-lg hover:bg-[#5C59E8] text-sm h-full font-bold text-[#667085] hover:text-white '>
                      <ArrowRightAltIcon /> Purchase Order
                    </div>
                  </Link>
                  <Link to="/Work-Order-page">
                  <div className='p-2 ml-2 my-1 w-3/4 rounded-lg hover:bg-[#5C59E8] text-sm h-full font-bold text-[#667085] hover:text-white '>
                      <ArrowRightAltIcon /> Work Order
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to={link.link}>
              <NavItem icon={link.icon} className="text-[#667085] hover:text-white">
                <p className='w-full h-full font-bold'>{link.name}</p>
              </NavItem>
            </Link>
          )}
        </div>
      ))}
    </Box>
  );
};

const NavItem = ({ icon: IconComponent, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="3"
        mx="4"
        px="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#5C59E8",
          color: "white",
        
        }}
        {...rest}
        
      >
        {IconComponent && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={IconComponent}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = async () => {
    await dispatch(logoutAction());
  };
  useEffect(() => {
    if (user === null) {
      navigate("/");
      alert.success("Logged Out");
    }
  }, [navigate, user, alert]);
  return (
    <Flex
     className=""
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={""} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.user_level}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Add User</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Sidebar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4"  className="bg-[#F9F9FC] min-h-screen">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
