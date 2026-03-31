const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DATA (TEMP STORAGE) ================= */

let medicines = [];
let users = [];
let orders = [];

/* ================= USER MODULE ================= */

// Register
app.post("/register", (req, res) => {
  const { name, email } = req.body;
  users.push({ name, email });
  res.send("User Registered");
});

// Login
app.post("/login", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);

  if (user) res.send("Login Success");
  else res.status(400).send("User Not Found");
});

/* ================= PHARMACY MODULE ================= */

// Add Medicine
app.post("/addMedicine", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).send("Missing Data");
  }

  medicines.push({
    name,
    price,
    quantity: 10,
    pharmacyId: 1,
  });

  res.send("Medicine Added");
});

// Get Medicines
app.get("/medicines", (req, res) => {
  res.json(medicines);
});

/* ================= ADMIN MODULE ================= */

// View all users
app.get("/users", (req, res) => {
  res.json(users);
});

// View all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

/* ================= DELIVERY MODULE ================= */

// Dummy shortest path (Dijkstra concept)
app.get("/shortest-path", (req, res) => {
  res.send("Shortest path calculated using Dijkstra Algorithm 🚀");
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
