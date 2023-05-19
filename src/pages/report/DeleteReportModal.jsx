import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Alert, Snackbar } from '../../../node_modules/@mui/material/index'
import axios from '../../../node_modules/axios/index'

export default function DeleteReportModal(props) {
  // Thông báo snackbar
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false)
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false)
  const [targetText, setTargetText] = React.useState()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessSnackbar(false)
    setOpenErrorSnackbar(false)
  }

  const deleteCustomerByID = async (id) => {
    axios
      .put(process.env.REACT_APP_API_ENDPOINT + '/reports/' + id, {
        data: { processingStatus: 'Complete' },
      })
      .then((response) => {
        setOpenSuccessSnackbar(true)
        console.log(response)
        props.onHandle()
      })
      .catch((error) => {
        setOpenErrorSnackbar(true)
      })
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: '18px', fontWeight: 'bold' }}
        >
          {'Đánh dấu đã duyệt?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              width: '350px',
            }}
          >
            {`Bạn có muốn đánh dấu ${
              props.targetData.type === 'product' ? 'sản phẩm' : 'người dùng'
            } ${props.targetData.name} không ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Thoát</Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => deleteCustomerByID(props.targetData.id)}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Xử lý tố cáo thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Xử lý tố cáo thất bại
        </Alert>
      </Snackbar>
    </div>
  )
}
