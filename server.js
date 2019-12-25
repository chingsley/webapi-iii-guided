const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware
server.use(express.json());

// Third-party middleware
server.use(helmet());
server.use(morgan('dev'))

// Custom middleware
// server.use((req, res, next) => {
//   console.log(`${req.method} Requedst`);
//   next();
// });
server.use(typeLogger);
// server.use(addName);
// server.use(lockout);
// server.use(moodyGatekeeper);

server.use('/api/hubs', hubsRouter);

server.get('/', addName, (req, res) => {
  const nameInsert = (req.currentUserName) ? ` ${req.currentUserName}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});


function typeLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

function addName(req, res, next) {
  console.log('req = ', req);
  req.currentUserName = req.currentUserName || "Cassandra";
  next();
}

function lockout(req, res, next) {
  res.status(403).json({ message: 'API lockout!' });
}

function moodyGatekeeper(req, res, next) {
  // it keeps you out 1/3 of the time
  // when it decides to keep you out, it sends
  // back status 403 message: "you shall not pass"
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json({ message: "You shall not pass!"});
  } else {
    next();
  }
}

// we want this immediately before our export 
server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Bad panda",
    err
  });
});

module.exports = server;
