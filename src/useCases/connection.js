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
  logger.error(`(pui-mongoconnection-module): connection error event: ${err.message}`);
  process.exit(1);
});

db.once('open', () => logger.info('(pui-mongoconnection-module): connection opened with DB'));

db.on('connected', () => logger.info(`(pui-mongoconnection-module): Mongoose connection is open to: ${config.mongodb.uri}`));

db.on('disconnected', () => logger.info('(pui-mongoconnection-module): Mongoose connection is disconnected'));


// Proccess events signals
process.on('SIGINT', () => {
  db.close(() => {
    logger.info('(pui-mongoconnection-module): Mongoose connection is disconnected due to application termination');
    process.exit(1);
  });
});

module.exports = db;
