
import React, {useState, useEffect} from 'react';
import { Snackbar, Alert } from '@mui/material';

import { snackBarProps, snackbarOptionsProps } from './component';

export const SnackbarAlert: React.FC<snackBarProps> = ({snackbarOptions}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<snackbarOptionsProps>({
    type: 'error',
    message: ''
  })
  
  useEffect(() => {
    setOpen(true);
    setOptions(snackbarOptions!)
}, [snackbarOptions])

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
        <Alert
            onClose={handleClose}
            severity={options.type == "success" ? "success" : options.type == "error" ? "error" : options.type == "info" ? "info" : "warning"} 
            color="error"
            variant="filled"
            sx={{ width: '100%' }}
        >
            {options.message}
        </Alert>
  </Snackbar>
  );
}