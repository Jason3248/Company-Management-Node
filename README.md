# Office Management System

##  Project Overview

This Office Management System allows users to:

- Manage departments (CRUD)
- Manage employees with features like:
  - Self-referencing manager
  - Department assignment
  - Dynamic country, state, and city selection
- Perform filtered search & server-side pagination
- Authenticate via login/register (JWT-based)
- Responsive UI with Tailwind CSS

### Tech Stack
- **Backend**: Node.js + Express.js (MVC Pattern)
- **Database**: MongoDB(Atlas) with Mongoose ODM
- **Frontend**: React.js with Tailwind CSS
- **External APIs**: CountriesNow API for location data

### Key Relationships
- **Employee → Department**: Many-to-One relationship
- **Employee → Supervisor**: Self-referencing relationship (An employees can be the manager of other employees)

## 📋 Installation & Setup Instructions

### 1. Clone the Repository
git clone https://github.com/Jason3248/Company-Management-Node.git . inside a folder.
 
### 2. Install Dependencies
# Install dependencies in root(monorepo)
npm install

### 3. Environment Configuration
Create a `.env` file in the backend folder:
Initialize the dummy environment variables from the .env.example file and cpoy them into .env
Assign Values to them, else kindly use the MONGO_URI in the .env.example file for direct connection establishment.

### 4. Start the Application

-Backend(Server start)
cd backend
node server.js

-Frontend(Client start)
 npm start(root)

### 5. Test API endpoints using the provided Postman collection

You can find the full Postman collection in the root of the project as: office_management_system_postman_collection.json
Import it into Postman to test all API endpoints including:
-Auth (Login/Register)
-Employee CRUD & Filtering
-Department CRUD


## 🖼 Screenshots

### Login/Register
![image](https://github.com/user-attachments/assets/7bf247d6-f256-4e1a-bb1c-4ed8f470a11f)

### Employee Management
![image](https://github.com/user-attachments/assets/8b03b768-398e-4b78-b5b9-1ccb0de33ee8)

### Create/Edit Employee Form
![image](https://github.com/user-attachments/assets/5ddea9ca-d49f-4900-bebb-8247534e6085)

### Department Management
![image](https://github.com/user-attachments/assets/1647c3ab-ad86-4b7c-b764-064463fbd16e)

### Create/Edit Department Form

![image](https://github.com/user-attachments/assets/b9341b4f-b42d-457a-b650-650c3bb866a0)

##  Author

Jason Dsouza
