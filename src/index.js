require ('dotenv').config();

const fastify = require('fastify')();
const cors = require ('@fastify/cors');
const port = 3000;
const userRoutes = require('./routes/UserRoutes')
const activityRoutes = require('./routes/ActivityRoutes')
const goalRoutes = require("./routes/GoalRoutes")


fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
});

fastify.register(userRoutes);
fastify.register(activityRoutes)
fastify.register(goalRoutes)

fastify.listen(port, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${fastify.server.address().port}`)
    console.log(`Server is running on ${address}`);
  });