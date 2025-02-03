import React from "react";
import { Text } from "@chakra-ui/react";

const FormLabel = ({variant, children}: {variant: "error" | "success" | "normal"; children: React.ReactNode}) => {
    const variants = {
        "error": "danger",
        "success": "green.700",
        "normal": "primary.950"
    }
    return (
      <Text bgColor={variants[variant]} color="white" w="100%" px={2} py={2} borderRadius="4px" mb="4px">
        {children}   
      </Text>
    )
}

export default FormLabel;