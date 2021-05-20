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
import { useState, useEffect } from "react";
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
//const ydata=[{ylabel:6000},{ylabel:12000},{ylabel:18000},{ylabel:24000}]
//var chartTemp=[];
const BarChart = ({ whichCountry }) => {
  const [chartdata, setChartdata] = useState([]);
  const [opt, setopt] = useState("Choose an option");
  const [chartTemp, setChartTemp] = useState("0");
  const fetchChartData = async () => {
    const data = await fetch(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    );
    const jsonData = await data.json();
    // jsArray=  [...jsonData];
    //console.log(jsonData[1]["country"]);

    jsonData.forEach(async (element) => {
      //console.log(element["country"],whichCountry)
      if (element["country"] == whichCountry) {
        //console.log(element["historyData"])
        setChartdata("0");
        setChartTemp("0");
        const data2 = await fetch(element["historyData"]);
        const jsonData2 = await data2.json();

        for (const key of Object.keys(jsonData2)) {
          //console.log(key, opt);
          var cases = await jsonData2[key];
          if (opt == "Infected") {
            if (
              cases.hasOwnProperty("infected") &&
              cases["infected"] != undefined
            ) {
              setChartTemp(JSON.stringify(cases["infected"]));
              //console.log(chartdata)
            } else if (
              cases.hasOwnProperty("totalCases") &&
              cases["totalCases"] != undefined
            ) {
              setChartTemp(JSON.stringify(cases["totalCases"]));
            } else {
              continue;
            }
          } else if (opt == "Recovered") {
            if (
              cases.hasOwnProperty("recovered") &&
              cases["recovered"] != undefined
            ) {
              setChartTemp(JSON.stringify(cases["recovered"]));
            } else {
              continue;
            }
          } else if (opt == "Deceased") {
            if (
              cases.hasOwnProperty("deceased") &&
              cases["deceased"] != undefined
            ) {
              setChartTemp(JSON.stringify(cases["deceased"]));
            } else if (
              cases.hasOwnProperty("deaths") &&
              cases["deaths"] != undefined
            ) {
              setChartTemp(JSON.stringify(cases["deaths"]));
            } else {
              continue;
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    fetchChartData();
    //console.log(chartTemp)
  }, [opt, whichCountry]);

  useEffect(() => {
    setChartdata(() => {
      return [...chartdata, { ykey: chartTemp }];
    });
    //console.log(chartdata);
  }, [chartTemp]);

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
          <option defaultValue>Choose an option</option>
          <option>Infected</option>
          <option>Recovered</option>
          <option>Deceased</option>
        </Select>
      </Flex>
      <div>
      <ResponsiveContainer width="100%" height={500}>
      <AreaChart data={chartdata.length > 1 ? chartdata : data}>
        <Area dataKey="ykey"/>
        <XAxis dataKey="data"/>
        <YAxis dataKey="ykey"/>
      </AreaChart>
    </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default BarChart;
