const activityServices = require('../services/ActivityServices')

const userActivity = async(req, res)=>{
    const { id } = req.params
    const activity = await activityServices.ActivityById(id)
    res.send(activity)
}

const addActivity = async (req, res)=> {
    const { ActivityName,  GoalsStatut, ActivityTypeId, GoalsId, UserId} = req.body
    const addActivity = await activityServices.AddNewActivity(ActivityName, GoalsStatut, ActivityTypeId, GoalsId, UserId)
    if (addActivity){
        res.send("Activity successfully created")
    } else {
        res.send("Error while adding the new activity")
    }
}

module.exports = { userActivity, addActivity }