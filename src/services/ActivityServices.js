const db = require('../db');


const ActivityById = async(id) => {
    const query = await db.query(`SELECT ActivityID, ActivityName, ActivityTypeID, Activity.GoalsID, GoalStatut, Frequence, FrequenceType,Frame, Activity.UserID FROM Activity
    INNER JOIN Goals ON Goals.GoalsID = Activity.GoalsID
    INNER JOIN TimeFrame ON TimeFrame.TimeFrameID = Goals.TimeFrameID
    WHERE Activity.UserID = ?`, [id])
    return query[0]
};

const AddNewActivity = async(ActivityName, GoalsStatut, ActivityTypeId, GoalsId, UserId) => {
    const query = await db.query(`INSERT INTO Activity (ActivityName, GoalStatut, 
        ActivityTypeID, GoalsID, UserID) values (?,?,?,?,?)`, [ActivityName, GoalsStatut, ActivityTypeId, GoalsId, UserId])
        return query[0]
}

module.exports = { ActivityById, AddNewActivity }