import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteUserModal(props) {

    const deleteCustomerByID = async (id) => {
        const requestUrl = 'http://localhost:3000/api/user/' + id;
        const response = await fetch(requestUrl, {
           method: 'DELETE',
           headers: {
              'Content-Type': 'application/json',
           },
        });
        const data = await response.json();
    
        console.log(data);
     };

    const deleteCustomer = (id) => {
        deleteCustomerByID(id);
        props.onAfterDelete(id);
    }

  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Xác nhận xóa người dùng?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Bạn có chắc muốn xóa người dùng "{props.data.name}" này không ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose}>Thoát</Button>
      <Button color="error" variant="outlined" onClick={() => deleteCustomer(props.data.id)} autoFocus>
        Xóa
      </Button>
    </DialogActions>
  </Dialog>
  );
}