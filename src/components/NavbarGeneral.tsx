import { Box, Flex, Button, Link } from "@chakra-ui/react";

const NavbarGeneral = () => {
  return (
    <Box
        display="flex"
        px={{ base: '5%', md: '80px' }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        position="absolute"
        h="80px"
        zIndex={1}
    >
        {/* Logo */}
        <Box>
          <Link 
            href="/" 
            color="primary.950" 
            fontWeight="700" 
            fontSize="26px" 
            _hover={{ textDecoration: "none" }} 
            _focus={{ outline: "none" }}
          >
            SociaLens
          </Link>
        </Box>
        {/* List */}
        <Flex
            gap="24px"
        >
            <Link
              href="#"
              fontWeight={500}
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
              href="/login"
              fontWeight={500}
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
        <Flex gap="16px">
            <Button size="md" variant="ghost" borderRadius="12px" _hover={{ bgColor: "transparent" }}>
              <Link
                href="/login"
                color="dark.950"
                _hover={{ 
                    color: "dark.700",
                    textDecoration: "none",
                    }}
                _focus={{ 
                    outline: "none"
                }}
              >
                Sign in
              </Link>
            </Button>
            <Button size="md" bgColor="primary.950" borderRadius="12px" _hover={{ bgColor: "primary.500" }}>
              <Link
                href="/register"
                color="white"
                _hover={{ 
                    color: "none",
                    textDecoration: "none",
                    }}
                _focus={{ 
                    outline: "none"
                }}
              >
                Sign up
              </Link>
            </Button>
        </Flex>
    </Box>
  )
}

export default NavbarGeneral;