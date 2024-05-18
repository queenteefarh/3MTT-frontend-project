"use client"
import React, { useEffect, useState } from "react";
import RepoTable from "./components/RepoTable";
import { Repo } from "./types/repo";
import { fetchRepos, createRepo } from "./services.tsx/FetchRepos";
import { Box, Heading, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Spinner, useToast } from "@chakra-ui/react";

// Constants
const columns: string[] = ['id', 'name', 'html_url']; // Columns to display in the repository table
const itemsPerPage: number = 2; // Number of items per page in the repository table

/**
 * Home page component.
 * Displays the user's GitHub repositories and allows the creation of new repositories.
 * 
 * @returns {JSX.Element} - JSX element representing the home page.
 */
export default function Home() { 
  const [repos, setRepos] = useState<Repo[]>([]); // State to store repositories
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string>(''); // State to store error messages
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to manage modal open/close
  const [newRepoName, setNewRepoName] = useState<string>(''); // State to store new repository name
  const [newRepoDescription, setNewRepoDescription] = useState<string>(''); // State to store new repository description

  const toast = useToast(); // Toast notification hook

  // Fetch repositories on initial render
  useEffect(() => {
    handleFetchRepos();
  }, []);

  // Function to fetch repositories
const handleFetchRepos = async () => {
  try {
    setLoading(true); // Set loading to true
    const fetchedRepos = await fetchRepos(); // Fetch repositories
    setRepos([...fetchedRepos]); // Update repositories state
  } catch (error) {
    setError(error.message); // Set error message
  } finally {
    setLoading(false); // Set loading to false
  }
}

  // Function to open modal for creating new repository
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  // Function to close modal for creating new repository
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

// Function to handle form submission for creating new repository
const handleSubmit = async () => {
  try {
    setLoading(true); // Set loading to true
    handleCloseModal(); // Close modal
    const newRepo = await createRepo(newRepoName, newRepoDescription); // Create new repository and get response
    setRepos(prevRepos => [newRepo,...prevRepos, ]); // Add new repository to the existing list
    setNewRepoName(''); // Clear new repository name
    setNewRepoDescription(''); // Clear new repository description
    toast({ // Display success toast notification
      title: "success",
      description: "Repository Created",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } catch (error) {
    handleCloseModal(); // Close modal
    toast({ // Display error toast notification
      title: "Error",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,7;l;
    });
  } finally {
    setLoading(false); // Set loading to false after repository creation process is completed
  }
};



  return (
    <Box position="relative"> {/* Container for spinner positioning */}
      
      <Box p={4}>
        {/* Page title */}
        <Heading as="h1" size="xl" mb={2}>
          My GitHub Repositories
        </Heading>
        {/* Page description */}
        <Text fontSize="lg" mb={4}>
          Here are your repositories. You can filter and navigate through them below.
        </Text>
        {/* Button to open modal for creating new repository */}
        <Button onClick={handleOpenModal} mb={4}>Create New Repository</Button>
        {/* Repository table component */}
        <RepoTable data={repos} columns={columns} itemsPerPage={itemsPerPage} setRepos={setRepos} />
      </Box>
     
      {/* Modal for creating new repository */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Repository</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Form for entering new repository details */}
            <FormControl>
              <FormLabel>New Repository Name</FormLabel>
              <Input type="text" value={newRepoName} onChange={(e) => setNewRepoName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>New Repository Description</FormLabel>
              <Input type="text" value={newRepoDescription} onChange={(e) => setNewRepoDescription(e.target.value)} />
            </FormControl>
          </ModalBody>
          {/* Modal footer with create and cancel buttons */}
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>Create</Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {loading && ( // Render spinner if loading
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

    </Box>
  );
};
