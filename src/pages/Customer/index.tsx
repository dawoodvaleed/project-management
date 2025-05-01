import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";

export const Customer = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });

  const { rows, total } = data;

  const fetchCustomerData = async (queryStr: string) => {
    const data = await fetchData("customer", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      advancePercentage: `${row.advancePercentage}%`,
      firstRunningPercentage: `${row.firstRunningPercentage}%`,
      secondRunningPercentage: `${row.secondRunningPercentage}%`,
      action: (
        <IconButton color="inherit" onClick={() => console.log(row.id)}>
          <Visibility />
        </IconButton>
      )
    }));

  return (
    <div className="container">
      <h2>Customers</h2>
      <Table
        headers={[
          { key: "id", value: "Code" },
          { key: "name", value: "Name" },
          { key: "contactPerson", value: "Contact Person" },
          { key: "landline", value: "Landline #" },
          { key: "mobile", value: "Cell #" },
          { key: "province", value: "Province" },
          { key: "raServiceTax", value: "RA Service Tax" },
          { key: "bankHoldTax", value: "Bank Hold Tax" },
          { key: "incomeTax", value: "Income Tax" },
          { key: "advancePercentage", value: "Advance Percentage" },
          { key: "firstRunningPercentage", value: "First Running Percentage" },
          { key: "secondRunningPercentage", value: "Second Running Percentage" },
          { key: "action", value: "Action" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchCustomerData(queryStr)}
      />
    </div>
  );
};
