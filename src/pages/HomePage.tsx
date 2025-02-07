import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import Copyright from "../components/Copyright";

const features = ["Analisis sentimen akurat dan efisien", "Analisis sentimen real-time dengan hasil yang cepat", "Mendeteksi sentimen positif/negatif secara otomatis", "Didukung teknologi berbasis Artificial Intelligence", "Tampilan analisis sentimen yang informatif"];

const HomePage = () => {
  return (
    <>
    <Box
      px={{ base: '5%', md: '80px' }}
      py={{ base: "100px", md: "32px" }}
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgColor="primary.200"
    >
      <Flex>
        <Box w={{ base: "full", md: "50%" }}>
          <Text fontSize={{ base: "42px", md:"56px" }} fontWeight="600" color="dark.950" lineHeight={1.2} letterSpacing="-0.01em">
            SociaLens: Analisis Sentimen Review berbasis Artificial Intelligence
          </Text>
          <Text my="16px" fontSize="18px" color="dark.950" letterSpacing="-0.03em">
            Kelola review dengan mudah menggunakan SociaLens! Manfaatkan fitur AI dalam membantu melakukan analisis sentimen review.
          </Text>
          <Link
              href="/login" 
              gap="8px" 
              px="20px" 
              py="12px" 
              borderRadius="full" 
              bgColor="primary.950"
              color="white"
              cursor="pointer"
              fontSize="18px"
              transition="all 0.2s ease-in"
              w="fit-content"
              h="fit-content"
              _hover={{ 
                bgColor: "primary.700",
                boxShadow: "1px 4px 16px 5px rgba(56, 134, 222, 0.3)",
                textDecoration: "none"
              }}
              _focus={{ outline: "none" }}
            >
              <Text>Coba Aplikasi</Text>
          </Link>
        </Box>
      </Flex>
    </Box>
    <Box px={{ base: '5%', md: '80px' }} py={{ base: "32px", md: "64px" }} bgColor="primary.200">
      <Flex gap="64px" flexDir={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="end">
        <Box maxW={{ base: "full", md: "50%" }}>
          <Text fontSize={{ base: "32px", md: "48px" }} fontWeight="700" color="dark.950" lineHeight={1.2} letterSpacing="-0.01em">
            Dioptimalkan untuk analisis sentimen akurat dan pemrosesan data efisien
          </Text>
          <Text mt="16px" fontSize="18px" color="dark.950" letterSpacing="-0.03em">
            SociaLens dibangun menggunakan teknologi yang mendukung tampilan analisis sentimen review negatif maupun positif dan menggunakan teknologi berbasis Artificial Intelligence untuk melakukan memprediksi sentimen review secara akurat.
          </Text>
        </Box>
        <Flex 
          maxW={{ base: "full", md: "50%" }}
          flexDir="column"
          gap={{ base: "16px", md: "24px" }}
        >
          {features.map((feature: string) => (
            <Flex gap="18px" alignItems="center">
              <FaCheck color="#3886DE"/>
              <Text fontSize="18px" color="dark.950" letterSpacing="-0.03em">
                {feature}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
    <Box px={{ base: '5%', md: '80px' }} py={{ base: "32px", md: "64px" }} bgColor="primary.200">
      <Box>
        <Text fontSize={{ base: "32px", md: "48px" }} fontWeight="700" color="dark.950" lineHeight={1.2} letterSpacing="-0.01em">
          Scope sentimen review
        </Text>
        <Text mt="16px" fontSize="18px" color="dark.950" letterSpacing="-0.03em">
          SociaLens saat ini hanya dapat memprediksi sentimen review dalam cakupan tertentu
        </Text>
        <Flex mt="42px" gap="32px" flexDir={{ base: "column", md: "row" }}>
          <Box 
            p="24px"
            maxW={{ base: "full", md: "1/3" }}
            w="full"
            minH="240px"
            boxShadow="1px 4px 20px 2px rgba(56, 134, 222, 0.2)"
          >
            <Text fontSize="24px" color="dark.950" fontWeight="600" letterSpacing="-0.03em">
              Restoran
            </Text>
            <Text mt="16px" fontSize="18px" color="dark.950" lineHeight={1.6} letterSpacing="-0.03em">
              Sentimen review positif dan negatif mencakup tempat restoran, fasilitas maupun pelayanan yang diberikan, serta penyajian makanan/minuman kepada pelanggan.
            </Text>
          </Box>
          <Box 
            p="24px"
            maxW={{ base: "full", md: "1/3" }}
            w="full"
            minH="240px"
            bgColor="primary.100"
            opacity="0.4"
          >
            <Text fontSize="24px" color="dark.950" fontWeight="600" letterSpacing="-0.03em">
              Produk
            </Text>
            <Text mt="16px" fontSize="18px" color="dark.950" lineHeight={1.6} letterSpacing="-0.03em">
              Sentimen review positif dan negatif mencakup kualitas produk, daya tahan, harga, kemasan, serta pengalaman pelanggan dalam penggunaan produk.
            </Text>
          </Box>
          <Box 
            p="24px"
            maxW={{ base: "full", md: "1/3" }}
            w="full"
            minH="240px"
            bgColor="primary.100"
            opacity="0.4"
          >
            <Text fontSize="24px" color="dark.950" fontWeight="600" letterSpacing="-0.03em">
              Pariwisata
            </Text>
            <Text mt="16px" fontSize="18px" color="dark.950" lineHeight={1.6} letterSpacing="-0.03em">
              Sentimen review positif dan negatif mencakup pengalaman wisatawan terhadap destinasi, fasilitas, layanan akomodasi, kebersihan, serta keramahan staf di tempat wisata.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
    <Box px={{ base: '5%', md: '80px' }} pb="32px" pt ={{ base: "32px", md: "64px" }} bgColor="primary.200">
      <Flex justifyContent="center" alignItems="center">
        <Copyright />
      </Flex>
    </Box>
    </>
  );
}

export default HomePage;