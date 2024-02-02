const fastify = require('fastify')();
const cors = require ('@fastify/cors');
const port = 8080;
const db = require('./db');

fastify.register(cors);

fastify.get('/home', async(req, res) => {
   const user = await db.query('SELECT FirstName FROM User');
   res.send(user)
})

fastify.listen(port, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running on ${address}`);
  });