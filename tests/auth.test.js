const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Import your Express app
const Vendor = require("../models/Vendor.model");
const connectDB = require("../config/db");


describe("Auth Endpoints", () => {
  let server;

  beforeAll(async () => {
    server = app.listen();
    await connectDB(process.env.MONGO_TEST_URI);
  });

  afterAll(async () => {
    await Vendor.deleteMany();
    await mongoose.disconnect(); 
    server.close();
  });
  

  describe("POST /api/vendors/register", () => {
    test("should register a new vendor successfully", async () => {
      const res = await request(app).post("/api/vendors/register").send({
        name: "Test Vendor",
        email: "testvendor@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "message",
        "Vendor registered successfully."
      );
      expect(res.body.vendor).toHaveProperty("name", "Test Vendor");
      expect(res.body.vendor).toHaveProperty("email", "testvendor@example.com");
    });

    test("should return error for duplicate email", async () => {
      const res = await request(app).post("/api/vendors/register").send({
        name: "Duplicate Vendor",
        email: "testvendor@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Email already exists.");
    });
  });

  describe("POST /api/vendors/login", () => {
    test("should login successfully with correct credentials", async () => {
      const res = await request(app).post("/api/vendors/login").send({
        email: "testvendor@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Login successful.");
      expect(res.body).toHaveProperty("token");
    });

    test("should return error for incorrect password", async () => {
      const res = await request(app).post("/api/vendors/login").send({
        email: "testvendor@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid credentials.");
    });

    test("should return error for non-existing email", async () => {
      const res = await request(app).post("/api/vendors/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Vendor not found.");
    });
  });
});
