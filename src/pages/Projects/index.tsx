import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";

const addAction = (rows: any) =>
  rows.map((row: any) => ({
    ...row,
    customerName: `${row.customer.companyName} (${row.customer.province})`,
    verification: row.isVerified ? "Un-Verified	" : "Verified",
    action: (
      <div>
        {/* TODO: add modal logic here to view detail */}
        <button onClick={() => console.log(row.id)}>View</button>
      </div>
    ),
  }));

export const Project = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;

  const fetchProjectData = async (queryStr: string) => {
    const data = await fetchData("project", queryStr, addAction, navigate);
    if (data) {
      setData(data);
    }
  };

  return (
    <div className="container">
      <h2>Projects</h2>
      <Table
        headers={[
          { key: "id", value: "Project #" },
          { key: "branch", value: "Branch" },
          { key: "customerName", value: "Customer" },
          { key: "natureOfWork", value: "Nature of Work" },
          { key: "year", value: "Year" },
          { key: "floor", value: "Floor" },
          { key: "description", value: "Description" },
          { key: "verification", value: "Verification" },
          { key: "status", value: "Status" },
          { key: "budget", value: "Budget" },
          { key: "blockReason", value: "Block Reason" },
          { key: "action", value: "Action" },
        ]}
        rows={rows}
        total={total}
        onPagination={(queryStr: string) => fetchProjectData(queryStr)}
      />
    </div>
  );
};
