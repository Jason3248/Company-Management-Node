const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware'); 

//Get all employees(not used). 
router.get('/', authMiddleware, employeeController.getAllEmployees);

//Fetching users and for filters 
router.get('/query', authMiddleware, employeeController.getQueryEmployees);

// Fetching employee by id
router.get('/:id', authMiddleware, employeeController.getEmployeeById);

//Create employee
router.post('/', authMiddleware, employeeController.createEmployee);

//Edit employee
router.put('/:id', authMiddleware, employeeController.updateEmployee);

//Delete employee
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

//Fetching managers(employee.position === 'Manager') of a particular when selected a department in employee creation dropdown form.
router.post('/getDeptManagers', employeeController.getManagersByDepartment);

module.exports = router;
