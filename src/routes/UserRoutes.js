const userController = require('../controllers/UserController');

const getActivityById = {
   schema: {
      response: {
         200: {
            type: 'array',
         }
      }
   }
};

function userRoutes(fastify, options, done) {
   fastify.post('/userLogin', userController.userLogin);
   fastify.get('/getAllUsers', userController.getAllUsers);
   fastify.get('/user', userController.user)
   fastify.post('/userSignUp', {
       schema: {
           body: {
               type: 'object',
               required: ['email', 'username', 'password'],
               properties: {
                   email: { type: 'string', format: 'email' },
                   username: { type: 'string' },
                   password: { type: 'string' }
               }
           }
       }
   }, userController.userSignUp);
   
   done();
}

module.exports = userRoutes;
