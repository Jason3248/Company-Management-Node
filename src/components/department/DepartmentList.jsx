import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function DepartmentList(){

    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
    Authorization: token
  }
}

    //Fetching all Departments 
    const fetchDepartments = async() => {
        try {
            const result = await axios.get('http://localhost:5000/departments', config);
            console.log(result.data);
            setDepartments(result.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleDelete = async(departmentId) => {
        if (!window.confirm("Are you sure you want to delete this Department?")) return;

      try {
        await axios.delete(`http://localhost:5000/departments/${departmentId}`, config);
        toast.success('Department deleted successfully!');
        fetchDepartments();
      } catch (error) {
        console.error("Error deleting Department: ", error);
        toast.error('Failed to delete Department.');
      }
    }


  return (
    <div>
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage your Departments</h2>
             <div className="mb-4">
                <button
                  onClick={() => navigate('/departments/create')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  + Add Department
                </button>
              </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{dept.name}</td>
              <td className="px-4 py-2 border">{dept.address}</td>
              <td className='px-4 py-2 border'>
              <button 
              type="button" onClick={() => navigate(`/departments/edit/${dept._id}`)}className="text-blue-500 hover:underline mr-3"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(dept._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default DepartmentList;