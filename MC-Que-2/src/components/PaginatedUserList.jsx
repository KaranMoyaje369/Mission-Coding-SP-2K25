import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { Button } from "@mui/material";

const PaginatedUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const maxVisiblePages = 3; // Only show 3 page numbers at a time

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Show only 3 page numbers dynamically
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // Navigation functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full container mx-auto">
        <h1 className="text-3xl font-bold text-center my-4 text-orange-500">
          User List
        </h1>
        {loading ? (
          <h2 className="text-2xl font-semibold text-center my-4 text-sky-400">
            Loading...
          </h2>
        ) : (
          <>
            <UserCard currentUsers={currentUsers} />

            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row md:justify-center items-center mt-6 gap-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              <div className="flex !space-x-2">
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    variant={number === currentPage ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </Button>
                ))}
              </div>

              <Button
                variant="outlined"
                color="primary"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaginatedUserList;
