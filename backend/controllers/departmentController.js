const Department = require('../models/Department');
const Employee = require('../models/Employee');

exports.createDepartment = async(req, res, next) =>{
    try {
       const {name, address} = req.body;
       console.log("name", name, "addr: ", address);
       
        //A check for department existing since the departnemt names should be unique
        const existingDepartment = await Department.findOne({ name });
        if(existingDepartment) return res.status(400).json({ message: 'A Department with this name already exists.'});


        //Creation of a new department

        const newDepartment = new Department({ name, address});
        await newDepartment.save();

        res.status(201).json({message: 'Department created successfully.'})

    } catch (error) {
        console.error("Department creation error: ", error);
        res.status(500).json({ error: 'Failed to create department' });
    }
}

exports.getDepartments = async(req, res, next) => {
    try {
        console.log("req received");
        //fetch all departments
        const departments = await Department.find();
        res.json(departments);

  } catch (error) {
        console.error("Depertments fetch error: ", error);
        res.status(500).json({ error: 'Failed to fetch departments' });
  }
}


exports.getDepartmentById = async(req, res, next) => {
    try {
        //fetching department by passing id as parameter
        const departmentId = req.params.id;
        const department = await Department.findById(departmentId);

        if (!department) return res.status(404).json({ error: 'Department not found' });

        res.json(department);

  }  catch (error) {
        console.error("Error fetching department by id: ", error)
        res.status(500).json({ error: 'Failed to fetch department' });
  }
}


exports.updateDepartment = async (req, res) => {
  try {
    //updating department by passing id as parameter
    const { name, address } = req.body;
    const departmentId = req.params.id;

    const updated = await Department.findByIdAndUpdate(
      departmentId,
      { name, address },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json(updated);

  } catch (error) {
    console.error("Error updating department: ", error);
    res.status(500).json({ error: 'Failed to update department' });
  }
};


exports.deleteDepartment = async (req, res) => {
  try {
    //deleting department by passing id as parameter
    const departmentId = req.params.id;

    const deleted = await Department.findByIdAndDelete(departmentId);

    if (!deleted) {
      return res.status(404).json({ error: 'Department not found' });
    }

    /*
     Setting department to null for all employees referencing the deleted department 
     instead of deletion of employee due to cascading.
    */
    await Employee.updateMany(
      { department: departmentId },
      { $set: { department: null } }
    );

    res.status(200).json({ message: 'Department deleted successfully, employees unassigned.' });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: 'Failed to delete department' });
  }
};

