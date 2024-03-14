export const sanitizeInput = (input: string): string => {
  const trimmedInput = input.trim();
  const allowedChars = /^[a-zA-Z0-9_.-]+$/;
  if (!allowedChars.test(trimmedInput)) {
    throw new Error("Input contains invalid characters.");
  }
  return trimmedInput;
};
