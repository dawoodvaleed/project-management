import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, updateDetails, deleteData } from "../../api";
import { Table } from "../../components/Table";
import { IconButton } from "@mui/material";
import { formatDate } from "../../utils/util";
import { Delete, Edit } from "@mui/icons-material";
import { ModalType } from "../../utils/commonTypes";
import { CustomModal } from "../../components/Modal";

export const Measurement = ({ projectType }: { projectType: string }) => {
  const navigate = useNavigate();
  const isMaintenance = projectType === "MAINTENANCE";

  const [data, setData] = useState({ rows: [], total: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState<any>(null);
  const { rows, total } = data;

  const updateMeasurementDetails = async (data: any) => {
    try {
      if (modalData && modalData.id) {
        const updatedData = await updateDetails(`measurement/${modalData.id}`, data, navigate);
        if (updatedData) {
          await fetchMeasurementData("?limit=10&offset=0&projectType=MAINTENANCE");
        }
      }
    } catch (error) {
      console.error("Error updating measurement:", error);
    } finally {
      setShowEditModal(false);
    }
  };

  const deleteMeasurement = async (id: string | number) => {
    console.log(id);
    try {
      if (modalData && modalData.id) {
        const res = await deleteData(`measurement`, id, navigate);

        if (res) {
          await fetchMeasurementData("?limit=10&offset=0&projectType=MAINTENANCE");
        }
      }
    } catch (error) {
      console.error("Error Deleting measurement:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const fetchMeasurementData = async (queryStr: string) => {
    const data = await fetchData("measurement", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  const toggleDeleteModal = (type?: ModalType, data?: any) => {
    setModalData(data);
    if (type) {
      setModalType(type);
    }
    setShowDeleteModal(!showDeleteModal);
  };

  const toggleEditModal = (type?: ModalType, data?: any) => {
    setModalData(data);
    if (type) {
      setModalType(type);
    }
    setShowEditModal(!showEditModal);
  };

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
        <>
          <IconButton color="inherit" onClick={() => toggleEditModal("UPDATE", row)}>
            <Edit />
          </IconButton>
          <IconButton color="inherit" onClick={() => toggleDeleteModal("DELETE", row)}>
            <Delete />
          </IconButton>
        </>
      ),
    }));

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={showDeleteModal}
        onClose={toggleDeleteModal}
        onDelete={deleteMeasurement}
        template="MEASUREMENT"
        data={modalData}
      />
      <CustomModal
        type={modalType}
        open={showEditModal}
        onClose={toggleEditModal}
        onUpdate={updateMeasurementDetails}
        template="MEASUREMENT_EDIT"
        data={modalData}
      />

      <h2>{isMaintenance ? "Maintenance" : "All Project"} Measurement List</h2>

      <Table
        headers={[
          { key: "projectName", value: isMaintenance ? "Maintenance" : "Project" },
          { key: "date", value: "Date" },
          { key: "customerName", value: "Customer" },
          { key: "branch", value: "Branch" },
          { key: "itemName", value: "Item" },
          { key: "unit", value: "Unit" },
          { key: "location", value: "Location" },
          { key: "numberOfItems", value: "NOS" },
          { key: "length", value: "Length" },
          { key: "height", value: "Height" },
          { key: "breadth", value: "Breadth" },
          { key: "action", value: "Action" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchMeasurementData(queryStr)}
        additionalQueryParams={`projectType=${projectType}`}
      />
    </div>
  );
};
