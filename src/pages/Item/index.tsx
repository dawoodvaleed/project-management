import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";

const addAction = (rows: any) =>
  rows.map((row: any) => ({
    ...row,
  }));

export const Item = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const { rows, total } = data;

  const fetchItemData = async (queryStr: string) => {
    const data = await fetchData("item", queryStr, addAction, navigate);
    if (data) {
      setData(data);
    }
  };

  return (
    <div className="container">
      <h2>Items</h2>
      <Table
        headers={[
          { key: "id", value: "Code" },
          { key: "name", value: "Name" },
          { key: "work", value: "Work" },
          { key: "description", value: "Description" },
          { key: "price", value: "Price" },
          { key: "unitOfMeasurement", value: "UOM" },
          { key: "materialPercentage", value: "Material Percentage" },
        ]}
        rows={rows}
        total={total}
        onPagination={(queryStr: string) => fetchItemData(queryStr)}
      />
    </div>
  );
};
