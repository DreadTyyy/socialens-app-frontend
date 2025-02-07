import { Box, Flex, Text, Input, Fieldset, Spinner, Link as ChakraLink } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Link as RouterLink } from "react-router-dom";
import { toaster, Toaster } from "../components/ui/toaster";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { login, putAccessToken } from "../utils/api";

const Login = ({
    authUser
  }: {
    authUser: object | null;
  }) => {
  const [username, handleUsernameChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [fieldError, setFieldError] = useState<boolean>(false);
  const [messageFieldError, setMessageFieldError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate()

  useEffect(() =>{
    if (authUser) {
        navigate('/dashboard');
    }
    setFieldError(false);
    
    // handle ketika user melakukan enter pada input login
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleButtonLogin();
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, username]);

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
    return false;
  }

  const handleButtonLogin = async () => {
    if (checkEmptyField()) return;

    setLoading(true);
    const { error, message, accessToken } = await login({username, password});
    setLoading(false);
    
    toaster.create({
        description: message,
        type: error ? 'error' : 'success',
        duration: 6000,
      })

    if(!error) {
        putAccessToken(accessToken);
        navigate('/dashboard');
    }
  }

  return (
    <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="primary.100"
        minH="100vh"
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
                    Hai! Selamat datang di SociaLens 👋
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
                        onClick={handleButtonLogin}
                    >
                        {loading ? <Spinner/> : <>Login</>}
                    </Text>
                    <Box mt={2} fontSize="14px">
                        <Text>Belum memiliki akun? 
                            {" "}
                            <RouterLink to="/register">
                                <Text
                                    as="span"
                                    color="primary.950"
                                    fontWeight="600"
                                >
                                    Sign up
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

export default Login