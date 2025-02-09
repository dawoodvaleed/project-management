import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FONT, FontWeights, NUMBER_SERATION_REGEX } from "./utils";

export const generateSimpleInvoicePDF = (invoice: any) => {
    const {
        id,
        paymentType,
        percentage,
        createdAt,
        project: {
            department,
            customer: { name, address },
            year,
            id: projectId,
            branch,
            city,
            budget
        },
        paidAmount,
        requestedAmount
    } = invoice;

    const doc = new jsPDF();

    // Add Image as Header
    const img = new Image();
    const imgHeight = 25;
    img.src = "/assets/file-header-img.png";
    doc.addImage(img, "PNG", 10, 10, 195, imgHeight);

    // Title (Centered)
    const titleText = "Invoice";
    const pageWidth = doc.internal.pageSize.width; // Get the page width
    const textWidth = doc.getTextWidth(titleText); // Get the width of the "Invoice" text
    const titleX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
    const titleStartY = imgHeight + 25; // Set Y position below the image
    doc.setFont(FONT, FontWeights.BOLD);
    doc.setFontSize(18);
    doc.text(titleText, titleX, titleStartY); // Position the text at the calculated X and Y

    // Recipient details
    const recipientStartY = titleStartY + 10;
    doc.setFontSize(12);
    doc.setFont(FONT, FontWeights.BOLD);
    doc.text(`Invoice #:`, 10, recipientStartY);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`${id}`, 50, recipientStartY);

    doc.setFont(FONT, FontWeights.BOLD);
    doc.text(`Date:`, 10, recipientStartY + 8);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`${new Date(createdAt).toLocaleDateString()}`, 50, recipientStartY + 8);

    doc.setFont(FONT, FontWeights.BOLD);
    doc.text(`From:`, 10, recipientStartY + 8 * 2);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`Arch Vision Interior`, 50, recipientStartY + 8 * 2);

    doc.setFont(FONT, FontWeights.BOLD);
    doc.text(`Attention:`, 10, recipientStartY + 8 * 3);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`${department}`, 50, recipientStartY + 8 * 3);

    doc.setFont(FONT, FontWeights.BOLD);
    doc.text(`To:`, 10, recipientStartY + 8 * 4);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`${name},`, 50, recipientStartY + 8 * 4);

    doc.setFont(FONT, FontWeights.BOLD);
    doc.text(`Address:`, 10, recipientStartY + 8 * 5);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`${address}`, 50, recipientStartY + 8 * 5);

    doc.setFont(FONT, FontWeights.BOLD);
    doc.text(`Subject:`, 10, recipientStartY + 8 * 6);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`${paymentType} Request - ${percentage}% of Remaining Amount ${year}`, 50, recipientStartY + 8 * 6);
    doc.text(`Dear Sir,`, 50, recipientStartY + 8 * 7);
    const message = `This is to inform you that following project(s) awarded to us by your good office. You are requested to release ${paymentType} i.e. ${percentage}% of Remaining Amount to us so that we may complete your running projects with good quality and fast pace.`;
    const splitMessage = doc.splitTextToSize(message, 140); // Split text into lines with a max width of 180
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(splitMessage, 50, recipientStartY + 8 * 8);
    
    // Table Data Formatting
    const tableColumn = [
        "Project",
        "Branch",
        "City",
        "Budget Amount",
        // "Billed Amount",
        "Paid Amount",
        "Requested Amount",
        // "Goods",
        // "Services",
    ];

    const tableRows = [
        [
            projectId,
            branch,
            city,
            budget ? Number(budget).toFixed(2).replace(NUMBER_SERATION_REGEX, ",") : "0.00",
            // invoice.billedAmount,
            paidAmount ? Number(paidAmount).toFixed(2).replace(NUMBER_SERATION_REGEX, ",") : "0.00",
            requestedAmount ? Number(requestedAmount).toFixed(2).replace(NUMBER_SERATION_REGEX, ",") : "0.00",
            // invoice.goods,
            // invoice.services,
        ]
    ];

    const tableStartY = recipientStartY + 8 * (8 + splitMessage.length);
    autoTable(doc, {
        startY: tableStartY,
        pageBreak: 'auto',
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 10, cellPadding: 3, valign: 'middle', halign: 'center' },
        headStyles: { fillColor: [54, 69, 155], textColor: [255, 255, 255], fontStyle: FontWeights.BOLD },
    });

    // Payment details
    const y = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Please release the payment in our designated bank account.", 10, y);
    doc.setFont(FONT, FontWeights.BOLD);
    doc.text("Account Title:", 10, y + 8);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text("Arch Vision Interior", 50, y + 8);
    doc.setFont(FONT, FontWeights.BOLD);
    doc.text("Account #:", 10, y + 8 * 2);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text("01150104600813", 50, y + 8 * 2);

    // Footer Details
    doc.setFont(FONT, FontWeights.BOLD);
    doc.text("Finance Manager", 10, y + 30);
    doc.setFont(FONT, FontWeights.NORMAL);
    doc.text(`Printed On: ${new Date().toLocaleDateString()}`, 10, y + 38);

    // Save the PDF
    doc.save("Simple-Invoice.pdf");
};
