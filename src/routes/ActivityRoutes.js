const activityController = require('../controllers/ActivityController')



function activityRoutes (fastify, options, done){

    fastify.get('/userActivity/:id', activityController.userActivity)

    done()
}

module.exports = activityRoutes