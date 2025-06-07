const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const PORT = 5000; //Server will run on port 5000 

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

connectDB();

app.listen(PORT,() => {
    console.log(`Server running on PORT ${PORT}`);
    
});

const departmentRoutes = require('./routes/departmentRoutes');
app.use('/departments', departmentRoutes);

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

const authRoutes = require('./routes/userRoutes');
app.use('/auth', authRoutes);