import React from 'react';
import {
  Box,
  Image,
  IconButton,
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
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import FallbackImg from '../assets/img/notfound.jpg';

const Card = ({
  title,
  id,
  url,
  date,
  explanation,
  numOfLikes,
  liked,
  imgData,
  setImgData,
}) => {
  const { colorMode } = useColorMode();

  const handleLike = id => {
    let imgDataCopy = [...imgData];
    let img = imgDataCopy.find(img => img.id === id);
    if (img.liked) {
      img.liked = false;
      img.numOfLikes--;
    } else {
      img.liked = true;
      img.numOfLikes++;
    }
    setImgData(imgDataCopy);
  };

  const handleImgError = () => {
    url = FallbackImg;
  };
  return (
    <Box
      w={[250, 340, 400]}
      rounded="20px"
      overflow="hidden"
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
    >
      <Image
        data-testid="card-image"
        src={url}
        onError={handleImgError}
        alt={title}
        boxSize={[250, 340, 400]}
        objectFit="cover"
      />
      <Box>
        <Stack align="center">
          <Badge variant="solid" colorScheme="purple" rounded="full" px={2}>
            Published on {date}
          </Badge>
        </Stack>
        <Stack align="center">
          <Text data-testid="title" as="h2" fontWeight="normal" my={2}>
            {title}
          </Text>
        </Stack>
        <Flex alignItems="center" justifyContent="space-around">
          <IconButton
            mx={1}
            data-testid="like-button"
            isRound
            size="sm"
            variant="ghost"
            colorScheme="red"
            aria-label="Like Button"
            fontSize="20px"
            icon={
              liked ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart data-testid="outline-heart" />
              )
            }
            onClick={() => handleLike(id)}
          />
          <Text data-testid="numOfLikes">{numOfLikes} likes</Text>
          <Spacer />
          <Popover isLazy>
            <PopoverTrigger>
              <Button
                data-testid="learn-more"
                variant="solid"
                colorScheme="purple"
                size="sm"
              >
                Learn More
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Description</PopoverHeader>
              <PopoverBody data-testid="explanation">{explanation}</PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Box>
    </Box>
  );
};

export default Card;
