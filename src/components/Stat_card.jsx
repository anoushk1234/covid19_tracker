import {
  Box,
  chakra,
  useColorModeValue,
  Flex,
  Image,
  SkeletonCircle,
} from "@chakra-ui/react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

const Stat_card = (props) => {
  const [isLoad, setIsLoad] = useState(false);
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
        <SkeletonCircle w={20} h={20} fit="cover" isLoaded={isLoad}>
          <Image
            onLoad={() => {
              setIsLoad(true);
            }}
            w={20}
            h={20}
            fit="cover"
            src={props.img}
          />
        </SkeletonCircle>
      </Flex>
      <chakra.h2
        color={useColorModeValue("gray.800", "white")}
        fontSize={{ base: "2xl", md: "3xl" }}
        mt={{ base: 2, md: 0 }}
        fontWeight="bold"
      >
        {props.count}
      </chakra.h2>

      <chakra.p
        mt={1}
        mb={3}
        color={useColorModeValue("gray.600", "red.400")}
        fontSize="3xl"
      >
        {props.tag}
      </chakra.p>
      <chakra.p
        mt={1}
        color={useColorModeValue("gray.600", "gray.300")}
        fontSize="xl"
      >
        {props.date}
      </chakra.p>
      <chakra.p
        mb={3}
        color={useColorModeValue("gray.600", "gray.300")}
        fontSize="xl"
      >
        <i> {props.desc}</i>
      </chakra.p>
    </Box>
  );
};

export default Stat_card;
