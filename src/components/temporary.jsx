import { VStack, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import {
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  YAxis,
  Area,
} from "recharts";


import React from "react";
const opt = "infected";
const App = () => {
  return (
    <VStack
      bgGradient={useColorModeValue(
        "linear(to-br,#56CCF2, #2F80ED)",
        "gray.900"
      )}
      spacing={4}
      align="stretch"
    >
      <Flex justify="center">
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
              opacity={0.8}
              fill="url(#color)"
            />
            <YAxis
              dataKey="ykey"
              axisLine={false}
              tickLine={false}
              tickCount={7}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Flex>
    </VStack>
  );
};
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
export default App;
