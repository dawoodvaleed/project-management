import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, updateDetails } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { CustomModal } from "../../components/Modal";
import { ModalType } from "../../utils/commonTypes";

export const Customer = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState<any>();


  const { rows, total } = data;

  const fetchCustomerData = async (queryStr: string) => {
    const data = await fetchData("customer", queryStr, navigate);
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

  const updateCustomerInvoicePercentage = async (data: any) => {
    console.log(data);
    try {
      await updateDetails(`customer/${modalData?.id}`, data, navigate);
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
      advancePercentage: `${row.advancePercentage}%`,
      firstRunningPercentage: `${row.firstRunningPercentage}%`,
      secondRunningPercentage: `${row.secondRunningPercentage}%`,
      action: (
        // TODO: add modal logic here to view detail
        <>
          <IconButton color="inherit" onClick={() => console.log(row.id)}>
            <Visibility />
          </IconButton>
          <IconButton color="inherit" onClick={() => toggleModal("UPDATE", row)}>
            <Edit />
          </IconButton>
        </>
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
      <h2>Customers</h2>
      <Table
        headers={[
          { key: "id", value: "Code" },
          { key: "name", value: "Name" },
          { key: "contactPerson", value: "Contact Person" },
          { key: "landline", value: "Landline #" },
          { key: "mobile", value: "Cell #" },
          { key: "province", value: "Province" },
          { key: "raServiceTax", value: "RA Service Tax" },
          { key: "bankHoldTax", value: "Bank Hold Tax" },
          { key: "incomeTax", value: "Income Tax" },
          { key: "advancePercentage", value: "Advance Percentage" },
          { key: "firstRunningPercentage", value: "First Running Percentage" },
          { key: "secondRunningPercentage", value: "Second Running Percentage" },
          { key: "action", value: "Action" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchCustomerData(queryStr)}
      />
    </div>
  );
};
