export type ModalType = "READ" | "WRITE" | "UPDATE" | "DELETE";

export type ModalTemplate = "ROLE" | "USER" | "MEASUREMENT" | "PROJECT" | "PROJECT_PROGRESS" | "INVOICE_REQUEST_DETAILS" ;

export type ModalChildProps = {
  data?: any;
  dataRef?: any;
  type: ModalType;
};

export type UserModalProps = ModalChildProps & {
  roleData: any[];
};

export enum ModalTypeEnum {
  READ = "View",
  WRITE = "Add",
  UPDATE = "Update",
  DELETE = "Delete",
}

export type tableDataProps = { rows: any[]; total: number };
