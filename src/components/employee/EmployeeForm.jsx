import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    manager: '',
    country: '',
    state: '',
    city: ''
  });
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
    Authorization: token
  }
}


  /*
    API call for fetching all countries and states
    GET: https://countriesnow.space/api/v0.1/countries/states
    result = {
  "error": false,
  "msg": "countries and states retrieved",
  "data": [
    {
      "name": "Afghanistan",
      "iso3": "AFG",
      "states": [
        {
          "name": "Badakhshan",
          "state_code": "BDS"
        },
        {
          "name": "Badghis",
          "state_code": "BDG"
        },....
  */ 
  useEffect(() => {
    axios.get('http://localhost:5000/departments', config).then(res => setDepartments(res.data));
    axios.get('https://countriesnow.space/api/v0.1/countries/states').then(res => setCountries(res.data.data));

    if (id) {
      axios.get(`http://localhost:5000/employees/${id}`, config).then(res => setEmployee(res.data));
    }
  }, [id]);

  //for fetching respective department managers for the dropdown based on department selection in the form.
  useEffect(() => {
    if (employee.department) {
      axios.post('http://localhost:5000/employees/getDeptManagers', 
      { departmentId: employee.department, employeeId: employee._id}, config)
        .then(res => setManagers(res.data));
    }
  }, [employee.department]);

  useEffect(() => {
    if (employee.country) {
        const employeeCountry = countries.filter(c => c.name == employee.country);
        console.log(employeeCountry[0]);
        
        setStates(employeeCountry[0].states);
    }
  }, [employee.country]);

  //fetching cities based on country and state selection
  useEffect(() => {
    if (employee.country && employee.state) {
      axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: employee.country,
        state: employee.state
      }).then(res => setCities(res.data.data));
    }
  }, [employee.state]);

  const handleChange = e => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/employees/${id}`, employee, config);
      } else {
        await axios.post('http://localhost:5000/employees', employee, config);
      }
      toast.success(`Employee ${id ? 'updated' : 'created'} successfully!`);
      navigate('/employees');

    } catch (error) {
    toast.error('Error saving employee');

    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{id ? 'Edit' : 'Create'} Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
        <input className="w-full p-2 border" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
        <input className="w-full p-2 border" name="position" value={employee.position} onChange={handleChange} placeholder="Job Title" />

        <select className="w-full p-2 border" name="department" value={employee.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>

        <select className="w-full p-2 border" name="manager" value={employee.manager} onChange={handleChange}
        disabled={employee.position.toLowerCase() === 'manager'}>
          <option value="">Select Manager</option>
          {managers.map(manager => 
          <option key={manager._id} value={manager._id}>{manager.name}
          </option>)}
        </select>

        <select className="w-full p-2 border" name="country" value={employee.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>

        <select className="w-full p-2 border" name="state" value={employee.state} onChange={handleChange}>
          <option value="">Select State</option>
          {states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>

        <select className="w-full p-2 border" name="city" value={employee.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{id ? 'Update' : 'Create'} Employee</button>
      </form>
    </div>
  );
}

export default EmployeeForm;