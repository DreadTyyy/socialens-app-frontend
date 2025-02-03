import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Text, Flex, Image, Button } from "@chakra-ui/react";
import Copyright from '../components/Copyright';
import LineChartDouble from "../components/LineChartDouble";
import DetailDataReview from "../components/DetailDataReview";
import UploadFileReview from "../components/UploadFileReview";
import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogActionTrigger } from "../components/ui/dialog";

import { LuFileUp } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import { BiImport } from "react-icons/bi";
import BarChart from "../components/BarChart";
import { User } from "../utils/models/user";
import { deleteRestaurant, getDetailRestaurantSentiment } from "../utils/api";
import { RestaurantSentiment } from "../utils/models/restaurant";
import { SentimentCount } from "../utils/models/sentiment";
import InputRestaurantName from "../components/InputRestaurantName";
import Calendar from "../components/Calendar";

const ResetButton = ({userId}: {userId: number}) => {
  const ref = useRef<HTMLInputElement>(null);
                 
  const handleDeleteRestaurant = async () => {
    const {error, message} = await deleteRestaurant({userId});
    if (error) {
      alert(message);
    }
    alert(message);
    window.location.href = '/dashboard';
  }
  return (
    <DialogRoot initialFocusEl={() => ref.current} placement="center">
      <DialogTrigger asChild>
        <Flex 
          alignItems="center" 
          gap="8px" 
          px="12px" 
          py="8px" 
          borderRadius="12px" 
          bgColor="danger"
          color="white"
          cursor="pointer"
          transition="all 0.2s ease-in"
          _hover={{ 
            bgColor: "red.700"
          }}
          >
            <GrPowerReset size={18}/>
            <Text>Reset</Text>
          </Flex>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</DialogTitle>
        </DialogHeader>
        <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" _hover={{ bgColor: "dark.100" }} size="sm">Batal</Button>
            </DialogActionTrigger>
            <Button bgColor="danger" _hover={{ bgColor: "red.700" }} size="sm" onClick={handleDeleteRestaurant}>Hapus</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

const Analytics = ({authUser}: {authUser: User}) => {
  const [restaurant, setRestaurant] = useState<RestaurantSentiment | null>(null);
  const [sentiments, setSentiments] = useState<SentimentCount | null>(null);
  const [initialization, setInitialization] = useState<boolean>(true);

  async function getData(startDate?: string, endDate?: string) {
    const {data} = await getDetailRestaurantSentiment({userId: authUser.id, startDate, endDate});

    if (data) {
      setRestaurant(data.data);
      setSentiments(data.sentimenCount);
    }
    setInitialization(false);
  }

  useEffect(() => { 
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initialization) {
    return null;
  }
  
  return (
    <>
        <Box pt="70px" w="100%" bgColor="primary.100" minH="100vh">
          <Box pt="36px" pl="36px" pr="20px">
            <Flex justifyContent="space-between" alignItems="center" gap="24px">
              <Text fontWeight="medium" fontSize="24px" mb="24px">
                  Analisis Sentimen
              </Text>
              {restaurant && sentiments &&
                <Calendar getData={getData} firstDate={sentiments[0].date} lastDate={sentiments[sentiments.length - 1].date}/>
              }
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" gap="24px">
              <ResetButton userId={authUser.id} />
              <Flex gap="10px" flexDir={{ base: "column", lg: "row" }}>
                <Flex 
                    alignItems="center" 
                    gap="8px" 
                    px="12px" 
                    py="8px" 
                    borderRadius="12px" 
                    bgColor="transparent"
                    color="dark.950"
                    border="1px solid"
                    borderColor="dark.950"
                    cursor="pointer"
                    transition="all 0.2s ease-in"
                    _hover={{ 
                        bgColor: "dark.100"
                    }}
                >
                    <Image src="/public/logos_google-maps.png" h="20px"/>
                    <Text>Connect Google Maps</Text>
                </Flex>
                {authUser.restaurant_id ? 
                  <UploadFileReview restaurant_id={authUser.restaurant_id}>
                    <Flex 
                      alignItems="center" 
                      gap="8px" 
                      px="12px" 
                      py="8px" 
                      borderRadius="12px" 
                      bgColor="tertiarity.950"
                      color="white"
                      cursor="pointer"
                      transition="all 0.2s ease-in"
                      _hover={{ 
                        bgColor: "tertiarity.500"
                      }}
                      >
                        <LuFileUp size={18}/>
                        <Text>Import Review</Text>
                      </Flex>
                  </UploadFileReview>
                  :
                  <InputRestaurantName userId={authUser.id}>
                    <Flex 
                      alignItems="center" 
                      gap="8px" 
                      px="12px" 
                      py="8px" 
                      borderRadius="12px" 
                      bgColor="tertiarity.950"
                      color="white"
                      cursor="pointer"
                      transition="all 0.2s ease-in"
                      _hover={{ 
                        bgColor: "tertiarity.500"
                      }}
                      >
                        <LuFileUp size={18}/>
                        <Text>Create Restaurant</Text>
                      </Flex>
                  </InputRestaurantName>

                }
                <Link to="/files/template.xlsx" target="_blank" download="template">
                  <Flex 
                      alignItems="center" 
                      gap="8px" 
                      px="12px" 
                      py="8px" 
                      borderRadius="12px" 
                      bgColor="green.600"
                      color="white"
                      cursor="pointer"
                      transition="all 0.2s ease-in"
                      _hover={{ 
                          bgColor: "green.700"
                      }}
                  >
                      <BiImport size={18}/>
                      <Text>Template</Text>
                  </Flex>
                </Link>
              </Flex>
            </Flex>
            {sentiments && restaurant ? 
            //? Data found 
            <>
              <Flex
                mt="24px"
                gap={{ base: "16px", lg: "1.5%" }}
                w="100%"
                h={{ base: "fit-content", lg: "388px" }}
                flexDir={{base: "column-reverse", lg: "row"}}
              >
                <Box
                  p="24px"
                  minW="70%"
                  h="100%"
                  bgColor="white"
                  border="1px solid"
                  borderColor="dark.200"
                  borderRadius="16px"
                >
                  <Text fontWeight="medium"
                    >Laporan sentimen review restoran</Text>
                    <LineChartDouble sentiments={sentiments}/>
                </Box>
                <Box
                  p="24px"
                  minW="28.5%"
                  h="100%"
                  bgColor="white"
                  border="1px solid"
                  borderColor="dark.200"
                  borderRadius="16px"
                >
                  <DetailDataReview initialDate={restaurant.initialDate} restaurant={restaurant}/>
                </Box>
              </Flex>
              <Box mt="24px">
                <Text>BAGAIMANA TREN SENTIMEN REVIEW MINGGU TERAKHIR?</Text>
                <Flex gap={{ base: "16px", lg: "1.5%" }} mt="8px" flexDir={{base: "column", lg: "row"}}>
                  <Box
                    p="24px"
                    minW="49.5%"
                    h="100%"
                    bgColor="white"
                    border="1px solid"
                    borderColor="dark.200"
                    borderRadius="16px"
                  >
                    <Text fontWeight="medium"
                      >Sentimen review Positif</Text>
                      
                    <BarChart value="positive" sentiments={sentiments}/>
                  </Box>
                  <Box
                    p="24px"
                    minW="49.5%"
                    h="100%"
                    bgColor="white"
                    border="1px solid"
                    borderColor="dark.200"
                    borderRadius="16px"
                  >
                    <Text fontWeight="medium"
                      >Sentimen review Negatif</Text>
                    <BarChart value="negative" sentiments={sentiments}/>
                  </Box>
                </Flex>
              </Box>
            </>
            :
            //? No data found
            <Box
              mt="24px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="8px"
              bgColor="white"
              w="100%"
              py="32px"
              border="1px solid"
              borderColor="dark.200"
              borderRadius="16px"
            >
              <Image src={"/public/no_data.png"} w="360px"/>
              <Text color="dark.950" opacity={0.8} fontSize="14px">
                Tidak ada yang ditemukan. Coba masukkan data terlebih dahulu!
              </Text>
            </Box> 
            }
          </Box>

          {/* Copyright */}
          <Copyright />
        </Box>
    </> 
  )
}

export default Analytics