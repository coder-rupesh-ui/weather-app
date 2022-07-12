const chalk = require('chalk');
const error = chalk.bold.red;
const success = chalk.bold.green;
const invError = chalk.bold.inverse.green;
const invSuccess = chalk.bold.inverse.green;
const warn = chalk.bold.yellow;
const invWarn = chalk.bold.inverse.yellow;

module.exports = {
    error,
    success,
    invError,
    invSuccess,
    warn,
    invWarn
}