const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];
// name: string, email: string, password: string


/**
 * TODO: 18/01/2025
 * Hashing, encryption: their use cases, and algorithms
 * cors
 * rate limiting
 */

class UsersController {
    createUser(req, res) {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 8)
        }
        users.push(newUser);
        //Genrate a signed jwt for the user to login
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: newUser,
        });
    }
}

module.exports = new UsersController();
