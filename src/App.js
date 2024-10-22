import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]); // Store employee data
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(10); // Define number of rows per page
  const [error, setError] = useState(null); // Error handling

  // Fetch employee data from API on initial render
  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch(() => {
        setError('failed to fetch data');
      });
  }, []);

  // Calculate indices for pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentEmployees = employees.slice(firstIndex, lastIndex);

  // Handle Previous button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next button click
  const handleNext = () => {
    if (currentPage < Math.ceil(employees.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      {error ? (
        <div>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
