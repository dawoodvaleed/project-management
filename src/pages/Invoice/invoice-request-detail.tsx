import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { ModalType } from "../../utils/commonTypes";
import { CustomModal } from "../../components/Modal";

export const InvoiceRequestDetail = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState<any>();
  const { rows, total } = data;

  const fetchInvoiceData = async (queryStr: string) => {
    const data = await fetchData("invoice", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  const toggleModal = (type?: ModalType, data?: any) => {
    setModalData(data);
    if (type) {
      setModalType(type);
    }
    setOpenModal(!openModal);
  };

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      customer: `${row.project.customer.name} (${row.project.customer.province})`,
      verification: row.paymentPost ? "Paid" : "Pending",
      action: (
        <IconButton color="inherit" onClick={() => toggleModal("READ", row)}>
          <Visibility />
        </IconButton>
      ),
      requestDate: `${new Date(row.createdAt).toLocaleDateString()} - ${new Date(row.updatedAt).toLocaleDateString()}`,
      projectYear: row.project.year,
      percent: row.percentage,
      iom: row.iom ?? "-",
      bankPaymentRefNo: row.bankPaymentReference ?? "-",
    }));

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={openModal}
        onClose={toggleModal}
        template="INVOICE_REQUEST_DETAILS"
        data={modalData}
      />
      <h2>Invoice Request Details</h2>
      <Table
        headers={[
          { key: "id", value: "Request #" },
          { key: "requestDate", value: "Request Date (From - To)" },
          { key: "customer", value: "Customer" },
          { key: "paymentType", value: "Payment Type" },
          { key: "projectYear", value: "Project Year" },
          { key: "year", value: "Year" },
          { key: "percent", value: "Percent" },
          { key: "paymentPost", value: "Payment Post" },
          { key: "iom", value: "IOM #" },
          { key: "bankPaymentRefNo", value: "Bank Payment Ref #" },
          { key: "action", value: "Sales Tax Invoice" },
          { key: "simpleInvoice", value: "Simple Invoice" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchInvoiceData(queryStr)}
      />
    </div>
  );
};
