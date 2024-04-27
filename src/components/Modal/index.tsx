// import { useState } from "react";

import {
    Modal,
    Typography,
    Box,
    // Button,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

type ModalProps = {
    open: boolean;
    onClose: () => void;
};

export const CustomModal = ({ open, onClose }: ModalProps) => {
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
                    p: 4,
                    maxWidth: 600,
                    minWidth: 300,
                }}
            >
                {/* <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                <Close /> */}
            </Box>
        </Modal>
    );
};
