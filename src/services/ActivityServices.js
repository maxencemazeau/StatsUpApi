const db = require('../db');


const ActivityById = async(id) => {
    const query = await db.query('SELECT ActivityID, ActivityName, ActivityTypeID, GoalsID, GoalStatut, UserID FROM Activity WHERE UserID = ?', [id])
    return query[0]
};

module.exports = { ActivityById }