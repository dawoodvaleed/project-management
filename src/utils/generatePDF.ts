import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (headers: string[][], rows: string[][]) => {
  const customWidth = 400;
  const customHeight = 210;

  const report = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [customWidth, customHeight],
  });

  report.setFontSize(14);
  report.setFont("helvetica", "bold");
  report.text("Project Progress Report", report.internal.pageSize.getWidth() / 2, 10, {
    align: "center",
  });

  autoTable(report, {
    head: headers,
    body: rows,
    startY: 20,
    theme: "grid",
    headStyles: { fillColor: [0, 102, 204] },
    tableWidth: "auto",
    styles: {
      fontSize: 6,
      cellPadding: 1.5,
    },
  });

  report.save("ProjectProgressDetails.pdf");
};
