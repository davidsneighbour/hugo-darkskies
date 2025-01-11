/**
 * This implements a wrapper for all console methods to enable/disable debugging.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/console
 * 
 * ```js
 * import DebugLogger, { logger } from './DebugLogger.js';
 * // Use the singleton instance
 * logger.log('This is a log message');
 * logger.warn('This is a warning');
 * logger.error('This is an error');
 * // Or create a new instance if needed
 * const customLogger = new DebugLogger(true);
 * customLogger.log('Custom logger enabled');
 * ```
 */
export default class DebugLogger {
  /**
   * Creates a DebugLogger instance.
   * @param {boolean} [debugEnabled=false] - Default state for enabling/disabling debugging.
   */
  constructor(debugEnabled = false) {

    console.log("DebugLogger constructor");
    console.log(debugEnabled);

    this.debugEnabled = debugEnabled;

    // Check the URL for ?debug=true parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("debug") === "true") {
      this.debugEnabled = true;
    }
  }

  /**
   * Logs a message to the console if debugging is enabled.
   * @param {...any} args - The messages or objects to log.
   */
  log(...args) {
    if (this.debugEnabled) {
      console.log(...args);
    }
  }

  /**
   * Logs a warning to the console if debugging is enabled.
   * @param {...any} args - The warnings or objects to log.
   */
  warn(...args) {
    if (this.debugEnabled) {
      console.warn(...args);
    }
  }

  /**
   * Logs an error to the console if debugging is enabled.
   * @param {...any} args - The errors or objects to log.
   */
  error(...args) {
    if (this.debugEnabled) {
      console.error(...args);
    }
  }

  /**
   * Logs information to the console if debugging is enabled.
   * @param {...any} args - The information or objects to log.
   */
  info(...args) {
    if (this.debugEnabled) {
      console.info(...args);
    }
  }

  /**
   * Logs a trace to the console if debugging is enabled.
   * @param {...any} args - The trace or objects to log.
   */
  trace(...args) {
    if (this.debugEnabled) {
      console.trace(...args);
    }
  }

  /**
   * Logs a debug message to the console if debugging is enabled.
   * @param {...any} args - The debug messages or objects to log.
   */
  debug(...args) {
    if (this.debugEnabled) {
      console.debug(...args);
    }
  }

  /**
   * Logs a group to the console if debugging is enabled.
   * @param {...any} args - The group or objects to log.
   */
  group(...args) {
    if (this.debugEnabled) {
      console.group(...args);
    }
  }

  /**
   * Creates a collapsed group in the console if debugging is enabled.
   * @param {...any} args - The group or objects to log.
   */
  groupCollapsed(...args) {
    if (this.debugEnabled) {
      console.groupCollapsed(...args);
    }
  }

  /**
   * Ends a console group if debugging is enabled.
   */
  groupEnd() {
    if (this.debugEnabled) {
      console.groupEnd();
    }
  }

  /**
   * Logs an assertion to the console if debugging is enabled.
   * @param {...any} args - The assertion or objects to log.
   */
  assert(...args) {
    if (this.debugEnabled) {
      console.assert(...args);
    }
  }

  /**
   * Clears the console if debugging is enabled.
   */
  clear() {
    if (this.debugEnabled) {
      console.clear();
    }
  }

  /**
   * Logs a table to the console if debugging is enabled.
   * @param {...any} args - The table or objects to log.
   */
  table(...args) {
    if (this.debugEnabled) {
      console.table(...args);
    }
  }

  /**
   * Starts a console timer if debugging is enabled.
   * @param {string} label - The timer label.
   */
  time(label) {
    if (this.debugEnabled) {
      console.time(label);
    }
  }

  /**
   * Stops a console timer if debugging is enabled.
   * @param {string} label - The timer label.
   */
  timeEnd(label) {
    if (this.debugEnabled) {
      console.timeEnd(label);
    }
  }

  /**
   * Logs the count of a label if debugging is enabled.
   * @param {string} label - The label to count.
   */
  count(label) {
    if (this.debugEnabled) {
      console.count(label);
    }
  }

  /**
   * Enables debugging dynamically.
   */
  enableDebug() {
    this.debugEnabled = true;
  }

  /**
   * Disables debugging dynamically.
   */
  disableDebug() {
    this.debugEnabled = false;
  }
}

// Automatically instantiate and export a singleton logger
const logger = new DebugLogger(false);
export { logger };
