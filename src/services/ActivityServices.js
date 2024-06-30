const db = require('../db');


const ActivityById = async (id, limit, offset) => {
    try {
        const query = await db.query(`SELECT ActivityID, ActivityName, Frequence, Frame, Activity.UserID, Timer, Goals.GoalName 
    FROM Activity
    LEFT JOIN Goals ON Goals.GoalsID = Activity.GoalsID
    LEFT JOIN TimeFrame ON TimeFrame.TimeFrameID = Goals.TimeFrameID
    WHERE Activity.UserID = ? LIMIT ? OFFSET ?`, [id, limit, offset])
        return query[0]
    } catch (err) {
        console.log(err)
    }
};

const rowsAfterOffset = async (id) => {
    const query = await db.query(`SELECT Count(ActivityID) as lastAvailableRows FROM Activity WHERE UserID = ?`, [id])
    return query[0]
}

const AddNewActivity = async (ActivityName, Timer, GoalsId, UserId) => {
    try{
    const query = await db.query(`INSERT INTO Activity (ActivityName, Timer, GoalsID, UserID) values (?,?,?,?)`, [ActivityName, Timer, GoalsId, UserId])
    return query[0]
    } catch (err) {
        console.log(err)
    }
}

module.exports = { ActivityById, AddNewActivity, rowsAfterOffset }


