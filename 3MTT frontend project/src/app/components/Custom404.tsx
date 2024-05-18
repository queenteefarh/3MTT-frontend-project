import React from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >
      <Heading fontSize="6xl" color="red.500" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Oops! Page not found.
      </Text>
      <Text fontSize="lg" color="gray.600" mb={8}>
        The page you are looking for might have been removed or doesn&apost exist.
      </Text>
      <Link href="/" passHref>
        <Button colorScheme="teal" _hover={{ bg: "teal.600" }}>
          Go back to home
        </Button>
      </Link>
      
    </Flex>
  );
};

export default Custom404;
