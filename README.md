# Multi-Tenant E-Commerce API

## Overview

This is a **Node.js-based multi-tenant e-commerce API** that allows vendors to manage their products and orders. It includes features such as vendor authentication, product and order management, and paginated listing.

---

## Features

- Vendor registration and login.
- Secure authentication using JWT.
- Product management (CRUD operations).
- Order management (view, create, update status).
- Pagination for product and order listings.
- RESTful API structure.

---

## Prerequisites

Before running the application, ensure you have the following installed:
- **Node.js** (>= 16.x)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd multi-tenant-ecommerce-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and configure the following:
```plaintext
MONGO_URI=<Your MongoDB connection string>
MONGO_TEST_URI=<Your test MongoDB connection string>
JWT_SECRET=<Your JWT secret>
PORT=5000
```

### 4. Run the Application
Start the development server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 5. Run Tests
Run the automated tests:
```bash
npm test
```

---

## Application Structure

The project is structured as follows:
```
multi-tenant-ecommerce-api/
├── controllers/        # Business logic for API endpoints
├── models/             # Mongoose models for MongoDB
├── routes/             # Express routes for vendors, products, and orders
├── tests/              # Jest test cases for API endpoints
├── config/             # Configuration files (e.g., database connection)
├── app.js              # Entry point for the application
├── server.js           # Server configuration
├── package.json        # Node.js project metadata and dependencies
├── .env.example        # Example environment variables
├── README.md           # Project documentation
```

---

## API Endpoints

### **Vendor Endpoints**
- **Register a Vendor**  
  `POST /api/vendors/register`  
  Example Request Body:
  ```json
  {
    "name": "Test Vendor",
    "email": "testvendor@example.com",
    "password": "password123"
  }
  ```

- **Login as a Vendor**  
  `POST /api/vendors/login`  
  Example Request Body:
  ```json
  {
    "email": "testvendor@example.com",
    "password": "password123"
  }
  ```

### **Product Endpoints**
- **Add a Product**  
  `POST /api/products`  
  Requires authentication (JWT in the `Authorization` header).  
  Example Request Body:
  ```json
  {
    "name": "Test Product",
    "price": 100,
    "stock": 10
  }
  ```

- **List Products with Pagination**  
  `GET /api/products?page=1&limit=10`  
  Requires authentication.

- **Update a Product**  
  `PUT /api/products/:id`  
  Requires authentication. Example Request Body:
  ```json
  {
    "price": 120,
    "stock": 15
  }
  ```

- **Delete a Product**  
  `DELETE /api/products/:id`  
  Requires authentication.

### **Order Endpoints**

- **Get Orders**  
  `GET /api/orders`  
  Retrieves all orders for the authenticated vendor.

- **Mark an Order as Shipped**  
  `PUT /api/orders/:id`  
  Marks a specific order as shipped. Requires authentication.

- **Create an Order**  
  `POST /api/orders`  
  Allows a customer to create a new order.  
  Example Request Body:
  ```json
  {
    "product": "<product-id>",
    "quantity": 2
  }
  ```

---

## Testing the API with cURL

You can use the Postman collection to  test the API endpoints.


---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Authentication mechanism.
- **Jest & Supertest**: Testing framework.

---

## Contact

For any inquiries, feel free to reach out at:  
Email: **angadkumar70676@gmail.com**  
GitHub: [GitHub Profile](https://github.com/Angadkumar07)

