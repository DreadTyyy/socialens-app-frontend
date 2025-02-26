import { useState, useEffect } from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import Copyright from '../components/Copyright';
import LineChartDouble from '../components/LineChartDouble';
import InputRestaurantName from '../components/InputRestaurantName';
import { Link } from 'react-router-dom';
import { User } from '../utils/models/user';
import { getDetailRestaurantSentiment } from '../utils/api';
import { SentimentCount } from '../utils/models/sentiment';
import { formattedShortDate, formattedShortFullDate } from '../utils/formattedDate';
import { RestaurantSentiment } from '../utils/models/restaurant';
import UploadFileReview from '../components/UploadFileReview';
import { titleCase } from "../utils/titleCase";


import { LuFileUp } from "react-icons/lu";
import { BiImport } from "react-icons/bi";
import { GoDatabase } from "react-icons/go";

const Dashboard = ({authUser}: {authUser: User}) => {
  const [restaurant, setRestaurant] = useState<RestaurantSentiment | null>(null);
  const [sentiments, setSentiments] = useState<SentimentCount | null>(null);
  const [initialization, setInitialization] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      const {data} = await getDetailRestaurantSentiment({userId: authUser.id});

      if (data) {
        setRestaurant(data.data);
        setSentiments(data.sentimenCount);
      }
      setInitialization(false);
    }
    getData();
  }, [authUser.id]);

    const rangeDate = (sentiments: SentimentCount) => {
      const lenSentiments = sentiments.length;
      return `${formattedShortDate(sentiments[0].date)} - ${formattedShortFullDate(sentiments[lenSentiments - 1].date)}`;
    }

    const countData = (restaurant: RestaurantSentiment) =>{
      return {
        totalData: restaurant.positive + restaurant.negative,
        positivePercent: Math.round((restaurant.positive / (restaurant.positive + restaurant.negative)) * 100),
        negativePercent: Math.round((restaurant.negative / (restaurant.positive + restaurant.negative)) * 100),
    }}

    if (initialization) {
      return null;
    }

    return (
     <>
      <Box px="20px" pt="70px" w="100%" bgColor="primary.100" h="100vh">
        {sentiments && restaurant ?
              //? Data found
              <Box pt="36px" pl="16px">
                <Flex 
                  justifyContent="space-between" 
                  mb="24px"
                  gap="24px" 
                  flexDir={{ xl: "row", base: "column" }} 
                >
                  <Flex gap="24px">
                    <Image src="/logo_restaurant.png" w="64px" h="64px" alt="Logo Restaurant"/>
                    <Box>
                      <Text fontSize="32px" fontWeight="semibold" lineHeight="1.3">{titleCase(restaurant.title)}</Text>
                      <Text color="dark.950" fontSize="14px">{rangeDate(sentiments)}</Text>
                    </Box>
                  </Flex>
                  <Flex gap="16px">
                    <Box
                      p="16px"
                      bgColor="dark.100"
                      border="1px solid"
                      minW="180px"
                      borderColor="dark.950"
                      borderRadius="24px"
                    >
                      <Text>Total data</Text>
                      <Text fontSize="36px" fontWeight="semibold">
                        {countData(restaurant).totalData}
                      </Text>
                    </Box>
                    <Box
                      p="16px"
                      bgColor="primary.200"
                      border="1px solid"
                      minW="180px"
                      borderColor="primary.950"
                      borderRadius="24px"
                    >
                      <Text>Review positif</Text>
                      <Text fontSize="36px" fontWeight="semibold">
                        {countData(restaurant).positivePercent}%
                      </Text>
                    </Box>
                    <Box
                      p="16px"
                      bgColor="red.100"
                      border="1px solid"
                      minW="180px"
                      borderColor="danger"
                      borderRadius="24px"
                    >
                      <Text>Review negatif</Text>
                      <Text fontSize="36px" fontWeight="semibold">
                        {countData(restaurant).negativePercent}%
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
                <Box
                  p="24px"
                  w="fit-content"
                  minW="60%"
                  // h="300px"
                  bgColor="white"
                  border="1px solid"
                  borderColor="dark.200"
                  borderRadius="16px"
                >
                  <Text fontWeight="medium"
                    >Laporan sentimen review restoran</Text>
                  <LineChartDouble sentiments={sentiments}/>
                </Box>
              </Box>
              :
              //? No data found 
              <Flex w="100%" h="100%" justifyContent="center" alignItems="center" gap="16px">
                {authUser.restaurant_id ? 
                 <UploadFileReview restaurant_id={authUser.restaurant_id}>
                    <Flex 
                      flexDirection="column"
                      w="220px" 
                      h="180px" 
                      bgColor="primary.950" 
                      borderRadius="56px" 
                      fontSize="24px" 
                      color="white"
                      fontWeight="medium"
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                      transition="all 0.2s ease-in"
                      _hover={{ 
                          bgColor: "primary.500"
                      }}
                    >
                      <LuFileUp size={48}/>
                      <Text>Import Review</Text>
                    </Flex>
                  </UploadFileReview>
                  :
                  <InputRestaurantName userId={authUser.id}>
                    <Flex 
                      flexDirection="column"
                      w="220px" 
                      h="180px" 
                      bgColor="primary.950" 
                      borderRadius="56px" 
                      fontSize="24px" 
                      color="white"
                      fontWeight="medium"
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                      transition="all 0.2s ease-in"
                      _hover={{ 
                          bgColor: "primary.500"
                      }}
                    >
                      <LuFileUp size={48}/>
                      <Text>Create Restaurant</Text>
                    </Flex>
                  </InputRestaurantName>
                }
                <Link to="/files/template.xlsx" target="_blank" download="template">
                  <Flex 
                    flexDirection="column"
                    w="220px" 
                    h="180px" 
                    bgColor="green.600" 
                    borderRadius="56px" 
                    fontSize="24px" 
                    color="white"
                    fontWeight="medium"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    transition="all 0.2s ease-in"
                    _hover={{ 
                        bgColor: "green.700"
                    }}
                  >
                      <BiImport size={48}/>
                      <Text>Template</Text>
                  </Flex>
                </Link>
                <Link to="/files/example.xlsx" target="_blank" download="example">
                  <Flex 
                    flexDirection="column"
                    w="220px" 
                    h="180px" 
                    bgColor="tertiarity.950" 
                    borderRadius="56px" 
                    fontSize="24px" 
                    color="white"
                    fontWeight="medium"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    transition="all 0.2s ease-in"
                    _hover={{ 
                        bgColor: "tertiarity.500"
                    }}
                  >
                    <GoDatabase size={48}/>
                    <Text>Example</Text>
                  </Flex>
                </Link>
              </Flex> 
        }
              <Copyright />
      </Box>
     </>
    )
}

export default Dashboard;