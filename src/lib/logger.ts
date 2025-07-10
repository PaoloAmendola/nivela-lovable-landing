/**
 * Production-safe logger utility
 */

interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

const LOG_LEVELS: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  error(message: string, ...args: any[]) {
    console.error(`[ERROR] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]) {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: any[]) {
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  // Legacy console.log replacement
  log(message: string, ...args: any[]) {
    if (this.isDevelopment) {
      console.log(message, ...args);
    }
  }
}

export const logger = new Logger();
export { LOG_LEVELS };