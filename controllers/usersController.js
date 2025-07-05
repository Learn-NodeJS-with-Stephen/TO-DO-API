const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// name: string, email: string, password: string


/**
 * TODO: 18/01/2025
 * Hashing, encryption: their use cases, and algorithms
 * cors
 * rate limiting
 */

class UsersController {
    async createUser(req, res) {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        if(existingUser && existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = bcrypt.hashSync(password, 8)
        const [result] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        const [newUser] = await db.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
        const userData = {
            id: newUser[0].id,
            name: newUser[0].name,
            email: newUser[0].email,
        }
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: userData,
        });
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if( !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }
            const [result] = await db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);

            if(!result || result.length < 1) {
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                });
            }
            if(!bcrypt.compareSync(password, result[0].password)) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }
            // Generate a signed jwt for the user to login
            const payload = { 
                id: result[0].id, 
                email: result[0].email 
            }
            const { password: _, ...userData } = result[0];
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
            const data = {
                user: userData,
                token: token
            }
            //TODO: Crate centralized response handler
            res.json({
                success: true,
                message: "Login successful",
                data,
            });
        } catch (error) {
            res.status(500).json({ error: "Error occurred", details: error.message });
          }
       
    }

    async getUserTasks(req, res) {
        // Check if user is authenticated
        const authorization = req.header("authorization");
        if(!authorization) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        // Verify the token
        const token = authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifiedToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const userId = verifiedToken.id;
        const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id =?", [userId]);
        res.json({
            success: true,
            message: "User tasks",
            data: tasks,
        });
    }


}

//TODO: 22/2/2025: Implement Login and sign up pages on the frontend

//TODO: 08/07/2025: Implement task management with token authorization and middleware handling.
// -Middlewares
// -Task management
// -Task creation
// -Task update
// -Task deletion
// -Task listing
// -Task details

module.exports = new UsersController();
