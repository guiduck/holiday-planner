export function formatDate(date?: Date) {
  if (!date) return "";

  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const day = utcDate.getUTCDate();
  const month = utcDate.getUTCMonth() + 1;
  const year = utcDate.getUTCFullYear();

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function formatDateFromString(dateString: string) {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}
