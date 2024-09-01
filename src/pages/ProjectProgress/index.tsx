import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, fetchDetails, updateDetails } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { FormatListBulleted } from "@mui/icons-material";
import { ModalType } from "../../utils/commonTypes";
import { formatDate } from "../../utils/util";
import { CustomModal } from "../../components/Modal";

export const ProjectProgress = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState<any>(null);
  const { rows, total } = data;

  const fetchProjectData = async (queryStr: string) => {
    const data = await fetchData("project", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  const fetchProjectDetails = async (id: string) => {
    const data = await fetchDetails(`project/${id}`, navigate);
    if (data) {
      toggleModal("READ", data);
    }
  };

  const UpdateProjectDetails = async (id: string) => {
    // const data = await updateDetails(`measurement/${id}`, navigate);
    // if (data) {
    //   toggleModal("READ", data);
    // }
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
      orderDate: formatDate(row.orderDate),
      branch: `${row.branch} - ${row.city}`,
      action: (
        <IconButton color="inherit" onClick={() => fetchProjectDetails(row.id)}>
          <FormatListBulleted />
        </IconButton>
      ),
    }));

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={openModal}
        onClose={toggleModal}
        template="PROJECT_PROGRESS"
        data={modalData}
      />

      <h2>Project Progress</h2>
      <Table
        headers={[
          { key: "id", value: "Project" },
          { key: "branch", value: "Branch" },
          { key: "customer", value: "Customer" },
          { key: "orderDate", value: "Work Order Date" },
          { key: "action", value: "Action" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchProjectData(queryStr)}
      />
    </div>
  );
};
