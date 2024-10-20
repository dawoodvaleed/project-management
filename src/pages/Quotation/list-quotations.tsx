import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { formatDate } from "../../utils/util";
import { Delete } from "@mui/icons-material";
import { ModalType } from "../../utils/commonTypes";
import { CustomModal } from "../../components/Modal";

export const Quotation = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState();
  const { rows, total } = data;

  const fetchQuotationData = async (queryStr: string) => {
    const data = await fetchData("quotation", queryStr, navigate);
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

  const deleteQuotation = async (id: string | number) => {};

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      date: formatDate(row.date),
      projectName: `${row.project.id} - ${row.project.description}`,
      customerName: row.project.customer.name,
      branch: row.project.branch,
      itemName: `${row.item.id} - ${row.item.description}`,
      unit: row.item.unitOfQuotation,
    }));

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={openModal}
        onClose={toggleModal}
        // onSave={saveUser}
        onDelete={deleteQuotation}
        template="MEASUREMENT"
        data={modalData}
      />
      <h2>All Quotation List</h2>
      <Table
        headers={[
          { key: "projectName", value: "Project" },
          { key: "date", value: "Date" },
          { key: "customerName", value: "Customer" },
          { key: "branch", value: "Branch" },
          { key: "itemName", value: "Item" },
          { key: "unit", value: "Unit" },
          { key: "location", value: "Location" },
          { key: "numberOfItems", value: "NOS" },
          { key: "length", value: "Length" },
          { key: "height", value: "Height" },
          { key: "breadth", value: "Breath" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchQuotationData(queryStr)}
      />
    </div>
  );
};
