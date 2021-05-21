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
import { Box, useColorModeValue, Select, Flex, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'
import { format, parseISO, set, subDays } from "date-fns";
import sampledata from "../sampledata";

// const data = [];
// for (let num = 30; num >= 0; num--) {
//   data.push({
//     date: subDays(new Date(), num).toISOString().substr(0, 10),
//     value: 1 + Math.random(),
//   });
// }
//const ydata=[{ylabel:6000},{ylabel:12000},{ylabel:18000},{ylabel:24000}]
//var chartTemp=[];
const BarChart = ({ whichCountry }) => {
  const [chartdata, setChartdata] = useState([]);
  const [opt, setopt] = useState("Choose an option");
  const [chartTemp, setChartTemp] = useState({ykey:0});

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          w="sm"
          p={4}
          boxShadow="sm"
          width="fit"
          borderRadius="1rem"
          bgColor="#26313c"
          color="#b22222"
        >{`${opt} : ${payload[0].value}`}</Box>
      );
    }

    return null;
  };

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
        setChartdata([]);
        setChartTemp({ykey:0});
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
              setChartTemp({ykey:parseInt(cases["infected"])});
              //console.log(chartdata)
            } else if (
              cases.hasOwnProperty("totalCases") &&
              cases["totalCases"] != undefined
            ) {
              setChartTemp({ykey:parseInt(cases["totalCases"])});
            } else {
              continue;
            }
          } else if (opt == "Recovered") {
            if (
              cases.hasOwnProperty("recovered") &&
              cases["recovered"] != undefined
            ) {
              setChartTemp({ykey:parseInt(cases["recovered"])});
            } else {
              continue;
            }
          } else if (opt == "Deceased") {
            if (
              cases.hasOwnProperty("deceased") &&
              cases["deceased"] != undefined
            ) {
              setChartTemp({ykey:parseInt(cases["deceased"])});
            } else if (
              cases.hasOwnProperty("deaths") &&
              cases["deaths"] != undefined
            ) {
              setChartTemp({ykey:parseInt(cases["deaths"])});
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
      return [...chartdata, chartTemp];
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
      <div><Skeleton  isLoaded={chartdata.length>1?true:false}>
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart data={chartdata}>
            
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b22222" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#ff0028" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              dataKey="ykey"
              stroke="#b22222"
              
              fill="url(#color)"
            />
            <YAxis
              dataKey="ykey"
              axisLine={false}
              tickLine={false}
              tickCount={7}
            />
            <Tooltip  content={<CustomTooltip />}/>
            <CartesianGrid opacity={0.1} vertical={false} />

            
          </AreaChart>
        </ResponsiveContainer>
        </Skeleton>
      </div>
    </Box>
  );
};

export default BarChart;
