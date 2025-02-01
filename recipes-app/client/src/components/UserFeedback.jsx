import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";

const UserFeedback = () => {
    const [open, setOpen] = useState(false);

    const data = useSelector((state) => state.feedback.data);

    console.log(data);

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if(data?.type && data?.message) {
            setOpen(true);
        }
    }, [data]);

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={data.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {data.message}
            </Alert>
        </Snackbar>
    )
};

export default UserFeedback;