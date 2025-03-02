import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { fetchDetails, updateDetails } from "../../api";
import { useNavigate } from "react-router-dom";

export const InvoicePost = () => {
  const navigate = useNavigate();
  const [requestNum, setRequestNum] = useState<string>("");
  const [invoiceRefNum, setInvoiceRefNum] = useState<string>("");

  const handleGetDetails = async () => {
    if (!requestNum) {
      alert("Please enter a Request Number.");
      return;
    }

    try {
      const data = await fetchDetails(`invoice/${requestNum}`, navigate) as any;
      if (data?.id == requestNum) {
        alert("Invoice details fetched successfully.");
      } else {
        alert("Invoice not found.");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch details. Please try again.");
    }
  };

  const handleClearRequestNum = () => {
    setRequestNum("");
  };

  const handleInvoicePost = async () => {
    if (!invoiceRefNum || !requestNum) {
      alert("Please enter both Request Number and Invoice Reference Number.");
      return;
    }

    const requestBody = {
      iom: requestNum,
      bankPaymentReference: invoiceRefNum,
    };

    try {
      const response = await updateDetails(`invoice/post-payment/${requestNum}`, requestBody, navigate);
      if (response) {
        alert("Invoice posted successfully.");
      }
    } catch (error) {
      alert("Failed to post invoice. Please try again.");
    }
  };

  return (
    <Box className="container" sx={{ padding: "20px" }}>
      <h2>Invoice Post</h2>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Request Number"
          variant="outlined"
          value={requestNum}
          onChange={(e) => setRequestNum(e.target.value)}
          required
          fullWidth
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGetDetails}
          sx={{ height: "48px", width: "150px" }}
        >
          Get Details
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearRequestNum}
          sx={{ height: "48px", width: "100px" }}
        >
          Clear
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Invoice Reference Number"
          variant="outlined"
          value={invoiceRefNum}
          onChange={(e) => setInvoiceRefNum(e.target.value)}
          required
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleInvoicePost}
          sx={{ height: "48px", width: "200px" }}
        >
          Invoice Post
        </Button>
      </Box>
    </Box>
  );
};
