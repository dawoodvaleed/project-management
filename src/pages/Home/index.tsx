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
      ...row,
      customerAdvancePercentage: row.customerAdvancePercentage ? `${row.customerAdvancePercentage}%` : "0%",
      customerFirstRunningPercentage: row.customerFirstRunningPercentage ? `${row.customerFirstRunningPercentage}%` : "0%",
      customerSecondRunningPercentage: row.customerSecondRunningPercentage ? `${row.customerSecondRunningPercentage}%` : "0%",
    }));

  return (
    <div className="container">
      <h2>Project & Maintenance Summary</h2>
      <Table
        headers={[
          { key: "customerId", value: "Customer ID" },
          { key: "customerName", value: "Customer Name" },
          { key: "newProjectsCount", value: "📝 Total Projects" },
          { key: "pendingNewProjectsCount", value: "⏲️ Pending Projects" },
          { key: "completedNewProjectsCount", value: "✅ Completed Projects" },
          { key: "blockedNewProjectsCount", value: "🚫 Blocked Projects" },
          { key: "maintenanceProjectsCount", value: "📝 Total Maintenance" },
          { key: "maintenanceProjectsWithoutInvoiceCount", value: "🔴 Pending Maintenance (Maintenance without Payment Request)" },
          { key: "maintenanceProjectsWithUnpostedPaymentsCount", value: "🟡 Pending Maintenance (Maintenance with Payment Request)" },
          { key: "maintenanceProjectsWithPostedPaymentsCount", value: "✅ Completed Maintenance" },
          { key: "customerAdvancePercentage", value: "Advance Percentage" },
          { key: "customerFirstRunningPercentage", value: "First Running Percentage" },
          { key: "customerSecondRunningPercentage", value: "Second Running Percentage" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchCustomerStatsData(queryStr)}
      />
    </div>
  );
};
