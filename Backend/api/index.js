import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

module.exports = app.get("/", function(req, res) {
    res.send("Ready to serve!");
});

module.exports = app.post("/", function(req, res) {
    res.send("Ready to serve!");
});

module.exports = app.post("/login", function(req, res) {
    const {username: eUsername, password: ePassword} = req.body;
    
    // Check if user already exists
    let existingUser = users.find((user) => user.username === eUsername);
    if(existingUser) {
        let passwordMatch = (existingUser.password === ePassword) ? true : false;
        if(passwordMatch) {
            return res.status(200).json({message: `You're all set, ${eUsername}! Have a productive day!`});
        } else {
            return res.status(401).json({message: "Password Mismatch"});
        }
    } else {
        return res.status(404).json({message: "User account doesn't exist. Please register to Login."});
    }
});

module.exports = app.post("/register", function(req, res) {
    const {username: eUsername, password: ePassword} = req.body;
    
    // Check if user already exists
    let existingUser = users.find((user) => user.username === eUsername && user.password === ePassword);
    if(existingUser) {
        return res.status(400).json({message: "User Account already exists"});
    }

    // Register the new user
    users.push({username: eUsername, password: ePassword});
    res.status(200).json({message: "User Account registered successfully!"});
});

module.exports = app.listen("5000", function() {
    console.log("Server started...");
});