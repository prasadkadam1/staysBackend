// import dotenv from "dotenv";
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const { readDB, writeDB } = require("./utils/fileDb");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(dotenv);
app.use(express.json());

/* ------------------ GENERIC GET ROUTES ------------------ */
const collections = [
  "tents",
  "hotels",
  "homestays",
  "camps",
  "villas",
  "farmhouses",
  "cottages",
  "apartments",
  "treehouses",
  "users",
  "admin",
  "statistics",
  "bookmark",
  "cart",
  "bookNow",
  "bookingDetails",
  "registrations",
];

collections.forEach((col) => {
  app.get(`/${col}`, (req, res) => {
    const db = readDB();
    res.json(db[col] || []);
  });

  app.get(`/${col}/:id`, (req, res) => {
    const db = readDB();
    const item = (db[col] || []).find((i) => i.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ msg: "Not found" });
  });
});

/* ------------------ AUTH ------------------ */

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(
    (u) => u.email === email && u.password === password,
  );

  user ? res.json(user) : res.status(401).json({ msg: "Invalid credentials" });
});

// Admin login
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const admin = db.admin.find(
    (a) => a.email === email && a.password === password,
  );

  admin
    ? res.json(admin)
    : res.status(401).json({ msg: "Invalid credentials" });
});

/* ------------------ REGISTER USER ------------------ */
app.post("/users", (req, res) => {
  const db = readDB();
  const newUser = { id: uuid(), ...req.body };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

/* ------------------ BOOKMARK ------------------ */
app.post("/bookmark", (req, res) => {
  const db = readDB();
  const item = { id: uuid(), ...req.body };
  db.bookmark.push(item);
  writeDB(db);
  res.json(item);
});

app.delete("/bookmark/:id", (req, res) => {
  const db = readDB();
  db.bookmark = db.bookmark.filter((b) => b.id !== req.params.id);
  writeDB(db);
  res.json({ msg: "Bookmark removed" });
});

/* ------------------ CART ------------------ */
app.post("/cart", (req, res) => {
  const db = readDB();
  const item = { id: uuid(), ...req.body };
  db.cart.push(item);
  writeDB(db);
  res.json(item);
});

app.delete("/cart/:id", (req, res) => {
  const db = readDB();
  db.cart = db.cart.filter((c) => c.id !== req.params.id);
  writeDB(db);
  res.json({ msg: "Cart item removed" });
});

/* ------------------ BOOK NOW ------------------ */
app.post("/bookNow", (req, res) => {
  const db = readDB();
  const booking = { id: uuid(), bookings: req.body.bookings };
  db.bookNow.push(booking);
  writeDB(db);
  res.json(booking);
});

/* ------------------ FINAL BOOKING ------------------ */
app.post("/bookingDetails", (req, res) => {
  const db = readDB();
  const booking = { id: uuid(), ...req.body };
  db.bookingDetails.push(booking);
  writeDB(db);
  res.status(201).json(booking);
});

/* ------------------ DELETE ANY STAY (ADMIN) ------------------ */
app.delete("/:collection/:id", (req, res) => {
  const { collection, id } = req.params;
  const db = readDB();

  if (!db[collection]) {
    return res.status(400).json({ msg: "Invalid collection" });
  }

  db[collection] = db[collection].filter((item) => item.id != id);
  writeDB(db);
  res.json({ msg: "Deleted successfully" });
});

/* ------------------ SERVER ------------------ */
app.listen(PORT, () => {
  console.log(`🚀 Server running`);
});
