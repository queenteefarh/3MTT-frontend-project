"use client"
import { useState } from "react";
import { Badge, Box, Button, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, Spinner, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { deleteRepo, editRepo } from "../services.tsx/FetchRepos";

const RepoCard = ({ repo, setRepos }) => {
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editedName, setEditedName] = useState(repo.name);
    const [editedDescription, setEditedDescription] = useState(repo.description);
    const toast = useToast();

    // Delete repository handlers
    const handleDeleteRepo = async () => {
        closeConfirmationModal();
        setIsDeleting(true);
        try {
            await deleteRepo(repo.full_name);
            setRepos((prevRepos) => {
                // Filter out the deleted repository from the previous list
                return prevRepos.filter((r) => r.full_name !== repo.full_name);
            });
            toast({
                title: "Repository Deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error deleting repository:", error);
            toast({
                title: "An error occurred",
                description: "Failed to delete repository",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    // Delete repository confirmation Modal toggler
    const openConfirmationModal = () => {
        setIsConfirmationModalOpen(true);
    };

    // Delete repository confirmation Modal toggler
    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    // Edit repository button handler
    const handleEditRepo = () => {
        setIsEditModalOpen(true); // Open the edit modal
        setEditedName(repo.name); // Set the initial name in the edit modal
        setEditedDescription(repo.description); // Set the initial description in the edit modal
    };

    // Edit repository modal close handler
    const closeEditModal = () => {
        setIsEditModalOpen(false); // Close the edit modal
    };

    // Edit repository submit handler
    const handleEditSubmit = async () => {
        // You can perform validation here if needed
        try {
            // Call the editRepo function with editedName and editedDescription
            await editRepo(repo.full_name, editedName, editedDescription);
            // Update the repository list after editing
            setRepos((prevRepos) => {
                return prevRepos.map((r) => {
                    // Find the edited repository and update its name and description
                    if (r.full_name === repo.full_name) {
                        return { ...r, name: editedName, description: editedDescription };
                    }
                    return r;
                });
            });
            // Show success toast
            toast({
                title: "Repository Updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Close the edit modal
            setIsEditModalOpen(false);
        } catch (error) {
            // Show error toast if editing fails
            toast({
                title: "Error",
                description: "Failed to update repository",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">
                {repo.name}
            </Text>
            <Text fontSize="md" mt={2}>
                {repo.description}
            </Text>
            <Flex mt={2}>
                <Badge variant="outline" colorScheme="green" mr={2}>
                    Stars: {repo.stargazers_count}
                </Badge>
                <Badge variant="outline" colorScheme="blue">
                    Forks: {repo.forks}
                </Badge>
            </Flex>
            <Flex justify="flex-end" mt={4}>
                <Link href={{ pathname: "/routes/repodetails", query: { fullName: repo.full_name } }}>
                    <Button colorScheme="teal" size="sm" mr={2}>
                        View
                    </Button>
                </Link>
                <Button colorScheme="blue" size="sm" mr={2} onClick={handleEditRepo}>
                    Edit
                </Button>
                <Button colorScheme="red" size="sm" onClick={openConfirmationModal}>
                    {isDeleting ? <Spinner size="sm" color="white" /> : "Delete"}
                </Button>
            </Flex>

            {/* Confirmation Modal */}
            <Modal isOpen={isConfirmationModalOpen} onClose={closeConfirmationModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this repository?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={handleDeleteRepo}>Yes, Delete</Button>
                        <Button variant="ghost" onClick={closeConfirmationModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Edit Repository Modal */}
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Repository</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleEditSubmit}>Save Changes</Button>
                        <Button variant="ghost" onClick={closeEditModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default RepoCard;
