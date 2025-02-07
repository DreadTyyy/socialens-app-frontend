import { Box, Flex, Button, Link } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  // DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  // DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  // DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { useState } from "react";

const ActionButton = () => {
  return (
    <>
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
    </>
  )
}

const ListNav = () => {
  return (
    <>
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
    </>
  )
}

const NavbarGeneral = () => {
  const [open, setOpen] = useState<boolean>(false);

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
        <Flex gap="24px" display={{ base: "none", md: "flex" }}>
          <ListNav />
        </Flex>
        {/* ActionButton */}
        <Flex gap="16px" display={{ base: "none", md: "flex" }}>
          <ActionButton />
        </Flex>
        <Box display={{ base: "block", md: "none" }}>
          <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <RxHamburgerMenu size="28px"/>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
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
              </DrawerHeader>
              <DrawerBody>
                <Flex h="80%" flexDir="column" justifyContent="space-between">
                  <Flex gap="24px" flexDir="column">
                    <ListNav />
                  </Flex>
                  <Flex gap="16px">
                    <Button w="50%" size="md" variant="ghost" borderRadius="12px" _hover={{ bgColor: "transparent" }}>
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
                    <Button w="50%" size="md" bgColor="primary.950" borderRadius="12px" _hover={{ bgColor: "primary.500" }}>
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
                </Flex>
              </DrawerBody>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
        </Box>
    </Box>
  )
}

export default NavbarGeneral;