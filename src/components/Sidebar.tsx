import { Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { MdOutlineAnalytics } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { GoSidebarCollapse } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { useState } from "react";
import { putAccessToken } from "../utils/api";

const ButtonSide = (
    {Icon, title, status}
    :{Icon: IconType; title: string; status: "root" | "active";}) => {
    const variants = {
        root: {
            bgColor: "transparent",
            color: "dark.950",
            bgHover: "dark.100",
            colorHover: "dark.950"
        },
        active: {
            bgColor: "primary.950",
            color: "white",
            bgHover: "primary.500",
            colorHover: "white"
        },
    } as const;
    const currentVariant = variants[status];

    return (
        <Flex
            maxH="64px"
            px="10px"
            py="10px"
            w="100%"
            overflow="hidden"
            gap="20px"
            alignItems="center"
            bgColor={currentVariant.bgColor}
            color={currentVariant.color}
            borderRadius="16px"
            transition="all 0.2s ease-in"
            cursor="pointer"
            _hover={{ 
                bgColor: currentVariant.bgHover,
                color: currentVariant.colorHover
            }}
        >
            <Text fontSize="28px">
                <Icon />
            </Text>
            <Text fontWeight="medium" textWrap="nowrap">
                {title}
            </Text>
        </Flex>
    )
}

const Sidebar = ({active}: {active: string;}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleLogoutUser = () => {
        putAccessToken("");
        return window.location.pathname = "/"
    }

    return (
        <Box
          position="relative"
          width={isOpen ? "240px": "80px"}
          maxW="240px"
          minW={isOpen ? "240px": "80px"}
        >
          <Flex 
              bgColor="white"
              flexDir="column" 
              justifyContent="space-between"   
              position="fixed" 
              w={isOpen ? "240px": "80px"}
              py="16px"
              px="16px"
              borderRight="1px solid"
              borderColor="dark.300"
              h="100vh"
            >
            <Flex flexDir="column" gap="8px" w="100%" pt="70px">
                <Text
                  as="button"
                  onClick={() => setIsOpen(!isOpen)}
                  p="0"
                  bgColor="transparent"
                >   
                    <ButtonSide status="root" title="Collapse" Icon={GoSidebarCollapse} />
                </Text>
                <Link to="/dashboard">
                    <ButtonSide 
                        status={active === "dashboard" ? "active" : "root"} Icon={RxDashboard} title="Dashboard"/>
                </Link>
                <Link to="/dashboard/analytics">
                    <ButtonSide 
                        status={active === "analytics" ? "active" : "root"} Icon={MdOutlineAnalytics} title="Analytics"/>
                </Link>
            </Flex>
            <Flex flexDir="column" gap="8px" w="100%">
                <Box opacity={0.5} pointerEvents="none">
                    <ButtonSide status="root" Icon={CiSettings} title="Account Settings"/>
                </Box>
                <Text onClick={handleLogoutUser}>
                    <ButtonSide status="root" title="Logout" Icon={MdOutlineLogout} />
                </Text>
            </Flex>
          </Flex>
        </Box>
    )
}

export default Sidebar;