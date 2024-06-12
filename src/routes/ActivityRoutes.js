const activityController = require('../controllers/ActivityController')



function activityRoutes (fastify, options, done){

    fastify.get('/userActivity', activityController.userActivity)

    fastify.post('/addActivity', activityController.addActivity)

    done()
}

module.exports = activityRoutes