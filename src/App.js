import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  // Text,
  // Link,
  // VStack,
  // Code,
  // Grid,
  theme,
} from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const API_KEY = process.env.REACT_APP_API_KEY;
const APOD_URL = 'https://api.nasa.gov/planetary/apod';

const endpoint = `${APOD_URL}?api_key=${API_KEY}&count=10`;

function App() {
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(endpoint);
        console.log(data);
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
      <Box textAlign="center" fontSize="xl">
        Spacestagram
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </ChakraProvider>
  );
}

export default App;