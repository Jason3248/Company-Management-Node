import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function EmployeeList(){

    const [employees, setEmployees] = useState([]);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState('');
    const [position, setPosition] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
    Authorization: token
  }
}
  
    //fetching departments for filter dropdown
    const fetchDepartments = async() => {
        try {
            const result = await axios.get('http://localhost:5000/departments', config);
            setDepartments(result.data);
        
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }

    const fetchEmployees = async() => {
        try {
       const result = await axios.get('http://localhost:5000/employees/query', {
      headers: {
        Authorization: token
      },
      params: {
        search,
        department,
        position,
        page,
        limit: 5
      }
    });
            setEmployees(result.data.employees);
            setTotalPages(result.data.totalPages);

        } catch (error) {
            console.error('Error fetching Query Employees:', error);
        }
    }

    useEffect(() => {
        fetchDepartments();
        fetchEmployees();
        }, [search, department, page, position]);


const handleDelete = async (employeeId) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    await axios.delete(`http://localhost:5000/employees/${employeeId}`, config);
    toast.success('Employee deleted successfully!');
    fetchEmployees();
  } catch (error) {
    console.error("Error deleting Employee: ", error);
    toast.error('Failed to delete employee.');
  }
};


  return (
      <div>
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage your Employees</h2>
             <div className="mb-4">
                <button
                  onClick={() => navigate('/employees/create')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  + Add Employee
                </button>
              </div>
      </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by name/email"
            className="border px-3 py-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Position"
            className="border px-3 py-2 rounded"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Position</th>
              <th className="px-4 py-2 border">Department</th>
              <th className='px-4 py-2 border'>Name of Manager</th>
              <th className="px-4 py-2 border">Location</th>
              <th className='px-4 py-2 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{emp.name}</td>
                <td className="px-4 py-2 border">{emp.email}</td>
                <td className="px-4 py-2 border">{emp.position}</td>
                <td className="px-4 py-2 border">{emp.department?.name}</td>
                <td className='px-4 py-2 border'>{emp.manager?.name}</td>
                <td className="px-4 py-2 border">{emp.city}, {emp.state}, {emp.country}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/employees/edit/${emp._id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(emp._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Previous</button>

          <span className="text-sm">Page {page} of {totalPages}</span>

          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Next</button>
        </div>
      </div>
  );
}

export default EmployeeList;