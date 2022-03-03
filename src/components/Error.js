import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import React from 'react';

const Error = ({ errorAlert }) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Error
      </AlertTitle>
      <AlertDescription data-testid='error-alert' maxWidth="sm">
        { errorAlert }
      </AlertDescription>
    </Alert>
  );
};

export default Error;
