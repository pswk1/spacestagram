import React from 'react';
import {
  Box,
  Heading,
  Flex,
  IconButton,
  Link,
  // useBreakpointValue
} from '@chakra-ui/react';
import { FaRandom, FaGithub } from 'react-icons/fa';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Header = ({ fetchData }) => {
  // const direction = useBreakpointValue({ base: 'row', sm: 'column', md: 'row'})
  // const marginBottom = useBreakpointValue({ base: 1, sm: 1, md: 6})

  return (
    // passing an array of values like the ones that are being passed in direction and mb represent the values at different breakpoints
    <Flex
      direction={['column', 'column', 'row']}
      justify="space-around"
      align="center"
      mb={[1, 1, 6]}
    >
      <Heading as="h1" size="2xl">
        spacestagram
      </Heading>
      <Box mt={5}>
        <Link href="https://github.com/pswk1/spacestagram" isExternal>
          <IconButton
            isRound
            size="lg"
            variant="link"
            aria-label="go to github"
            fontSize="20px"
            icon={<FaGithub />}
          />
        </Link>

        <ColorModeSwitcher justifySelf="flex-end" />

        <IconButton
          mb={3}
          isRound
          size="lg"
          variant="ghost"
          aria-label="get random feed"
          fontSize="20px"
          icon={<FaRandom />}
          onClick={fetchData}
        />
      </Box>
    </Flex>
  );
};

export default Header;
