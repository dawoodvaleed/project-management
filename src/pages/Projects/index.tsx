import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { ModalType } from "../../utils/commonTypes";
import { CustomModal } from "../../components/Modal";

export const Project = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState();
  const { rows, total } = data;

  const fetchProjectData = async (queryStr: string) => {
    const data = await fetchData("project", queryStr, navigate);
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
      customer: `${row.customer.name} (${row.customer.province})`,
      verification: row.isVerified ? "Un-Verified	" : "Verified",
      action: (
        <IconButton color="inherit" onClick={() => toggleModal("READ", row)}>
          <Visibility />
        </IconButton>
      ),
    }));

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={openModal}
        onClose={toggleModal}
        template="PROJECT"
        data={modalData}
      />
      <h2>Projects Info</h2>
      <Table
        headers={[
          { key: "id", value: "Code" },
          { key: "branch", value: "Branch" },
          { key: "customer", value: "Customer" },
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
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchProjectData(queryStr)}
      />
    </div>
  );
};
