const userController = require('../controllers/UserController')



function userRoutes (fastify, options, done) {

   fastify.get('/userLogin', userController.userLogin)


   done()
}

module.exports = userRoutes;