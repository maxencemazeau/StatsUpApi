const goalController = require('../controllers/GoalController')


function goalRoutes (fastify, options, done){

    fastify.get('/userGoal', goalController.userGoal)


    done()
}

module.exports = goalRoutes