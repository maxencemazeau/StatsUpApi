const activityServices = require('../services/ActivityServices')

const userActivity = async (req, res) => {
    let noMoreData = false;
    let limit = 5
    let activity = []
    const { id, offset } = req.query
    const availableRows = await activityServices.rowsAfterOffset(id)
    const lastAvailableRow = availableRows[0].lastAvailableRows - offset

    if (lastAvailableRow < limit && lastAvailableRow >= 0) {
        limit = lastAvailableRow
        noMoreData = true
    }
    if(lastAvailableRow > 0){
        const offsetValue = parseInt(offset);
        const limitValue = parseInt(limit)
         activity = await activityServices.ActivityById(id, limitValue, offsetValue)
    } else {
        noMoreData = true
    }

    res.send({ activity, noMoreData })
}

const addActivity = async (req, res) => {
    const { ActivityName, GoalsStatut, ActivityTypeId, GoalsId, UserId } = req.body
    const addActivity = await activityServices.AddNewActivity(ActivityName, GoalsStatut, ActivityTypeId, GoalsId, UserId)
    if (addActivity) {
        res.send("Activity successfully created")
    } else {
        res.send("Error while adding the new activity")
    }
}

module.exports = { userActivity, addActivity }