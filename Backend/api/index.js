import express from 'express';
const app = express();

app.use(express.json()); // Middleware to parse JSON data

// In-memory storage for user details
const users = [];

app.get("/register", (req, res) => {
    res.send("GET: Register Page");
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User Account already exists." });
  }

  // Add new user to the in-memory array
  users.push({ username, password });
  res.status(201).json({ message: "User registered successfully!" });
});

app.get("/login", (req, res) => {
    res.send("GET: Login Page");
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if user exists and password matches
  const user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid username or password." });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));