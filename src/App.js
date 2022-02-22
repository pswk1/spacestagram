import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Center,
  Box,
  SimpleGrid,
  Heading,
  // Text,
  // Link,
  // VStack,
  // Code,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Card from './components/Card';
import theme from './theme'

const API_KEY = process.env.REACT_APP_API_KEY;
const APOD_URL = 'https://api.nasa.gov/planetary/apod';

const endpoint = `${APOD_URL}?api_key=${API_KEY}&count=21`;

function App() {
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(endpoint);
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
        <Heading as="h1" size="3xl">
          Spacestagram 🚀
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
          <SimpleGrid columns={[1, 2, null, 3]} spacing={12}>
            {imgData.map(({ title, date, explanation, url }, i) => (
              <Card
                key={i}
                title={title}
                date={date}
                explanation={explanation}
                url={url}
              />
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </ChakraProvider>
  );
}

export default App;
