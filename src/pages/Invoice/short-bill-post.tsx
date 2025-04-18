import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { fetchDetails, updateDetails } from "../../api";
import { useNavigate } from "react-router-dom";

export const ShortBillPost = () => {
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
        alert("Short bill details fetched successfully.");
      } else {
        alert("Short Bill not found.");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch details. Please try again.");
    }
  };

  const handleClearRequestNum = () => {
    setRequestNum("");
  };

  const handleShortBillPost = async () => {
    if (!invoiceRefNum || !requestNum) {
      alert("Please enter both Request Number and Short Bill Reference Number.");
      return;
    }

    const requestBody = {
      iom: requestNum,
      bankPaymentReference: invoiceRefNum,
    };

    try {
      const response = await updateDetails(`invoice/post-payment/${requestNum}`, requestBody, navigate);
      if (response) {
        alert("Short Bill posted successfully.");
      }
    } catch (error) {
      alert("Failed to post bill. Please try again.");
    }
  };

  return (
    <Box className="container" sx={{ padding: "20px" }}>
      <h2>Short Bill Post</h2>
  
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, flexWrap: "wrap" }}>
        {/* Left Group */}
        <TextField
          label="Request Number"
          variant="outlined"
          value={requestNum}
          onChange={(e) => setRequestNum(e.target.value)}
          required
          sx={{ width: "250px" }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGetDetails}
          sx={{ height: "48px", width: "140px" }}
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
  
        <Box sx={{ flexGrow: 0.3 }} />
  
        <TextField
          label="Invoice Reference Number"
          variant="outlined"
          value={invoiceRefNum}
          onChange={(e) => setInvoiceRefNum(e.target.value)}
          required
          sx={{ width: "250px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleShortBillPost}
          sx={{ height: "48px", width: "180px" }}
        >
          Post Short Bill
        </Button>
      </Box>
    </Box>
  );
  };
