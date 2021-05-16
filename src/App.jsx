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
import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
const App = () => {
  // var jsonData=[];
  // let countries = [];
  const [countries, setCountries] = useState([]);
  const [infected, setInfected] = useState(0);
  const [recovered, setRecovered]= useState("0")
  const [deaths, setDeaths]= useState("0")
  const fetchCovid = useCallback(async () => {
    const data = await fetch(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    );
    const jsonData = await data.json();
    // jsArray=  [...jsonData];
    console.log(jsonData[1]["country"]);
    jsonData.forEach((element) => {
      setCountries((prevCountries) => {
        return [...prevCountries, element["country"]];
      });
    });
    //console.log(countries)
  }, []);
  useEffect(() => {
    fetchCovid();
  }, [fetchCovid]);

  const [whichCountry, selectCountry] = useState("");
  const fetchInfected = useCallback(async () => {
    const data = await fetch(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    );
    const jsonDataI=await data.json()
    console.log(whichCountry)
    jsonDataI.forEach((obj)=>{
      if(obj['country']==whichCountry){
        setInfected(obj['infected'])
      }
    })

  });
  useEffect(() => {
    fetchInfected();
  }, [whichCountry]);

  const fetchRecovered = useCallback(async () => {
    const data = await fetch(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    );
    const jsonDataR=await data.json()
    console.log(whichCountry)
    jsonDataR.forEach((obj)=>{
      if(obj['country']==whichCountry){
        setRecovered(obj['recovered'])
      }
    })

  });
  useEffect(() => {
    fetchRecovered();
  }, [whichCountry]);

  const fetchDeaths = useCallback(async () => {
    const data = await fetch(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    );
    const jsonDataD=await data.json()
    console.log(whichCountry)
    jsonDataD.forEach((obj)=>{
      if(obj['country']==whichCountry){
        setDeaths(obj['deceased'])
      }
    })

  });
  useEffect(() => {
    fetchDeaths();
  }, [whichCountry]);

  // const addCountry=(param)=>{
  // selectCountry([...param]);
  // }
  const addCountry = (e) => {
    console.log("ON SELECT CALLED");
    selectCountry(e.target.value);
    console.log(whichCountry);
  };

  return (
    <VStack
      bg={useColorModeValue("white", "blue.700")}
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
            count={infected}
            date="11/05/21"
            desc="Total infections"
            img="https://image.flaticon.com/icons/png/128/2659/2659980.png"
            tag="Infected"
          ></Stat_card>
          <Stat_card
            count={recovered}
            date="11/05/21"
            tag="Recovered"
            desc="Total number of people recovered"
            img="https://image.flaticon.com/icons/png/128/1513/1513277.png"
          ></Stat_card>
          <Stat_card
            count={deaths}
            date="11/05/21"
            tag="Deaths"
            desc="Total Number of Deaths"
            img="https://image.flaticon.com/icons/png/128/3922/3922093.png"
          ></Stat_card>
        </HStack>
      </Flex>
      <Flex mt={20} w="md" alignSelf="center">
        <Picker countries={countries} addCountry={addCountry}></Picker>
      </Flex>
      <Flex md={10} w="md" alignSelf="center">
        {/* <Picker></Picker> */}
      </Flex>
      <Flex justify="center">
        <BarChart></BarChart>
      </Flex>
      <StackDivider h="10" value="xyz"></StackDivider>
    </VStack>
  );
};

export default App;
