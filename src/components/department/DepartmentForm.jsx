import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function DepartmentForm() {
  const [department, setDepartment] = useState({ name: '', address: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
    Authorization: token
  }
}

  //Fetching all departments (for edit)
  const fetchDepartments = async() => {
       try {
     if (id) {
      const result = await axios.get(`http://localhost:5000/departments/${id}`, config);
      setDepartment(result.data);
    }
    } catch (error) {
        console.log("Error fetching department:", error);
        
    }
  }

  useEffect(() => {
    fetchDepartments();
    
  }, [id]);

  const handleChange = e => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/departments/${id}`, department, config);
      } else {
        await axios.post('http://localhost:5000/departments', department, config);
      }
      toast.success(`Department ${id ? 'updated' : 'created'} successfully!`);
      navigate('/departments');
    } catch (error) {
      alert('Error saving department.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit' : 'Create'} Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Department Name</label>
          <input
            type="text"
            name="name"
            value={department.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={department.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default DepartmentForm;
