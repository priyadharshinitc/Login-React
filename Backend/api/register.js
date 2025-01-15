import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = []; // Temporary in-memory storage

app.post("/register", (req, res) => {
  const { username: eUsername, password: ePassword } = req.body;

  // Check if user already exists
  const existingUser = users.find(
    (user) => user.username === eUsername && user.password === ePassword
  );
  
  if (existingUser) {
    return res.status(400).json({ message: "User Account already exists" });
  }

  // Register the new user
  users.push({ username: eUsername, password: ePassword });
  res.status(200).json({ message: "User Account registered successfully!" });
});

export default app;