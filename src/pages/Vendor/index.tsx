import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../../api";
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

const fetchVendors = async () => {
  try {
    const authToken = Cookies.get("authToken");
    const { data } = await api.get("/vendor", {
      headers: { Authorization: authToken },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const Vendor: React.FC = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchVendors().then((data) => {
      setRows(addAction(data));
    });
  }, []);

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
      />
    </div>
  );
};
