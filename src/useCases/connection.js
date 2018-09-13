// External libraries
const Bluebird = require('bluebird');
const Mongoose = require('mongoose');

// Utilities
const config = require('../config/database');

// Define system log
const logger = require('../logger');

Mongoose.Promise = Bluebird;

const db = Mongoose.createConnection(config.mongodb.uri, {
  auth: {
    user: config.mongodb.user,
    password: config.mongodb.pass,
  },
  poolSize: 10,
});


// Add event listeners for mongo connection
db.on('error', (err) => {
  logger.error(`(rsp-mongoconnection-module): connection error event: ${err.message}`);
  process.exit(1);
});

db.once('open', () => logger.info('(rsp-mongoconnection-module): connection opened with DB'));

db.on('connected', () => logger.info(`(rsp-mongoconnection-module): Mongoose connection is open to: ${config.mongodb.uri}`));

db.on('disconnected', () => logger.info('(rsp-mongoconnection-module): Mongoose connection is disconnected'));


// Proccess events signals
process.on('SIGINT', () => {
  db.close(() => {
    logger.info('(rsp-mongoconnection-module): Mongoose connection is disconnected due to application termination');
    process.exit(1);
  });
});

module.exports = db;
