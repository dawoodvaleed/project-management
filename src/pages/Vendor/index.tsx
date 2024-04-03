import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";

const addAction = (rows: any) =>
  rows.map((row: any) => ({
    ...row,
    action: (
      <div>
        {/* TODO: add modal logic here to view Vendor Details and Vendor Bank account */}
        <button onClick={() => console.log(row.id)}>View</button>
      </div>
    ),
  }));

export const Vendor = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;

  const fetchVendorData = async (queryStr: string) => {
    const data = await fetchData("vendor", queryStr, addAction, navigate);
    if (data) {
      setData(data);
    }
  };

  return (
    <div className="container">
      <h2>Vendor</h2>
      <Table
        headers={[
          { key: "code", value: "Code" },
          { key: "companyName", value: "Company" },
          { key: "contactPerson", value: "Contact Person" },
          { key: "landline", value: "Landline #" },
          { key: "mobile", value: "Cell #" },
          { key: "province", value: "Province" },
          { key: "raServiceTax", value: "RA Service Tax" },
          { key: "bankHoldTax", value: "Bank Hold Tax" },
          { key: "incomeTax", value: "Income Tax" },
          { key: "action", value: "Action" },
        ]}
        rows={rows}
        total={total}
        onPagination={(queryStr: string) => fetchVendorData(queryStr)}
      />
    </div>
  );
};
