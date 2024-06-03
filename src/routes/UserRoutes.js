const userController = require('../controllers/UserController')

const getActivityById = {
   schema: {
      response: {
         200:{
            type: 'array',
         }
      }
   }
}

function userRoutes (fastify, options, done) {

   fastify.get('/userLogin', userController.userLogin)
   fastify.get('/getAllUsers', userController.getAllUsers)
   done()
}

module.exports = userRoutes;