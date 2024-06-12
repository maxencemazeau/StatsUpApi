const goalServices = require('../services/GoalServices')

const userGoal = async (req, res) => {
    let noMoreData = false;
    let limit = 5
    const { id, offset } = req.query
    const availableRows = await goalServices.rowsAfterOffset(id)
    const lastAvailableRow = availableRows[0].lastAvailableRows - offset
    if (lastAvailableRow < limit && lastAvailableRow >= 0) {
        limit = lastAvailableRow
        noMoreData = true
    }
    const offsetValue = parseInt(offset);
    const limitValue = parseInt(limit)
    const goal = await goalServices.userGoal(id, limitValue, offsetValue)
    res.send({ goal, noMoreData })

}


module.exports = { userGoal}