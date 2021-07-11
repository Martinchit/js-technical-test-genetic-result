const Winston = require('winston');
const { DateTime } = require('luxon');

class StaticLogger {
  static get logger() {
    if (this._logger) {
      return this._logger;
    }

    this._logger = Winston.createLogger({});

    // So the colors do not mess up with the logs
    const consoleTransport = new Winston.transports.Console({
      format: Winston.format.printf(
        ({ level, message, ...rest }) =>
          `${DateTime.fromJSDate(new Date()).toISO()} ${level}: ${message} ${JSON.stringify(rest)}`,
      ),
    });
    this._logger.add(consoleTransport);
    this._logger.exceptions.handle(consoleTransport);
    return this._logger;
  }
  static _logger;

  static debug = (message, extraFields = null) => {
    StaticLogger.logger.debug(message, extraFields);
  };

  static info = (message, extraFields = null) => {
    StaticLogger.logger.info(message, extraFields);
  };

  static warn = (message, extraFields = null) => {
    StaticLogger.logger.warn(message, extraFields);
  };

  static error = (message, error = null, extraFields = null) => {
    StaticLogger.logger.error(message, StaticLogger.mergeLoggerObjects(extraFields, error));
  };

  static mergeLoggerObjects = (obj = {}, error = {}) => ({
    ...obj,
    errorMessage: error.message || error.type,
    errorStack: error.stack || error.description,
  });
}

module.exports = StaticLogger;
