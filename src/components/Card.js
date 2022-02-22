import React from 'react';
import {
  Box,
  IconButton,
  Image,
  Badge,
  Button,
  Text,
  Stack,
  useColorMode,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';

const Card = ({ title, url, date, explanation }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      w={[240, 250, 300, 400]}
      rounded="20px"
      overflow="hidden"
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
    >
      <Image src={url} alt="space api image" boxSize={[240, 250, 300, 400]} />
      <Box>
        <Stack align="center">
          <Badge variant="solid" colorScheme="purple" rounded="full" px={2}>
            {date}
          </Badge>
        </Stack>
        <Stack align="center">
          <Text as="h2" fontWeight="normal" my={2}>
            {title}
          </Text>
          {/* <Text fontWeight="light">{explanation}</Text> */}
        </Stack>
        <Flex alignItems="center" justifyContent="space-around">
          <IconButton
            isRound
            variant="outline"
            colorScheme="red"
            aria-label="Like Button"
            fontSize="20px"
            icon={<AiOutlineHeart />}
          />
          <Spacer />
          <Popover isLazy>
            <PopoverTrigger>
              <Button variant="solid" colorScheme="purple" size="sm">
                Learn More
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
              <PopoverBody>
                {explanation}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Box>
    </Box>
  );
};

export default Card;
