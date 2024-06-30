const db = require('../db')


const userGoal = async (id, limitValue, offsetValue) => {
    try {
        const query = await db.query(`SELECT GoalsID, GoalName, Frequence, Frame, Goals.UserID
    FROM Goals
    LEFT JOIN TimeFrame ON TimeFrame.TimeFrameID = Goals.TimeFrameID
    WHERE UserID = ? LIMIT ? OFFSET ?`, [id, limitValue, offsetValue])
        return query[0]
    } catch (err) {
        console.log(err)
    }
};

const rowsAfterOffset = async (id) => {
    const query = await db.query(`SELECT Count(GoalsID) as lastAvailableRows FROM Goals WHERE UserID = ?`, [id])
    return query[0]
}

const createNewGoal = async(GoalName, TimeFrame, Frequence, UserId) => {
    const query = await db.query(`INSERT INTO Goals (GoalName, TimeFrameID, Frequence, UserID) values (?,?,?,?)`, [GoalName, TimeFrame, Frequence, UserId])
    if (query[0].affectedRows > 0){
        console.log(query[0].insertId)
        return query[0].insertId
    }
}

module.exports = { userGoal, rowsAfterOffset, createNewGoal }