import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useDebounce } from "../../utils/debounce-hook";
import { useNavigate } from "react-router-dom";
import { fetchData, postData } from "../../api";
import { Autocomplete } from "../../components/AutoComplete";
import { Table } from "../../components/Table";
import { Checkbox } from "@mui/material";

type Option = {
  name: string;
  id: string;
};

export const InvoiceRequest = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState<Option | null>(null);
  const [year, setYear] = useState<Option | null>(null);
  const [customerOptions, setCustomerOptions] = useState<Option[]>([]);
  const [debouncedCustomer, customer, setCustomer] = useDebounce<string>("");
  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;
  const [showTable, setShowTable] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null); // For selected project

  const yearOptions = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => {
    const year = (2020 + i).toString();
    return { id: year, name: year };
  });

  useEffect(() => {
    fetchSearchedCustomer();
  }, [debouncedCustomer]);

  const fetchInvoiceData = async (queryStr: string) => {
    const data = await fetchData(`invoice/invoiceable-projects?paymentType=${paymentType?.name}&year=${year?.name}&customerId=${customer}`, queryStr, navigate);
    setShowTable(true);
    if (data) {
      setData(data);
    }
  };

  const fetchSearchedCustomer = async () => {
    if (customer) {
      const data = await fetchData("customer", `?search=${customer}`, navigate);
      setCustomerOptions(
        data?.rows.map((row: any) => ({ id: row.id, name: row.name })) || []
      );
    }
  };

  const handleCustomerSelect = (value: Option | null) => {
    setCustomer(value?.id || "");
  };

  const handlePaymentTypeSelect = (value: Option | null) => {
    setPaymentType(value);
  };

  const handleYearSelect = (value: Option | null) => {
    setYear(value);
  };

  const handleGetInvoiceDetails = () => {
    if (!paymentType || !year || !customer) {
      alert("Please select values for Payment Type, Year, and Customer.");
      return;
    }
    fetchInvoiceData("");
  };

  const handleInvoiceRequest = async () => {
    if (!paymentType || !selectedProjectId) {
      alert("Please select data to add.");
      return;
    }

    const requestBody = {
      projectId: selectedProjectId,
      paymentType: paymentType?.name,
      percentage: "25.00",
    };

    try {
      const response = await postData("invoice", requestBody, navigate);
      if (response) {
        alert("Invoice Request submitted successfully.");
        setShowTable(false);
      }
    } catch (error) {
      alert("Failed to submit Invoice Request. Please try again.");
    }
  };

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      "": (
        <Checkbox
          color="primary"
          onChange={(event) => handleCheckboxChange(event, row.id)}
        />
      ),
    }));

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, rowId: string) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedProjectId(rowId);
    } else {
      setSelectedProjectId(null);
    }
  };

  return (
    <Box className="container" sx={{ padding: "20px" }}>
      <h2>Invoice Request</h2>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <Autocomplete
          id="payment-type-autocomplete"
          renderInputProps={{
            label: "Payment Type",
            name: "paymentType",
            value: paymentType?.name || "",
            onChange: ({ currentTarget }: any) => {
              const value = currentTarget.value;
              setPaymentType({ id: value, name: value });
            },
            required: true,
          }}
          options={[
            { id: "Advance", name: "Advance" },
            { id: "First Running", name: "First Running" },
            { id: "Second Running", name: "Second Running" },
          ]}
          onChange={(_, value) => handlePaymentTypeSelect(value)}
        />

        <Autocomplete
          id="year-autocomplete"
          renderInputProps={{
            label: "Year",
            name: "year",
            value: year?.name || "",
            onChange: ({ currentTarget }: any) => {
              const value = currentTarget.value;
              setYear({ id: value, name: value });
            },
            required: true,
          }}
          options={yearOptions}
          onChange={(_, value) => handleYearSelect(value)}
        />

        <Autocomplete
          id="customer-autocomplete"
          renderInputProps={{
            label: "Customer",
            name: "customer",
            value: customer,
            onChange: ({ currentTarget }: any) => {
              setCustomer(currentTarget.value);
            },
            required: true,
          }}
          options={customerOptions}
          onChange={(_, value) => handleCustomerSelect(value)}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 5, marginTop: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGetInvoiceDetails}
          sx={{
            height: "48px",
            width: "200px",
          }}
        >
          Get Invoice Details
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleInvoiceRequest}
          sx={{
            height: "48px",
            width: "200px",
          }}
        >
          Invoice Request
        </Button>
      </Box>

      {showTable && (
        <>
          <br />
          <Table
            headers={[
              { key: "", value: "Select" },
              { key: "id", value: "Project ID" },
              { key: "", value: "Mobilization Date" },
              { key: "description", value: "Description" },
              { key: "branch", value: "Branch" },
              { key: "city", value: "City" },
              { key: "budget", value: "Budget Amount" },
              { key: "paidAmount", value: "Paid" },
              { key: "requestedAmount", value: "Requested Amount" },
              { key: "balance", value: "Balance" },
            ]}
            rows={addAction(rows)}
            total={total}
            onPagination={(queryStr: string) => fetchInvoiceData(queryStr)}
          />
        </>
      )}
    </Box>
  );
};
