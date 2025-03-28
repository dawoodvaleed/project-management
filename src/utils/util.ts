export const formatDate = (date: string) =>
  date ? new Date(date).toLocaleDateString("en-PK") : "";

export const formatDateTime = (date: string) =>
  date ? new Date(date).toLocaleString("en-PK") : "";

export const formatMuiDate = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
