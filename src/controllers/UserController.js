const userServices = require('../services/UserServices')


const userLogin = async (req, res) => {
    const {email, password} = req.query
    const user = await userServices.userLoginService(email, password)
    res.send(user)
}

const getAllUsers = async (req, res) => {
    const users = await userServices.getAllUsersService()
    res.send(users)
}


module.exports = { userLogin, getAllUsers }