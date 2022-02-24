import React from 'react';
import { Box, Heading, Flex, IconButton, Link } from '@chakra-ui/react';
import { FaRandom, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Header = ({ fetchData }) => {
  return (
    <Flex direction="row" justify="space-evenly" align="center" mb={10}>
      <Box px={2}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <IconButton
          isRound
          size="md"
          variant="ghost"
          aria-label="get random feed"
          fontSize="20px"
          icon={<FaRandom />}
          onClick={fetchData}
        />
      </Box>
      <Heading as="h1" size="2xl">
        Spacestagram
      </Heading>

      <Box px={2}>
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
      </Box>
    </Flex>
  );
};

export default Header;
