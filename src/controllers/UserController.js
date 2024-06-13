const userServices = require('../services/UserServices');

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received:', email, password); // Log request data for debugging
    try {
        const user = await userServices.userLoginService(email, password);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(401).send({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error in userLogin:', error); // Log the error for debugging
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsersService();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const userSignUp = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await userServices.userSignUpService(email, username, password);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = { userLogin, getAllUsers, userSignUp };
