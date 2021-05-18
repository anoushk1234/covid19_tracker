import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Box, useColorModeValue, Select, Flex } from "@chakra-ui/react";
import { useState,useEffect } from "react";
// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'
import { format, parseISO, set, subDays } from "date-fns";

const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: 1 + Math.random(),
  });
}
const BarChart = (whichCountry) => {
  const [chartdata, setChartdata] = useState([]);
  const [opt, setopt] = useState("Choose an option");
  const fetchChartData = async () => {
    const data = await fetch(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    );
    const jsonData = await data.json();
    // jsArray=  [...jsonData];
    //console.log(jsonData[1]["country"]);

    jsonData.forEach(async (element) => {
      console.log(element["country"],whichCountry.whichCountry)
      if (element["country"] == whichCountry.whichCountry) {
        //console.log(element["historyData"])
        const data2 = await fetch(element["historyData"]);
        const jsonData2 = await data2.json();
        // jsonData2.forEach((element)=>{
        //    if(element.hasOwnProperty('infected')==true){
        //        return masterData.push([...element['infected']])
        //    }else {
        //        return [...element['activeCases']]
        //    }
        // })
        for (const key of Object.keys(jsonData2)) {
          if (opt == "infected") {
            var cases = jsonData2[key];
            if (cases.hasOwnProperty("infected")) {
              setChartdata((previtem) => {
                return [...previtem, cases["infected"]];
              });
            } else {
              setChartdata((prevItem) => {
                return [...prevItem, cases["totalCases"]];
              });
            }
          }
        }
      }
    });
    
  };

  useEffect(() => {
    fetchChartData();
    console.log(chartdata)
  }, [opt]);
  
  const addOpt = (e) => {
    setopt(e.target.value);
  };
  // console.log(opt)
  return (
    <Box
      w="5xl"
      py={4}
      px={8}
      rounded="lg"
      bg={useColorModeValue("white", "gray.900")}
      shadow="lg"
    >
      <Flex justify="center">
        <Select mb="1.5" width="47%" variant="filled" onChange={addOpt}>
          <option defaultValue>{opt}</option>
          <option>Infected</option>
          <option>Recovered</option>
          <option>Deceased</option>
        </Select>
      </Flex>
      <div>
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                return opt;
              }}
            />

            <YAxis
              datakey="value"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(2)}`}
            />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default BarChart;
