export const isNetworkError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const err = error as any;
    const message = err.message?.toLowerCase() || '';
    
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('timeout') ||
      message.includes('connection') ||
      err.name === 'NetworkError' ||
      err.name === 'TypeError' && message.includes('failed to fetch') ||
      !navigator.onLine
    );
  }
  
  return false;
};

export const getErrorMessage = (error: unknown): string => {
  if (isNetworkError(error)) {
    return "Network error. Please check your connection and try again.";
  }
  
  if (typeof error === 'object' && error !== null) {
    const err = error as any;
    return err.message || "Something went wrong";
  }
  
  return "Something went wrong";
};
