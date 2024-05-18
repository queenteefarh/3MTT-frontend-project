import React, {Suspense, useState } from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import RepoCard from "./RepoCard";
import { Repo } from "../types/repo";

const RepoTable = ({ data, columns, itemsPerPage, setRepos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  // Filtering data based on filter input
  const filteredData = data.filter((row) =>
    columns.some((column) =>
      String(row[column])
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  );

  // Calculating total pages for pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handling pagination button click
  const handleClick = (type) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (type === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (typeof type === "number") {
      setCurrentPage(type);
    }
  };

  // Calculating start and end index of data to be displayed on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slicing data based on pagination
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handling filter input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Input
        placeholder="Filter..."
        value={filter}
        onChange={handleFilterChange}
        mb={4}
      />
      <Stack spacing={4}>
        {currentData.map((repo:Repo, index:number) => (
          // Wrap RepoPage component with Suspense
          <Suspense key={index} fallback={<div>Loading Data...</div>}>
          <RepoCard repo={repo} setRepos={setRepos} />
        </Suspense>
        ))}
      </Stack>

      <Flex justify="center" mt={4}>
        <Button
          onClick={() => handleClick("prev")}
          disabled={currentPage === 1}
          mx={1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "solid" : "outline"}
            onClick={() => handleClick(page)}
            mx={1}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => handleClick("next")}
          disabled={currentPage === totalPages}
          mx={1}
        >
          Next
        </Button>
      </Flex>
    </>
  );
};

// PropTypes for type checking and documentation
RepoTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default RepoTable;
