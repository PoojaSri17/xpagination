import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch data from API with error handling
  useEffect(() => {
    axios
      .get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        alert("Failed to fetch data");
        console.error("Error fetching data:", error);
      });
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(employeeData.length / itemsPerPage);

  // Get current employees for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employeeData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
