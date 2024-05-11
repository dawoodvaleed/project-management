export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB");

export const formatMuiDate = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
