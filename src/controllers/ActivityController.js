const activityServices = require('../services/ActivityServices')

const userActivity = async(req, res)=>{
    const { id } = req.params
    const activity = await activityServices.ActivityById(id)
    res.send(activity)
}

module.exports = { userActivity }