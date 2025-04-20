import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";

export const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });

  const { rows, total } = data;

  const fetchCustomerStatsData = async (queryStr: string) => {
    const data = await fetchData("customer/stats", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row
    }));

  return (
    <div className="container">
      <h2>Project & Maintenance Summary</h2>
      <Table
        headers={[
          { key: "customerId", value: "Customer ID" },
          { key: "customerName", value: "Customer Name" },
          { key: "newProjectsCount", value: "Projects" },
          { key: "maintenanceProjectsCount", value: "Total Maintenance" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchCustomerStatsData(queryStr)}
      />
    </div>
  );
};
