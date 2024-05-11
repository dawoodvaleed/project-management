import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const addAction = (rows: any) =>
  rows.map((row: any) => ({
    ...row,
    role: row.role.name || "",
    action: (
      // TODO: add modal logic here to view detail
      <IconButton color="inherit" onClick={() => console.log(row.id)}>
        <Visibility />
      </IconButton>
    ),
  }));

export const User = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;

  const fetchUserData = async (queryStr: string) => {
    const data = await fetchData("user", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  return (
    <div className="container">
      <h2>User</h2>
      <Table
        headers={[
          { key: "email", value: "Email" },
          { key: "role", value: "Role" },
          { key: "action", value: "Action" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchUserData(queryStr)}
      />
    </div>
  );
};
