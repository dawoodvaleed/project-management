import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table";
import { fetchData } from "../../api";

const addAction = (rows: any) =>
  rows.map((row: any) => ({
    ...row,
    status: row.status ? "Active" : "Unactive",
    action: (
      <div>
        {/* TODO: add modal logic here to view Vendor Details and Vendor Bank account */}
        <button onClick={() => console.log(row.id)}>View</button>
      </div>
    ),
  }));

export const Role = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;

  const fetchRoleData = async (queryStr: string) => {
    const data = await fetchData("role", queryStr, addAction, navigate);
    if (data) {
      setData(data);
    }
  };

  return (
    <div className="container">
      <h2>Role</h2>
      <Table
        headers={[
          { key: "name", value: "Name" },
          { key: "description", value: "Description" },
          { key: "status", value: "Status" },
          { key: "permissions", value: "Permissions" },
          { key: "action", value: "Action" },
        ]}
        rows={rows}
        total={total}
        onPagination={(queryStr: string) => fetchRoleData(queryStr)}
      />
    </div>
  );
};
