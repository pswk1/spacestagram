import { useState, useEffect } from 'react';
import {
  Box,
  ChakraProvider,
  Center,
  SimpleGrid,
  Heading,
  Flex,
  IconButton,
  Link,
  Spinner,
  theme,
} from '@chakra-ui/react';
import axios from 'axios';
import { generateRandomLikes, generateId } from './utils/utils';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Card from './components/Card';
import { FaRandom, FaGithub, FaLinkedin } from 'react-icons/fa';

const API_KEY = process.env.REACT_APP_API_KEY;
const APOD_URL = 'https://api.nasa.gov/planetary/apod';

const endpoint = `${APOD_URL}?api_key=${API_KEY}&count=12`;

function App() {
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(endpoint);
      data.forEach(image => {
        image.id = generateId();
        image.numOfLikes = generateRandomLikes();
        image.liked = false;
      });
      setImgData(data);
    } catch (err) {
      if (err) {
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="row" justify="space-evenly" align="center" mb={10}>
        <Box px={2}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <IconButton
              isRound
              size="lg"
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

      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Flex alignItems="center" justifyContent="center">
          <SimpleGrid columns={[1, 1, 1, 2]} spacing={12}>
            {imgData.map(
              ({ title, date, explanation, url, numOfLikes, liked, id }) => (
                <Card
                  key={id}
                  id={id}
                  title={title}
                  date={date}
                  explanation={explanation}
                  url={url}
                  numOfLikes={numOfLikes}
                  liked={liked}
                  imgData={imgData}
                  setImgData={setImgData}
                />
              )
            )}
          </SimpleGrid>
        </Flex>
      )}
    </ChakraProvider>
  );
}

export default App;
