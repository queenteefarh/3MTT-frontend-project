"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchRepoById } from "../../services.tsx/FetchRepos";
import { Repo } from "../../types/repo";
import RepoDetails from "../../components/RepoDetails";

const RepoPage = () => {
  // Get search parameters from the URL
  const searchParams = useSearchParams();
  // Extract the fullName parameter from the search parameters
  const fullName: string | null | undefined = searchParams?.get("fullName");
  // State to store repository datAAa
  const [repo, setRepo] = useState<Repo | null>(null);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage error messages
  const [error, setError] = useState<string>("");

  // Next.js router instance
  const router = useRouter();
  
  // Function to fetch repository data by its full name
  const fetchData = async (fullName: string | undefined | null) => {
    if (fullName) {
      setLoading(true);
      try {
        // Fetch repository data using the API
        const repoData = await fetchRepoById(fullName);
        // Set the retrieved repository data to the state
        setRepo(repoData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Set error message if fetching data fails
        setError(error.message);
      }
    }
  };

  // Effect to fetch repository data when the fullName parameter changes
  useEffect(() => {
    fetchData(fullName);
  }, [fullName]);

  return (
    <>
      {/* Display loading message if data is being fetched */}
      {loading && <p>Loading...</p>}
      {/* Display error message if an error occurs */}
      {error && <p>{error}</p>}
      
      {/* Main content */}
      <Box>
        {/* Heading */}
        <Heading as="h1" size="xl" mb={4}>
          Repo Details
        </Heading>
        
        {/* Breadcrumbs */}
        <Breadcrumb mb={4}>
          <BreadcrumbItem>
            {/* Link to navigate back to the home page */}
            <BreadcrumbLink onClick={() => router.push("/")} href="#">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* Current page link */}
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">
              {/* Display repository name if available */}
              {repo?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Display repository details if available */}
        {repo && <RepoDetails repo={repo} />}
      </Box>
    </>
  );
};

export default RepoPage;
