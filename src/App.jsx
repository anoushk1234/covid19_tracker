import {
  HStack,
  StackDivider,
  VStack,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Picker from "./components/Picker";
import Stat_card from "./components/Stat_card";
import BarChart from "./components/Chart";
import Header from "./components/Header";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
const App = () => {
 // var jsonData=[];
 var countries=[];
  const fetchCovid = async () => {
  const data = await fetch(
    'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true'
  );
   const jsonData = await data.json();
  // jsArray=  [...jsonData];
  //console.log(jsonData[19]["country"]);
  jsonData.forEach(element => {
    countries.push(element['country'])
  });
  //console.log(countries)
};
fetchCovid();



// for (let index = 0; index < 49; index++) {
  
//    countries.push(jsData[index]["country"])
// }



  return (
    <VStack
      bg={useColorModeValue("#F9FAFB", "blue.900")}
      spacing={4}
      align="stretch"
    >
      <ColorModeSwitcher alignSelf="flex-end" />
      <Flex justify="center">
        <Header />
      </Flex>
      <Flex pt={20} pd={10} w="full" justifyContent="center">
        <HStack mt={20} spacing="24px">
          <Stat_card
            count="100"
            date="11/05/21"
            desc="Total infections"
            netimg="https://image.flaticon.com/icons/png/128/2659/2659980.png"
            tag="Infected"
          ></Stat_card>
          <Stat_card
            count="60"
            date="11/05/21"
            tag="Recovered"
            desc="Total number of people recovered"
            netimg="https://image.flaticon.com/icons/png/128/1513/1513277.png"
          ></Stat_card>
          <Stat_card
            count="12"
            date="11/05/21"
            tag="Deaths"
            desc="Total Number of Deaths"
            netimg="https://image.flaticon.com/icons/png/128/3922/3922093.png"
          ></Stat_card>
        </HStack>
      </Flex>
      <Flex mt={20} w="md" alignSelf="center">
        <Picker countries={countries}></Picker>
      </Flex>
      <Flex md={10} w="md" alignSelf="center">
        {/* <Picker></Picker> */}
      </Flex>
      <Flex justify="center">
        <Box
          w="5xl"
          py={4}
          px={8}
          rounded="lg"
          bg={useColorModeValue("white", "blue.700")}
          shadow="lg"
        >
          <BarChart></BarChart>
        </Box>
      </Flex>
      <StackDivider h="10" value="xyz"></StackDivider>
    </VStack>
  );
};

export default App;
