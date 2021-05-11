import { Heading } from '@chakra-ui/layout';

const Header = () => {
  return (
    <Heading
      fontSize={{ base: 'xl', sm: '2xl', lg: '4xl', xl: '7xl' }}
      bgGradient='linear(to-r,#e53935, #e35d5b)'
      bgClip='text'
    >
      Covid 19 Tracker
    </Heading>
  );
};

export default Header;