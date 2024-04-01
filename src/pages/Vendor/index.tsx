import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const Vendor = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;

  const fetchVendors = async (queryStr: string) => {
    try {
      const authToken = Cookies.get("authToken");
      const { data } = await api.get(`/vendor${queryStr}`, {
        headers: { Authorization: authToken },
      });
      const [rows, total] = data;
      setData({ rows: addAction(rows), total });
    } catch (err: any) {
      if (err.response.status === 401) {
        Cookies.remove("authToken");
        navigate("/login");
      }
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
        onPagination={(queryStr: string) => fetchVendors(queryStr)}
      />
    </div>
  );
};
