import React from 'react';
import { Box, Heading, Flex, IconButton, Link } from '@chakra-ui/react';
import { FaRandom, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Header = ({ fetchData }) => {
  return (
    <Flex direction="row" justify="space-evenly" align="center" mb={10}>
      <Heading as="h1" size="2xl">
        spacestagram
      </Heading>
      <Box  mt={5} >
        <Link href="https://github.com/pswk1" isExternal>
          <IconButton
            isRound
            size="lg"
            variant="link"
            aria-label="get random feed"
            fontSize="20px"
            icon={<FaGithub />}
          />
        </Link>

        <Link href="https://www.linkedin.com/in/peterswkang/" isExternal>
          <IconButton
            isRound
            size="lg"
            variant="link"
            aria-label="get random feed"
            fontSize="20px"
            icon={<FaLinkedin />}
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
