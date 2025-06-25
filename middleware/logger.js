/**
 * Logger utility to control logging behavior based on environment
 */

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Info logger that only logs in development environment
 * @param {string} message - The message to log
 * @param {any} data - Optional data to log in development only
 */
export const logInfo = (message, data = null) => {
  if (!isProduction) {
    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
};

/**
 * Error logger that works in all environments but sanitizes data in production
 * @param {string} message - The error message to log
 * @param {Error|any} error - The error object or data
 */
export const logError = (message, error) => {
  if (isProduction) {
    // In production, only log the error message, not the sensitive data
    console.error(message, error instanceof Error ? error.message : 'An error occurred');
  } else {
    // In development, log the full error
    console.error(message, error);
  }
};

/**
 * Sanitizes objects to remove sensitive fields before logging
 * @param {Object} obj - The object to sanitize
 * @returns {Object} - Sanitized copy of the object
 */
export const sanitizeForLogging = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  // For arrays, map over items and sanitize each one
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForLogging(item));
  }
  
  // Create a copy of the object to avoid modifying the original
  const sanitized = { ...obj };
  
  // List of fields that are considered sensitive
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
  
  // Remove sensitive fields
  sensitiveFields.forEach(field => {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  return sanitized;
};