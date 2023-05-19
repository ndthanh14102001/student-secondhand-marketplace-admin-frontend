import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import RestartAltIcon from '@mui/icons-material/RestartAlt'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'

import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import {
  Alert,
  Avatar,
  Box,
  Snackbar,
} from '../../../node_modules/@mui/material/index'
import axios from '../../../node_modules/axios/index'

/* component map
 - UseState targetData, urlAvatar
 - Function handleReportProduct
 - Function handleReportUser
 - useState get data user/product
 - Return
*/
export default function InfoUserModal(props) {
  const [targetData, setTargetData] = React.useState()
  const [urlAvatar, setUrlAvatar] = React.useState()

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

  const handleReportUser = () => {
    const isBlockedAlertText = targetData.blocked ? 'Bỏ chặn' : 'Chặn'
    setTargetText(isBlockedAlertText + ' người dùng ' + targetData.username)
    axios
      .put(process.env.REACT_APP_API_ENDPOINT + '/users/' + targetData.id, {
        blocked: !targetData.blocked,
      })
      .then((response) => {
        setOpenSuccessSnackbar(true)
        props.onHandle()
        console.log(response)
      })
      .catch((error) => {
        setOpenErrorSnackbar(true)
      })
  }

  React.useEffect(() => {
    setTargetData(props.data)
    setUrlAvatar(props.data?.avatar?.url)
  }, [props.data])

  // React.useEffect(() => {
  //   if (props.targetType !== undefined) {
  //     const requestUrl =
  //       process.env.REACT_APP_API_ENDPOINT +
  //       '/users/' +
  //       props.targetID +
  //       '?populate[avatar]=*'
  //     fetch(requestUrl)
  //       .then((res) => res.json())
  //       .then((posts) => {
  //         setTargetData(posts)
  //         setUrlAvatar(posts.avatar?.url)
  //         console.log(posts)
  //       })
  //   }
  // }, [props])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Card
            sx={{
              maxWidth: 520,
              margin: 'auto',
              marginTop: 10,
              padding: '25px 0px',
              position: 'relative',
            }}
          >
            <Typography variant="h5" align="center">
              Thông tin người dùng
            </Typography>
            <CardContent
              align="center"
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <Box>
                <Avatar
                  src={
                    urlAvatar !== undefined &&
                    `${process.env.REACT_APP_SERVER_ENDPOINT}${urlAvatar}`
                  }
                  alt={'abc'}
                  sx={{
                    width: '140px',
                    height: '140px',
                    border: '1px solid #ccc',
                  }}
                />
              </Box>
              <Box
                className="DetailedInfoUser"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'baseline',
                  width: '100%',
                  marginLeft: '30px',
                }}
              >
                <Box sx={{ marginBottom: '8px', textAlign: 'left' }}>
                  Họ tên: {targetData?.fullName}
                </Box>
                <Box sx={{ marginBottom: '8px', textAlign: 'left' }}>
                  Username: {targetData?.username}
                </Box>
                <Box sx={{ marginBottom: '8px', textAlign: 'left' }}>
                  Email: {targetData?.email}
                </Box>
                <Box
                  sx={{
                    marginBottom: '8px',
                    textAlign: 'left',
                    display: 'flex',
                  }}
                >
                  <Box sx={{ mr: '4px' }}>Trạng thái tài khoản: </Box>
                  {!targetData?.blocked ? (
                    <Box
                      sx={{
                        color: 'green',
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <ToggleOffIcon sx={{ mr: 1 }} />
                      Hoạt động
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        color: 'red',
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <ToggleOnIcon sx={{ mr: 1 }} />
                      Đã chặn
                    </Box>
                  )}
                </Box>
                {/* <Box sx={{ marginBottom: '8px', textAlign: 'left' }}>
                  Trường: {targetData?.university}
                </Box> */}
                <Box sx={{ marginBottom: '8px', textAlign: 'left' }}>
                  Địa chỉ: {targetData?.address}
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{ marginRight: '20px', textTransform: 'lowercase' }}
                color="error"
                startIcon={
                  targetData?.blocked ? <LockOpenIcon /> : <LockIcon />
                }
                onClick={handleReportUser}
              >
                {targetData?.blocked ? 'Bỏ chặn tài khoản' : 'Chặn tài khoản'}
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {targetText} thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {targetText} thất bại
        </Alert>
      </Snackbar>
    </div>
  )
}
