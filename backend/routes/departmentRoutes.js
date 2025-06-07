const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middlewares/authMiddleware'); 

//Get Departments
router.get('/', authMiddleware, departmentController.getDepartments);

//Create a department
router.post('/', authMiddleware, departmentController.createDepartment);

//Update a department
router.put('/:id', authMiddleware, departmentController.updateDepartment);

//Delete a department
router.delete('/:id', authMiddleware, departmentController.deleteDepartment);

module.exports = router;
