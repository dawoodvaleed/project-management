import { useRef, useState } from "react";
import {
  Modal,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { RoleModal } from "./role";
import { ModalTemplate, ModalType, ModalTypeEnum } from "../../utils/commonTypes";
import { UserModal } from "./user";
import { ProjectModal } from "./project";
import { ProjectProgressModal } from "./projectprogress";
import { CustomerInvoicePercentageEditModal } from "./customer-invoice-percentage-edit";
import { MeasurementEditModal } from "./measurement-edit";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  type: ModalType;
  template: ModalTemplate;
  onSave?: (data: any) => Promise<void>;
  data?: any;
  roleData?: any[];
  onDelete?: (id: string | number) => Promise<void>;
  onUpdate?: (data: any) => Promise<void>;
};

export const CustomModal = ({
  open,
  onClose,
  onSave,
  onDelete,
  onUpdate,
  type,
  template,
  data,
  roleData,
}: ModalProps) => {
  const dataRef = useRef({});
  const [isLoading, setIsLoading] = useState(false);

  const templateComponent: {
    [key: string]: any;
  } = {
    ROLE: <RoleModal data={data} type={type} dataRef={dataRef} />,
    USER: (
      <UserModal
        data={data}
        type={type}
        dataRef={dataRef}
        roleData={roleData || []}
      />
    ),
    PROJECT: <ProjectModal type={type} data={data} />,
    PROJECT_PROGRESS: <ProjectProgressModal type={type} data={data} dataRef={dataRef} />,
    CUSTOMER_INVOICE_PERCENTAGE_EDIT: <CustomerInvoicePercentageEditModal data={data} type={type} dataRef={dataRef} />,
    MEASUREMENT_EDIT: <MeasurementEditModal data={data} type={type} dataRef={dataRef} />,
  };
  const handleSubmit = async (cbFun: any) => {
    setIsLoading(true)
    await cbFun()
    setIsLoading(false)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          maxWidth: "95vw",
          width: "auto",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 2,
        }}
      >
        <header
          style={{
            backgroundColor: "#36459b",
            color: "#fff",
            padding: "16px 20px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h4 style={{ margin: 0 }}>
            {ModalTypeEnum[type]} {template}
          </h4>
        </header>
        <Box sx={{ p: 4, pt: 2 }}>
          {isLoading ? (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : type === "DELETE" && onDelete ? (
            <div>
              <p>Are you sure you want to Delete?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: 10,
                  gap: 4,
                }}
              >
                <Button onClick={onClose}>No</Button>
                <Button
                  onClick={() => handleSubmit(() => onDelete(data.id))}
                  variant="contained"
                >
                  Yes
                </Button>
              </div>
            </div>
          ) : (
            <>
              {templateComponent[template]}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: 10,
                  gap: 4,
                }}
              >
                <Button onClick={onClose}>Close</Button>
                {
                  type !== 'READ' && (
                    type === 'UPDATE' && (onUpdate) ? (
                      <Button
                        onClick={() => handleSubmit(() => onUpdate(dataRef.current))}
                        variant="contained"
                      >
                        Update
                      </Button>
                    ) : type === 'WRITE' && onSave ? (
                      <Button
                        onClick={() => handleSubmit(() => onSave(dataRef.current))}
                        variant="contained"
                      >
                        Save
                      </Button>
                    ) : null
                  )
                }
              </div>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
