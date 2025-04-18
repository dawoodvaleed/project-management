import { useEffect, useState } from "react";
import { Button, Box, Checkbox } from "@mui/material";
import { useDebounce } from "../../utils/debounce-hook";
import { useNavigate } from "react-router-dom";
import { fetchData, postData } from "../../api";
import { Autocomplete } from "../../components/AutoComplete";
import { Table } from "../../components/Table";

type Option = {
  name: string;
  id: string;
};

export const ShortBillRequest = () => {
  const navigate = useNavigate();
  const [customerOptions, setCustomerOptions] = useState<Option[]>([]);
  const [debouncedCustomer, customer, setCustomer] = useDebounce<string>("");
  const [type, setType] = useState<Option | null>(null);
  const [data, setData] = useState({ rows: [], total: 0 });
  const [showTable, setShowTable] = useState(false);
  const [shouldFetchShortBillProjects, setShouldFetchShortBillProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetchSearchedCustomer();
  }, [debouncedCustomer]);

  useEffect(() => {
    if (customer && shouldFetchShortBillProjects) {
      fetchInvoiceData();
    }
  }, [customer, shouldFetchShortBillProjects]);

  const fetchInvoiceData = async () => {
    const data = await fetchData("invoice/short-bill-projects", `?customerId=${customer}`, navigate);
    if (data) {
      setData(data);
      setShowTable(true);
    } else {
      setData({ rows: [], total: 0 });
      setShowTable(false);
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
    setShouldFetchShortBillProjects(true);
  };

  const handleShortBillRequest = async () => {
    if (!selectedProjectId) {
      alert("Please select a record to submit.");
      return;
    }

    const requestBody = {
      projectId: selectedProjectId,
      paymentType: "Short Bill"
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
      projectSelection: (
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

  const handleClear = () => {
    setCustomer("");
    setType(null);
    setShowTable(false);
    setData({ rows: [], total: 0 });
  };

  return (
    <Box className="container" sx={{ padding: "20px" }}>
      <h2>Short Bill Request</h2>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
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

        <Autocomplete
          id="type-autocomplete"
          renderInputProps={{
            label: "TYPE",
            name: "type",
            value: type?.name || "",
            onChange: ({ currentTarget }: any) => {
              const value = currentTarget.value;
              setType({ id: value, name: value });
            },
            required: false,
          }}

          options={[
            { id: "repair&maintainance", name: "Repair & Maintainance" },
            { id: "nonbudgeted", name: "Non-Budgeted" },
          ]}
          onChange={(_, value) => setType(value)}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          sx={{ height: "48px", whiteSpace: "nowrap" }}
        >
          Clear
        </Button>
      </Box>

      <Box sx={{ marginBottom: 2 }}> {/* Added marginBottom to the Box containing the button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleShortBillRequest}
          sx={{ height: "48px", width: "200px" }}
        >
          Invoice Request
        </Button>
      </Box>

      {showTable && (
        <>
          <Table
            headers={[
              { key: "projectSelection", value: "Select (Checkbox)" },
              { key: "id", value: "Maintainance ID" },
              { key: "description", value: "Description" },
              { key: "branch", value: "Branch" },
              { key: "city", value: "CIty" },
              { key: "budget", value: "Amount" },
            ]}
            rows={addAction(data.rows)}
            total={data.total}
            onPagination={() => fetchInvoiceData()}
          />
        </>
      )}
    </Box>
  );
};