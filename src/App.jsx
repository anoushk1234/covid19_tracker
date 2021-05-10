import {
  HStack,
  StackDivider,
  VStack,
  Box,
  Flex,
  chakra,
  Link,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import Picker from "./components/Picker";
import Stat_card from "./components/Stat_card";
import CovidChart from "./components/Chart";
const App = () => {
  return (
    <VStack
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      spacing={4}
      align="stretch"
    >
      <Flex pt={20} pd={10} w="full" justifyContent="center">
        <HStack mt={20} spacing="24px">
          <Stat_card></Stat_card>
          <Stat_card></Stat_card>
          <Stat_card></Stat_card>
        </HStack>
      </Flex>
      <Flex p={10} w="lg" alignSelf="center">
        <Picker></Picker>
      </Flex>
      {/* <Flex width="xl" alignSelf="Center" height="xl"></Flex> */}\
      <Flex justify="center" mb="1rem">
        <Box
          w="xl"
          mx="sm"
          my="sm"
          py={4}
          px={8}
          rounded="lg"
           bg={useColorModeValue("white", "gray.900")}
          shadow="lg"
        >
          <CovidChart></CovidChart>
        </Box>
      </Flex>
    </VStack>
  );
};

export default App;
