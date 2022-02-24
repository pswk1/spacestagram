import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Center,
  Box,
  SimpleGrid,
  Heading,
  Flex,
  theme
} from '@chakra-ui/react';
import axios from 'axios';
import { generateRandomLikes, generateId } from './utils/utils';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Card from './components/Card';

const API_KEY = process.env.REACT_APP_API_KEY;
const APOD_URL = 'https://api.nasa.gov/planetary/apod';

const endpoint = `${APOD_URL}?api_key=${API_KEY}&count=12`;

function App() {
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(endpoint);
        data.forEach((image) => {
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
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" mb="20px">
        <Heading as="h1" size="2xl">
          Spacestagram 
        </Heading>

        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
      {loading ? (
        <Center mt={12}>
          <Heading as="h2" size="2xl">
            Loading...
          </Heading>
        </Center>
      ) : (
        <Flex alignItems="center" justifyContent="center">
          <SimpleGrid columns={[1, 1, 1, 2]} spacing={12}>
            {imgData.map(({ title, date, explanation, url, numOfLikes, liked, id }) => (
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
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </ChakraProvider>
  );
}

export default App;
