import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { fetchData, postData } from "../../api";
import { useNavigate } from "react-router-dom";

export const InvoicePost = () => {
  const navigate = useNavigate();
  const [requestNum, setRequestNum] = useState<string>("");
  const [paymentRefNum, setPaymentRefNum] = useState<string>("");

  const handleGetDetails = async () => {
    if (!requestNum) {
      alert("Please enter a Request Number.");
      return;
    }

    try {
      const data = await fetchData(`/invoice/${requestNum}`, "", navigate);
      alert("Payment details fetched successfully.");
    } catch (error) {
      alert("Failed to fetch details. Please try again.");
    }
  };

  const handleClearRequestNum = () => {
    setRequestNum("");
  };

  const handlePaymentPost = async () => {
    if (!paymentRefNum || !requestNum) {
      alert("Please enter both Request Number and Payment Reference Number.");
      return;
    }

    const requestBody = {
      iom: requestNum,
      bankPaymentReference: paymentRefNum,
    };

    try {
      const response = await postData(`/invoice/post-payment/${requestNum}`, requestBody, navigate);
      if (response) {
        alert("Payment posted successfully.");
      }
    } catch (error) {
      alert("Failed to post payment. Please try again.");
    }
  };

  return (
    <Box className="container" sx={{ padding: "20px" }}>
      <h2>Payment Post</h2>

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
          label="Payment Reference Number"
          variant="outlined"
          value={paymentRefNum}
          onChange={(e) => setPaymentRefNum(e.target.value)}
          required
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentPost}
          sx={{ height: "48px", width: "200px" }}
        >
          Payment Post
        </Button>
      </Box>
    </Box>
  );
};
