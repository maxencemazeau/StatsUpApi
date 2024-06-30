require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Adjust the path as necessary
const { error } = require('console');
const JWT_SECRET = process.env.JWT_SECRET;

const userLoginService = async (email, password) => {
    try {
        // Query user from the database
        const query = await db.query('SELECT UserID ,Email, Password FROM User WHERE email = ?', [email]);
        const user = query[0];

        // If user not found, return null
        if (!user) {
            console.log('User not found');
            return null;
        }
        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(password, user[0].Password);

        // If passwords match, generate token and return user with token
        if (passwordMatch) {
            const token = jwt.sign({ id: user.UserID, email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
            console.log(user)
            return { user, token };
        } else {
            return null; // Incorrect password case
        }
    } catch (error) {
        throw error; // Propagate any database or bcrypt errors
    }
};



const getAllUsersService = async () => {
    const query = await db.query('SELECT * FROM User');
    return query;
};

const userSignUpService = async (email, username, password) => {
    try {
        // Check if email already exists
        const existingUserQuery = await db.query('SELECT Email FROM User WHERE email = ?', [email]);
        const existingUser = existingUserQuery[0]; // Extract the first row of results

        if (existingUser && existingUser.length > 0) {
            // Email already exists
            return { error: 'Email already in use' };

            } else {
            // Check if username already exists
            const existingUsernameQuery = await db.query('SELECT Username FROM User WHERE username = ?', [username]);
            const existingUsername = existingUsernameQuery[0]; // Extract the first row of results

            if (existingUsername && existingUsername.length > 0) {
                // Username already exists
                return { error: 'Username already in use' };
            }
        
         }
    



        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const query = await db.query('INSERT INTO User (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword]);

        // Check if the user was successfully created
        if (query && query.affectedRows > 0) {
            const user = { id: query.insertId, email, username };
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return { user, token };
        } 

    } catch (error) {
        console.error('Error in userSignUpService:', error);
        return { error: 'An unexpected error occurred' }; // Provide a generic error message
    }
};

module.exports = {
    userLoginService,
    getAllUsersService,
    userSignUpService
};
