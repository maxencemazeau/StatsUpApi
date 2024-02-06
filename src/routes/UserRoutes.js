const userController = require('../controllers/UserController')



function userRoutes (fastify, options, done) {

   fastify.get('/userLogin', userController.userLogin)
   fastify.get('/getAllUsers', userController.getAllUsers)
   done()
}

module.exports = userRoutes;