import { Box, chakra, useColorModeValue, Flex, Image} from "@chakra-ui/react";

const Stat_card = () => {
  return (
    <Box
      w="sm"
      mx="auto"
      py={4}
      px={8}
      bg={useColorModeValue("white", "gray.900")}
      shadow="lg"
      rounded="lg"
    >
      <Flex justifyContent={{ base: "center", md: "end" }} mt={-16}>
        <Image
          w={20}
          h={20}
          fit="cover"
          alt="infected"
          src="https://image.flaticon.com/icons/png/128/2659/2659980.png"
        />
      </Flex>

      <chakra.h2
        color={useColorModeValue("gray.800", "white")}
        fontSize={{ base: "2xl", md: "3xl" }}
        mt={{ base: 2, md: 0 }}
        fontWeight="bold"
      >
        100
      </chakra.h2>

      <chakra.p
        mt={1}
        mb={3}
        color={useColorModeValue("gray.600", "red.400")}
        fontSize="3xl"
      >
        Infected
      </chakra.p>
      <chakra.p
        mt={1}
        color={useColorModeValue("gray.600", "gray.300")}
        fontSize="xl"
      >
        Date
      </chakra.p>
      <chakra.p
        mb={3}
        color={useColorModeValue("gray.600", "gray.300")}
        fontSize="xl"
      >
        <i> Description</i>
      </chakra.p>
    </Box>
  );
};

export default Stat_card;
