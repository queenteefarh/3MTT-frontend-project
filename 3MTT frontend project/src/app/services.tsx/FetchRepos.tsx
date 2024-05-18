import axios from "axios";
import { Repo } from "../types/repo";

// Get GitHub access token from environment variables
const authorization: string | undefined = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

// GitHub API base URL
const gitHubUrl: string = "https://api.github.com";

// Headers for GitHub API requests
const headers = {
  Authorization: `Bearer ${authorization}`,
  accept: "application/vnd.github.v3+json",
};

// Function to fetch all repositories
export const fetchRepos = async (): Promise<Repo[]> => {
  try {
    const response = await axios.get(`${gitHubUrl}/user/repos`, {
      headers: headers,
      params: {
        sort: "created", // Sort by creation date
        direction: "desc", // Sort in descending order (latest first)
      },
    });
    return response.data;
  } catch (error) {
    // Throw an error if fetching repositories fails
    throw new Error("Failed to fetch repositories");
  }
};

// Function to fetch a repository by its full name
export const fetchRepoById = async (fullName: string): Promise<Repo> => {
  try {
    const response = await axios.get(`${gitHubUrl}/repos/${fullName}`, { headers });
    return response.data;
  } catch (error) {
    // Throw the error if fetching the repository fails
    throw error;
  }
};

// Function to delete a repository by its full name
export const deleteRepo = async (fullName: string) => {
  try {
    // Send a DELETE request to the repository endpoint
    const response = await axios.delete(`${gitHubUrl}/repos/${fullName}`, { headers });
    // If successful, return the response data
    return response.data;
  } catch (error) {
    // If an error occurs, throw it
    throw error;
  }
};

// Function to create a new repository
export const createRepo = async (repoName: string, description: string): Promise<Repo> => {
  try {
    const response = await axios.post(`${gitHubUrl}/user/repos`, {
      name: repoName,
      description: description,
    }, { headers });
    return response.data;
  } catch (error) {
    // Throw an error if creating the repository fails
    throw error;
  }
};

// Function to edit a repository's name and description
export const editRepo = async ( fullName: string, repoName: string, description: string): Promise<Repo> => {
  try {
    const response = await axios.patch(`${gitHubUrl}/repos/${fullName}`, {
      name: repoName,
      description: description,
    }, { headers });
    return response.data;
  } catch (error) {
    // Throw an error if editing the repository fails
    throw error;
  }
};
