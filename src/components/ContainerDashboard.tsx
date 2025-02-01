import { ReactNode } from "react";
import { Container, Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const ContainerDashboard = ({path, children}: {
    path: string;
    children: ReactNode
}) => {
  return (
    <Container p='0px'>
      <Box display="flex">
        {/* Sidebar */}
        <Sidebar active={path} />
        {/* Main */}
        <Box minW="720px" w="100%">
          {children}
        </Box>
      </Box>
    </Container>
  )
}

export default ContainerDashboard;