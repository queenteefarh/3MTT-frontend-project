import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";

const RepoDetails = ({ repo }) => {
  const [readmeContent, setReadmeContent] = useState("");

  // Function to fetch README content from the GitHub API
  useEffect(() => {
    async function fetchReadme() {
      try {
        // Fetch README content
        const response = await fetch(`${repo.url}/readme`);
        const data = await response.json();
        // Decode base64 encoded README content
        const decodedContent = atob(data.content);
        setReadmeContent(decodedContent);
      } catch (error) {
        console.error("Error fetching README:", error);
      }
    }

    fetchReadme();
  }, [repo.url]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      overflow="hidden"
      maxW="xl"
      mx="auto"
    >
      {/* Repository name and link to GitHub */}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p={4}
        borderBottomWidth="1px"
      >
        <Heading as="h2" size="lg" fontWeight="bold">
          {repo.name}
        </Heading>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          fontSize="lg"
          color="gray.500"
          title="View on GitHub"
        >
          <IconButton
            aria-label="View on GitHub"
            icon={<FiGithub />}
            variant="ghost"
            size="md"
          />
        </Link>
      </Flex>

      {/* Repository description */}
      <Box p={4}>
        <Text color="gray.600">{repo.description || "No description available."}</Text>
      </Box>

      {/* Divider */}
      <Divider />

      {/* Repository details */}
      <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Box mb={{ base: 2, md: 0 }}>
            <Text fontWeight="bold" mr={2}>Stars:</Text>
            <Text>{repo.stargazers_count}</Text>
          </Box>
          <Box mb={{ base: 2, md: 0 }}>
            <Text fontWeight="bold" mr={2}>Forks:</Text>
            <Text>{repo.forks_count}</Text>
          </Box>
          <Box mb={{ base: 2, md: 0 }}>
            <Text fontWeight="bold" mr={2}>License:</Text>
            <Text>{repo.license ? repo.license.name : "Unknown"}</Text>
          </Box>
          <Box mb={{ base: 2, md: 0 }}>
            <Text fontWeight="bold" mr={2}>Language:</Text>
            <Text>{repo.language || "Unknown"}</Text>
          </Box>
          <Box mb={{ base: 2, md: 0 }}>
            <Text fontWeight="bold" mr={2}>Created:</Text>
            <Text>{new Date(repo.created_at).toLocaleDateString()}</Text>
          </Box>
          <Box mb={{ base: 2, md: 0 }}>
            <Text fontWeight="bold" mr={2}>Last Updated:</Text>
            <Text>{new Date(repo.updated_at).toLocaleDateString()}</Text>
          </Box>
          <Box mb={{ base: 2, md: 0 }}>
            <Text fontWeight="bold" mr={2}>Primary Branch:</Text>
            <Text whiteSpace="nowrap">{repo.default_branch}</Text>
          </Box>
        </Flex>
      </Box>

      {/* Display README content if available */}
      {readmeContent && (
        <>
          <Divider />
          <Box p={4}>
            <Heading as="h3" size="md" mb={2}>README</Heading>
            <Text color="gray.700" whiteSpace="pre-line">{readmeContent}</Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RepoDetails;
