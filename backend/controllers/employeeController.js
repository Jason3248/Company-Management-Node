const Employee = require('../models/Employee');
const Department = require('../models/Department');

exports.createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    console.log("Create Manager:", employeeData);
    
    const existingEmail = await Employee.findOne({email: employeeData.email});
    if(existingEmail) return res.status(400).json({ message: 'An employee with this email already exists. '});

    //Since manager not being selected will set an empty string
    if(employeeData.manager == ''){
      delete employeeData.manager;
    }

    const newEmployee = new Employee(employeeData);
    await newEmployee.save();

    res.status(201).json({message: 'Employee Created Successfully.'});
  } catch (error) {
    console.error("Create employee error:", error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updateData = req.body;

    const existingEmployee = await Employee.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Update Employee error:", error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};


exports.getManagersByDepartment = async (req, res) => {
  try {
    const { departmentId, employeeId } = req.body;

    const query = {
        department: departmentId,
        position: 'Manager'
    }

    if (employeeId) {
      query._id = { $ne: employeeId };
    }

    const managers = await Employee.find(query).select('name email position'); 

    res.json(managers);
  } catch (error) {
    console.error("Manager fetch error", error);
    res.status(500).json({ error: 'Failed to fetch managers.' });
  }
};


exports.getAllEmployees = async(req, res, next) => {
    try {
        const employees = await Employee.find().populate('department manager');
        res.json(employees);
    } catch (error) {
        console.error("Fetch employees error", error);
        res.status(500).json({ error: 'Failed to fetch Departments.' });
    }
}


exports.getEmployeeById = async(req, res, next) => {
    try {
        const employeeId = req.params.id;

        const employee = await Employee.findById(employeeId).populate('department manager');
        if(!employee) return res.status(400).json({ error: 'Employee not found'});
        res.json(employee);

    } catch (error) {
        console.error("Employee fetch error:", error)
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
}

exports.deleteEmployee = async(req, res, next) => {
    try {
        const employeeId = req.params.id;

        /*
        Check for whether employee being deleted is a manager so that the manager field(id of manager employee)
        of other employees referring to this manager can be unassigned.
        */ 
        
        isManager = false;
        const fetchedEmployee = await Employee.findById(employeeId);
        if(fetchedEmployee.position.toLowerCase() === 'manager') isManager = true;


        const deleted = await Employee.findByIdAndDelete(employeeId);
        if(!deleted) return res.status(404).json({error: 'Employee not found'});

        //unassign manager references of employees to the deleted manager(employee)
        if(isManager){
          await Employee.updateMany(
            { manager: employeeId},
            { $set: { manager: null }}
          )
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error("Delete employee error: ", error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
}


exports.getQueryEmployees = async(req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '', department, position} = req.query;
        console.log(req.query);

        const query = {};
        if(search){
            query.$or = [
                {name: {$regex: search, $options: 'i'}},
                {email: {$regex: search, $options: 'i'}}
            ]
        }

        if(department) query.department = department;

        if(position) {
          query.position = {$regex: position, $options: 'i'};
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const totalDocuments = await Employee.countDocuments(query);

        const result = await Employee.find(query)
        .populate('department', 'name')
        .populate('manager', 'name')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({name: 1});

        res.json({
            totalDocuments,
            page: parseInt(page),
            totalPages: Math.ceil(totalDocuments / limit),
            employees: result
        });
    } catch (error) {
            console.error("Querying employees error: ", error);
            res.status(500).json({ error: 'Failed to fetch employees' });
    }
}




