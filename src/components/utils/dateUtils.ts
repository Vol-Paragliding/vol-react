export const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString(undefined, options);
};
