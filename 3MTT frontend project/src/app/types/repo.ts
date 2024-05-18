/**
 * Interface representing a GitHub repository.
 */
export interface Repo {
        id: number;                       // Unique identifier for the repository
        name: string;                     // Name of the repository
        description: string;              // Description of the repository
        html_url: string;                 // URL to view the repository on GitHub
        stargazers_count: number;         // Number of stars (likes) the repository has received
        forks_count: number;              // Number of forks (copies) of the repository
        language: string;                 // Primary programming language of the repository
        full_name: string;                // Full name of the repository (owner/repoName)
        license: { name: string } | null; // License information of the repository, or null if not specified
        updated_at: string | number | Date; // Date when the repository was last updated
        created_at: string | number | Date; // Date when the repository was created
        default_branch: string;           // Name of the default branch of the repository
        readmeContent: string | null;     // Content of the README file, or null if not available
        star: number | null;              // User's star rating for the repository, or null if not rated
      }
      