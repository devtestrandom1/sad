const config = require("./config/config");
const express = require("express");
const middleware = require("./middleware/middleware");

const { PORT, ENV } = config;
const {
  cache,
  limitRate,
  monitor,
  authenticate,
  authorize,
  routeMicroservice,
} = middleware;
const app = express();

// Middleware
app.use(cache);
app.use(limitRate);
app.use(monitor);
app.use(authenticate);
app.use(authorize);

// Microservice Routing
app.all("/api/:microservice/*", routeMicroservice);

// Server startup
app.listen(PORT, () => {
  console.log(`ENV=${ENV}`);
  console.log(`Server started on port ${PORT}`);
});
