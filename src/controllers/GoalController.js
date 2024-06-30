const goalServices = require('../services/GoalServices')

const userGoal = async (req, res) => {
    let noMoreData = false;
    let limit = 5
    let goal = []
    const { id, offset } = req.query
    const availableRows = await goalServices.rowsAfterOffset(id)
    const lastAvailableRow = availableRows[0].lastAvailableRows - offset
    if (lastAvailableRow < limit && lastAvailableRow >= 0) {
        limit = lastAvailableRow
        noMoreData = true
    }

    if(lastAvailableRow > 0){
        const offsetValue = parseInt(offset);
        const limitValue = parseInt(limit)
        goal = await goalServices.userGoal(id, limitValue, offsetValue)
    } else{
        noMoreData = true
    }

    res.send({ goal, noMoreData })

}


module.exports = { userGoal}