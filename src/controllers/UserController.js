const userServices = require('../services/UserServices')


const userLogin = async (req, res) => {
    const {email, password} = req.query
    const user = await userServices.userLoginService(email, password)
    res.send(user)
}

module.exports = { userLogin }