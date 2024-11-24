# Flight Booking System

This project is a **Flight Booking System** that allows users to search for flights, view available options, and make bookings. It includes a **frontend** built with React, a **backend** built with Node.js and Express, and a **PostgreSQL database** managed with Sequelize. The project is fully containerized using **Docker** and includes a CI/CD pipeline for testing and deployment.

---

## **Features**
### **Frontend**
- Search for flights by origin and destination.
- Display flight details, including price.
- Book a flight by providing passenger details.
- Built with **React**.

### **Backend**
- REST API for managing flights and bookings.
- Integration with PostgreSQL for data persistence.
- Validation and error handling for API endpoints.
- Built with **Node.js**, **Express**, and **Sequelize**.

### **Database**
- PostgreSQL database to store flights and bookings.
- Tables for `Flights` and `Bookings`.

### **CI/CD Pipeline**
- Automated testing with **Jest**.
- Continuous Integration/Continuous Deployment (CI/CD) using **GitHub Actions**.
- Dockerized setup for easy deployment and testing.

---

## **Technologies Used**
- **Frontend**: React, Axios
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest

---

## **Setup Instructions**

### **1. Prerequisites**
- Install [Node.js](https://nodejs.org/).
- Install [Docker](https://www.docker.com/).
- Install [npm](https://www.npmjs.com/) (comes with Node.js).

### **2. Clone the Repository**
```bash
git clone https://github.com/<your-username>/FlightBookingProject.git
cd FlightBookingProject
```bash
### **3. Run Locally**
**Frontend**
Navigate to the frontend folder:
cd frontend
**Install dependencies:**
npm install
Start the development server:
bash
Copy code
npm start
Backend
Navigate to the backend folder:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Set up environment variables: Create a .env file with the following content:
makefile
Copy code
DATABASE_HOST=localhost
DATABASE_USER=admin
DATABASE_PASSWORD=secret
DATABASE_NAME=flightdb
DATABASE_PORT=5432
Start the server:
bash
Copy code
npm start
Database
Ensure PostgreSQL is running on your system.
Create a database named flightdb.
4. Run with Docker
Build and run all services:
bash
Copy code
docker-compose up --build
Access the services:
Frontend: http://localhost:3000
Backend: http://localhost:5001
Testing
Run backend tests:
bash
Copy code
cd backend
npm test
Run frontend build tests:
bash
Copy code
cd frontend
npm run build
CI/CD
The CI/CD pipeline is configured in .github/workflows/ci-cd.yml:

Build and Test:
Installs dependencies for frontend and backend.
Runs backend tests using Jest.
Builds the frontend using React.
Deployment:
Uses Docker Compose to deploy services.
