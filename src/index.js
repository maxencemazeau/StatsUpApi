const fastify = require('fastify')();
const cors = require ('@fastify/cors');
const port = 8080;
const userRoutes = require('./routes/UserRoutes')


fastify.register(cors);

fastify.register(userRoutes);

fastify.listen(port, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running on ${address}`);
  });