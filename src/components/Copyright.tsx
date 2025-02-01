import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Text color="dark.950" pt="32px" pb="16px" pr="20px" opacity={0.6} fontSize="13px" textAlign="right">
        Made with ❤️ by
        <Link to="https://mori-zaky.vercel.app/"> ZakyAdib </Link>
        - &copy; 2025
    </Text>
  )
}

export default Copyright