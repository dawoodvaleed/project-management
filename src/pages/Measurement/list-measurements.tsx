import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { formatDate } from "../../utils/util";

const addAction = (rows: any) =>
  rows.map((row: any) => ({
    ...row,
    date: formatDate(row.date),
    projectName: `${row.project.id} - ${row.project.description}`,
    customerName: row.project.customer.name,
    branch: row.project.branch,
    itemName: `${row.item.id} - ${row.item.description}`,
    unit: row.item.unitOfMeasurement,
    action: (
      // TODO: add modal logic here to view detail
      <IconButton color="inherit" onClick={() => console.log(row.id)}>
        <Visibility />
      </IconButton>
    ),
  }));

export const Measurement = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;

  const fetchMeasurementData = async (queryStr: string) => {
    const data = await fetchData("measurement", queryStr, addAction, navigate);
    if (data) {
      setData(data);
    }
  };

  return (
    <div className="container">
      <h2>Measurements</h2>
      <Table
        headers={[
          { key: "projectName", value: "Project" },
          { key: "date", value: "Date" },
          { key: "customerName", value: "Customer" },
          { key: "branch", value: "Branch" },
          { key: "itemName", value: "item" },
          { key: "unit", value: "Unit" },
          { key: "location", value: "Location" },
          { key: "numberOfItems", value: "NOS" },
          { key: "length", value: "Length" },
          { key: "height", value: "Height" },
          { key: "breadth", value: "Breath" },
          { key: "action", value: "Action" },
        ]}
        rows={rows}
        total={total}
        onPagination={(queryStr: string) => fetchMeasurementData(queryStr)}
      />
    </div>
  );
};
