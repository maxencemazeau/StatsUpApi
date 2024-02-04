const db = require('../db');

const userLoginService = async(email, password) => {
    const query = await db.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password])
    return query[0]
};


module.exports = { userLoginService }