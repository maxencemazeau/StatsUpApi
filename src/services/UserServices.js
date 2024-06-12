require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Adjust the path as necessary

const JWT_SECRET = process.env.JWT_SECRET;

const userLoginService = async (email, password) => {
    const query = await db.query('SELECT * FROM User WHERE email = ?', [email]);
    const user = query[0];
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    } else {
        return null;
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
