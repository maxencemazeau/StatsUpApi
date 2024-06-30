const activityServices = require('../services/ActivityServices')
const goalServices = require('../services/GoalServices')

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
    let addActivity = false
    let newGoalId = 0
    const { ActivityName, Timer, GoalsId, CreateNewGoal, GoalName, TimeFrame, Frequence, UserId } = req.body.params

    if (CreateNewGoal !== true) {
         addActivity = await activityServices.AddNewActivity(ActivityName, Timer, GoalsId, UserId)
    } else {
        newGoalId = await goalServices.createNewGoal(GoalName, TimeFrame, Frequence, UserId)
        addActivity = await activityServices.AddNewActivity(ActivityName, Timer, newGoalId, UserId)
    }

    if (addActivity) {
        res.send("Activity successfully created")
    } else {
        res.send("Error while adding the new activity")
    }
}

module.exports = { userActivity, addActivity }