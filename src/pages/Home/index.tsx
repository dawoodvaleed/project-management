import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, updateDetails } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { CustomModal } from "../../components/Modal";
import { ModalType } from "../../utils/commonTypes";

export const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState<any>();

  const { rows, total } = data;

  const fetchCustomerData = async (queryStr: string) => {
    const data = await fetchData("customer/stats", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  const toggleModal = (type?: ModalType, data?: any) => {
    setModalData({
      ...data,
      advancePercentage: data?.customerAdvancePercentage,
      firstRunningPercentage: data?.customerFirstRunningPercentage,
      secondRunningPercentage: data?.customerSecondRunningPercentage
    });
    if (type) {
      setModalType(type);
    }
    setOpenModal(!openModal);
  };

  const updateCustomerInvoicePercentage = async (data: any) => {
    try {
      await updateDetails(`customer/${modalData?.customerId}`, data, navigate);
      await fetchCustomerData("");
    } catch (e) {
      console.error("error==>", e);
    } finally {
      setOpenModal(false);
    }
  }

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      customerAdvancePercentage: row.customerAdvancePercentage ? `${row.customerAdvancePercentage}%` : "0%",
      customerFirstRunningPercentage: row.customerFirstRunningPercentage ? `${row.customerFirstRunningPercentage}%` : "0%",
      customerSecondRunningPercentage: row.customerSecondRunningPercentage ? `${row.customerSecondRunningPercentage}%` : "0%",
      action: (
        <IconButton color="inherit" onClick={() => toggleModal("UPDATE", row)}>
          <Edit />
        </IconButton>
      )
    }));

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={openModal}
        onClose={toggleModal}
        onUpdate={updateCustomerInvoicePercentage}
        template="CUSTOMER_INVOICE_PERCENTAGE_EDIT"
        data={modalData}
      />
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
          { key: "action", value: "Actions" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchCustomerData(queryStr)}
      />
    </div>
  );
};
