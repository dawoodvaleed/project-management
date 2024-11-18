import * as XLSX from "xlsx";

export const generateExcel = (data: any) => {
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "ProjectProgressDetails");
  XLSX.writeFile(wb, "ProjectProgressDetails.xlsx");
};
