import { Box, Flex, Button, Link } from "@chakra-ui/react";

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
            <Link
              href="/"
              _hover={{ 
                textDecoration: "none",
                color: "primary.950",
              }}
              _focus={{ 
                outline: "none"
               }}
               >
              Beranda
            </Link>
            <Link
              href="#coba"
              _hover={{ 
                textDecoration: "none",
                color: "primary.950",
                }}
              _focus={{ 
                outline: "none"
              }}
            >
              Coba Aplikasi
            </Link>
        </Flex>
        {/* ActionButton */}
        <Flex>
            <Button size="md" bgColor="primary.950" _hover={{ bgColor: "primary.500" }}>
              <Link
                href="/login"
                color="white"
                _hover={{ 
                    color: "none",
                    textDecoration: "none",
                    }}
                _focus={{ 
                    outline: "none"
                }}
              >
                Login
              </Link>
            </Button>
        </Flex>
    </Box>
  )
}

export default NavbarGeneral;