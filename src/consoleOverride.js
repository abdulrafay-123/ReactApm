// Override console.warn to filter out specific messages
const originalWarn = console.warn.bind(console);

console.warn = (...args) => {
  const warningMessage = args.join(' ');

  // List of warning messages to filter out
  const warningsToFilter = [
    'ResizeObserver loop completed with undelivered notifications',
    // Add any other warnings you want to filter out here
  ];

  if (warningsToFilter.some(warning => warningMessage.includes(warning))) {
    // Filter out the warning by not logging it
    return;
  }

  originalWarn(...args);
};