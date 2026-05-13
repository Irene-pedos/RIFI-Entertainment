/**
 * Simple logger utility for the backend
 */

const levels = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  debug: "DEBUG",
};

type LogLevel = keyof typeof levels;

const log = (level: LogLevel, message: string, ...args: any[]) => {
  const timestamp = new Date().toISOString();
  const levelStr = levels[level].padEnd(5);
  
  if (level === "error") {
    console.error(`[${timestamp}] ${levelStr} ${message}`, ...args);
  } else if (level === "warn") {
    console.warn(`[${timestamp}] ${levelStr} ${message}`, ...args);
  } else {
    console.log(`[${timestamp}] ${levelStr} ${message}`, ...args);
  }
};

export const logger = {
  info: (message: string, ...args: any[]) => log("info", message, ...args),
  warn: (message: string, ...args: any[]) => log("warn", message, ...args),
  error: (message: string, ...args: any[]) => log("error", message, ...args),
  debug: (message: string, ...args: any[]) => log("debug", message, ...args),
};
