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
import ClearIcon from '@mui/icons-material/Clear'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import PersonOffIcon from '@mui/icons-material/PersonOff'

import {
  Alert,
  Avatar,
  Box,
  IconButton,
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
export default function TargetDetailModal(props) {
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

  const handleReportProduct = () => {
    setTargetText('sản phẩm ' + targetData.attributes.name)
    axios
      .put(process.env.REACT_APP_API_ENDPOINT + '/products/' + targetData.id, {
        data: { status: 'Sold' },
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

  const handleReportUser = () => {
    setTargetText(
      'người dùng ' + props.targetType === 'product'
        ? targetData.attributes.userId.data.attributes.username
        : targetData.username,
    )
    axios
      .put(
        process.env.REACT_APP_API_ENDPOINT +
          '/users/' +
          (props.targetType === 'product'
            ? targetData.attributes.userId.data.id
            : targetData.id),
        {
          data: { blocked: true },
        },
      )
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
    if (props.targetType !== undefined) {
      if (props.targetType === 'user') {
        const requestUrl =
          process.env.REACT_APP_API_ENDPOINT +
          '/users/' +
          props.targetID +
          '?populate[avatar]=*'
        fetch(requestUrl)
          .then((res) => res.json())
          .then((posts) => {
            setTargetData(posts)
            setUrlAvatar(posts.avatar?.url)
            console.log(posts)
          })
      } else if (props.targetType === 'product') {
        const requestUrl =
          process.env.REACT_APP_API_ENDPOINT +
          `/products/` +
          props.targetID +
          '?populate=*'
        fetch(requestUrl)
          .then((res) => res.json())
          .then((posts) => {
            setTargetData(posts.data)
            setUrlAvatar(posts.data.attributes.images.data[0].attributes.url)
            console.log(posts.data)
          })
      }
    }
  }, [props])

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
          {props.targetType === 'user' ? (
            <Card
              sx={{
                maxWidth: 520,
                margin: 'auto',
                marginTop: 10,
                padding: '25px 0px',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  textAlign: 'right',
                  right: '8px',
                  top: '7px',
                }}
              >
                <IconButton color="error" onClick={props.onClose}>
                  <ClearIcon />
                </IconButton>
                {'  '}
              </Box>
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
                  <Box sx={{ marginBottom: '8px' }}>
                    Họ tên: {targetData?.fullName}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Username: {targetData?.username}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Email: {targetData?.email}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Trạng thái tài khoản: {!targetData?.blocked}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Trường: {targetData?.university}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Địa chỉ: {targetData?.address}
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{ marginRight: '20px', textTransform: 'lowercase' }}
                  color="error"
                  startIcon={<PersonOffIcon />}
                  onClick={handleReportUser}
                >
                  Chặn người dùng
                </Button>
              </CardActions>
            </Card>
          ) : (
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
                Thông tin sản phẩm
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
                  <Box sx={{ color: 'grey', width: '160px' }}>
                    Tổng cộng có:
                    <Box sx={{ ml: '5px', display: 'inline-block' }}>
                      {targetData?.attributes?.images.data.length}
                    </Box>{' '}
                    hình ảnh
                  </Box>
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
                  <Box sx={{ marginBottom: '8px' }}>
                    ID sản phẩm: {targetData?.id}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Tên sản phẩm: {targetData?.attributes.name}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Danh mục:{' '}
                    {targetData?.attributes.category.data.attributes.name}
                  </Box>
                  <Box sx={{ marginBottom: '8px' }}>
                    Giá thành: {targetData?.attributes.price}
                  </Box>
                  {/* <Box sx={{ marginBottom: '8px', textAlign: 'left' }}>
                    Mô tả sản phẩm: {targetData?.attributes.description}
                  </Box> */}
                  <Box sx={{ marginBottom: '8px' }}>
                    Trạng thái sản phẩm:{' '}
                    {targetData?.attributes.status === 'onSale'
                      ? 'Còn bán'
                      : 'Ngưng bán'}
                  </Box>
                  {/* <Box sx={{ marginBottom: '8px' }}>
                      Địa chỉ: {targetData?.address}
                    </Box> */}
                  <Box sx={{ marginBottom: '8px', textAlign: 'left' }}>
                    Lý do: {props.selectedData.description}
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{ marginRight: '20px', textTransform: 'lowercase' }}
                  color="error"
                  startIcon={<RemoveCircleIcon />}
                  onClick={handleReportProduct}
                >
                  Ngưng bán sản phẩm
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginRight: '20px', textTransform: 'lowercase' }}
                  color="error"
                  startIcon={<PersonOffIcon />}
                  onClick={handleReportUser}
                >
                  Chặn người dùng
                </Button>
              </CardActions>
            </Card>
          )}
        </Fade>
      </Modal>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Chặn {targetText} thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Chặn {targetText} thất bại
        </Alert>
      </Snackbar>
    </div>
  )
}
