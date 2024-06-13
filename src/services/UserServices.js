const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Adjust the path as necessary
const JWT_SECRET = process.env.JWT_SECRET;

const userLoginService = async (email, password) => {
    try {
        // Query user from the database
        const query = await db.query('SELECT * FROM User WHERE email = ?', [email]);
        const user = query[0];

        // If user not found, return null
        if (!user) {
            console.log('User not found');
            return null;
        }
 
        // Log password and user's hashed password to debug
        console.log ('User Info:', user)
        console.log('Password:', password);
        console.log('User Password:', user.Password);
        console.log('User lastname:', user.LastName);

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.Password);

        // If passwords match, generate token and return user with token
        if (passwordMatch) {
            const token = jwt.sign({ id: user.UserID, email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = await db.query('INSERT INTO User (email, username, password) values (?, ?, ?)', [email, username, hashedPassword]);
    
    if (query.affectedRows > 0) {
        const user = { id: query.insertId, email, username };
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    } else {
        return null;
    }
};

module.exports = {
    userLoginService,
    getAllUsersService,
    userSignUpService
};
