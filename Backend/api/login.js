import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = []; // Temporary in-memory storage

app.post("/login", (req, res) => {
  const { username: eUsername, password: ePassword } = req.body;

  // Check if user exists
  const existingUser = users.find((user) => user.username === eUsername);

  if (existingUser) {
    const passwordMatch = existingUser.password === ePassword;
    if (passwordMatch) {
      return res
        .status(200)
        .json({ message: `You're all set, ${eUsername}! Have a productive day!` });
    } else {
      return res.status(401).json({ message: "Password Mismatch" });
    }
  } else {
    return res
      .status(404)
      .json({ message: "User account doesn't exist. Please register to Login." });
  }
});

export default app;