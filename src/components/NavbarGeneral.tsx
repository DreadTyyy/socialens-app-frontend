import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavbarGeneral = () => {
  return (
    <Box
        display="flex"
        px="20px"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        position="relative"
        h="70px"
        zIndex={1}
    >
        {/* Logo */}
        <Box></Box>
        {/* List */}
        <Flex
            gap="16px"
        >
            <Text
                _hover={{ 
                    color: "primary.950",
                 }}
            >
                <Link to="/">Beranda</Link>
            </Text>
            <Text
                _hover={{ 
                    color: "primary.950",
                 }}
            >
                <Link to="#coba">Coba Aplikasi</Link>
            </Text>
        </Flex>
        {/* ActionButton */}
        <Flex>
            <Button size="md" bgColor="primary.950" _hover={{ bgColor: "primary.500" }}>
                <Link to="/login">Login</Link>
            </Button>
        </Flex>
    </Box>
  )
}

export default NavbarGeneral;