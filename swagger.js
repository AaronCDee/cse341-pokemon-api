const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pokemon API',
    description: 'Manage pokemon database'
  },
  basePath: "/",
  host: "aaroncdee-cse341-pokemon-api.onrender.com",
  schemes: ["https"],
  tags: [
    {
      name: 'Pokemon',
      description: 'Pokemon-related endpoints',
    },
    {
      name: 'Trainers',
      description: 'Trainer-related endpoints',
    },
  ],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.mjs'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
