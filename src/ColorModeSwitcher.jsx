import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');

  return (
    <IconButton
      size='lg'
      fontSize='lg'
      aria-label={`Switch to ${text} mode`}
      colorScheme='blue'
      mr={2}
      mt={2}
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      isRound='true'
      {...props}
    />
  );
};