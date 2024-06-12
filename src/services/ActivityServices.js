const db = require('../db');


const ActivityById = async (id, limit, offset) => {
    try {
        const query = await db.query(`SELECT ActivityID, ActivityName, ActivityTypeID, Frequence, Frame, Activity.UserID, Timer, Goals.GoalName 
    FROM Activity
    INNER JOIN Goals ON Goals.GoalsID = Activity.GoalsID
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

const AddNewActivity = async (ActivityName, GoalsStatut, ActivityTypeId, GoalsId, UserId) => {
    const query = await db.query(`INSERT INTO Activity (ActivityName, GoalStatut, 
        ActivityTypeID, GoalsID, UserID) values (?,?,?,?,?)`, [ActivityName, GoalsStatut, ActivityTypeId, GoalsId, UserId])
    return query[0]
}

module.exports = { ActivityById, AddNewActivity, rowsAfterOffset }


