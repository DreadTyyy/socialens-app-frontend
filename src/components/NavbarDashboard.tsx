import { User } from "../utils/models/user";
import { Box, Text, Image } from "@chakra-ui/react";

const NavbarDashboard = ({authUser}: {authUser: User}) => {
  
  return (
    <Box
        position="fixed"
        px='20px'
        width="100%"
        height="70px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor="white"
        borderBottom="1px solid"
        borderColor="dark.300"
        zIndex="1"
      >
        <Box>
          <Text color="primary">
            Hello World
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="8px"
        >
          <Image src={authUser.profile} width="42px" height="42px" bgColor="primary.950" borderRadius="10000px"/>
          <Text fontWeight='medium'>
            {authUser.username}
          </Text>
        </Box>
      </Box>
  )
}

export default NavbarDashboard;