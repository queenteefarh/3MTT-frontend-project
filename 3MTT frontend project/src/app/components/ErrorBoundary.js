import React, { Component } from 'react';
import { Box, Text } from '@chakra-ui/react'; // Import Chakra UI components

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <Box p={4} bg="red.200" color="red.900">
          <Text fontSize="xl">Oops! Something went wrong.</Text>
          <Text mt={2}>
            Our team has been notified of this issue. Please try again later.
          </Text>
        </Box>
      );
    }

    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
