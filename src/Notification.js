import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = (props) => {
    const [successOpen, setSuccessOpen] = useState(false);
    const [warningOpne, setWarningOpne] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const vertical = "top";
    const horizontal = "right";

    useEffect(() => {
        if(props.obj.type === "success")
        {
            setSuccessMessage(props.obj.message);
            setSuccessOpen(true);
        }
        if(props.obj.type === "warning")
        {
            setWarningMessage(props.obj.message);
            setWarningOpne(true);
        }
    }, [])
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
        setWarningOpne(false);
        setSuccessMessage("");
        setWarningMessage("");
        props.setNotification();
    };

    return (
        <>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={successOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={warningOpne} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {warningMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Notification