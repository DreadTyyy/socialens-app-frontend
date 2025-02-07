import { Box, Flex, Text, Input, Spinner, Fieldset, Link as ChakraLink } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { toaster, Toaster } from "../components/ui/toaster";
import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useInput from "../hooks/useInput";
import { register } from "../utils/api";

const Register = ({
    authUser
  }: {
    authUser: object | null;
  }) => {
  const [username, handleUsernameChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmationPassword, handleConfirmationPasswordChange] = useInput('');
  const [fieldError, setFieldError] = useState<boolean>(false);
  const [messageFieldError, setMessageFieldError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate()

  useEffect(() =>{
    if (authUser) {
        navigate('/dashboard');
    }
    setFieldError(false);
    // handle ketika user melakukan enter pada input register
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleButtonRegister();
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, username, confirmationPassword]);

  const checkEmptyField = () => {
    if (username === "") {
        setMessageFieldError("Username tidak boleh kosong");
        setFieldError(true);
        return true;
    }
    if (password === "") {
        setMessageFieldError("Password tidak boleh kosong");
        setFieldError(true);
        return true;
    }
    if (confirmationPassword === "") {
        setMessageFieldError("Konfirmasi password tidak boleh kosong");
        setFieldError(true);
        return true;
    }
    if (confirmationPassword !== password) {
        setMessageFieldError("Password dan konfirmasi password tidak sama");
        setFieldError(true);
        return true;
    }
    return false;
  }

  const handleButtonRegister = async () => {
    if (checkEmptyField()) return;
    setLoading(true);
    const { error, message } = await register({username, password, confirmationPassword});
    setLoading(false);
    toaster.create({
        description: message,
        type: error ? 'error' : 'success',
        duration: 6000,
      })

    if(!error) {
        navigate('/login');
    }
  }

  return (
    <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="primary.100"
        minH="100vh"
        zIndex={999999}
    >
        <Toaster />
        <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="10px"
            px={{ base: "16px", md: "48px" }}
            py="28px"
            bgColor="primary.100"
            boxShadow="2xl"
            borderRadius="16px"
        >
            <Box>
                <Text
                    w="full"
                    display="flex"
                    justifyContent="center"
                >
                    <ChakraLink 
                        href="/"
                        color="primary.500"
                        fontWeight={700}
                        mb="32px"
                        _hover={{ 
                            textDecoration: "none"
                        }}
                        _focus={{ 
                            outline: "none"
                         }}
                     >
                        SociaLens
                     </ChakraLink>
                </Text>
                <Text
                    fontSize={24}
                    lineHeight="1.2"
                    fontWeight={500}
                    w="300px"
                    textAlign="center"
                >
                    Hai! Daftarkan akunmu di SociaLens 🚀
                </Text>
            </Box>
            <Fieldset.Root mt={2} minW="320px" invalid={fieldError}>
                <Fieldset.ErrorText>
                    <Text bgColor="danger" color="white" w="100%" px={2} py={2} borderRadius="4px">
                        {messageFieldError}
                    </Text>
                </Fieldset.ErrorText>
                <Fieldset.Content>
                    <Field mb={{base: 1, md: 2}}>
                        <Input 
                            type="text" 
                            placeholder="Username" 
                            py={6} 
                            bgColor="dark.100"
                            color="dark.700"
                            fontSize="18px"
                            onChange={handleUsernameChange}
                            value={username} 
                        />
                    </Field>
                    <Field mb={{base: 1, md: 2}}>
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            py={6} 
                            bgColor="dark.100"
                            color="dark.700"
                            fontSize="18px"
                            onChange={handlePasswordChange}
                            value={password} 
                        />
                    </Field>
                    <Field mb={{base: 1, md: 2}}>
                        <Input 
                            type="password" 
                            placeholder="Konfirmasi password" 
                            py={6} 
                            bgColor="dark.100"
                            color="dark.700"
                            fontSize="18px"
                            onChange={handleConfirmationPasswordChange}
                            value={confirmationPassword} 
                        />
                    </Field>
                    <Text
                        as="button"
                        w="100%"
                        bgColor="primary.950"
                        color="white"
                        py={4}
                        borderRadius="8px"
                        fontSize="16px"
                        transition="all 0.2s ease-in"
                        cursor="pointer"
                        _hover={{ 
                            bgColor: "primary.500"
                        }}
                        onClick={handleButtonRegister}
                    >
                        {loading ? <Spinner /> : <>Sign up</>}
                    </Text>
                    <Box mt={2} fontSize="14px">
                        <Text>Sudah memiliki akun? 
                            {" "}
                            <RouterLink to="/login">
                                <Text
                                    as="span"
                                    color="primary.950"
                                    fontWeight="600"
                                >
                                    Sign in
                                </Text>
                            </RouterLink>
                        </Text>
                    </Box>
                </Fieldset.Content>
            </Fieldset.Root>
        </Flex>
    </Box>
  )
}

export default Register;