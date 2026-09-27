/**
 * Format a date string to a readable format
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

/**
 * Format duration in minutes to "Xh Ym"
 */
export const formatDuration = (minutes) => {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

/**
 * Extract error message from Axios error response
 */
export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
  );
};

/**
 * Get rating color based on value (1-10)
 */
export const getRatingColor = (rating) => {
  if (rating >= 8) return '#f5c518'; // gold
  if (rating >= 6) return '#e5a00d'; // amber
  if (rating >= 4) return '#e07b39'; // orange
  return '#e53e3e'; // red
};

/**
 * Truncate text to given max length
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
};

/**
 * Check if a URL is a valid image (not N/A)
 */
export const isValidPoster = (url) => {
  return url && url !== 'N/A' && url.startsWith('http');
};
