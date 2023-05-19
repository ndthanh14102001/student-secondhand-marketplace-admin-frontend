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
import NearMeIcon from '@mui/icons-material/NearMe'
import PersonIcon from '@mui/icons-material/Person'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded'

import {
  Alert,
  Avatar,
  Box,
  IconButton,
  Link,
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
  const [targetReport, setTargetReport] = React.useState()
  const [urlAvatar, setUrlAvatar] = React.useState()
  const [reportList, setReportList] = React.useState()

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

  React.useEffect(() => {
    setTargetReport(props.targetReport)
    setReportList(props.reportList)
  }, [props])
  const handleReportProduct = () => {
    setTargetText('sản phẩm ' + targetData.attributes.name)
    axios
      .put(process.env.REACT_APP_API_ENDPOINT + '/products/' + targetData.id, {
        data: { status: 'Sold' },
      })
      .then(() => {
        axios
          .put(
            process.env.REACT_APP_API_ENDPOINT +
              '/reports/' +
              props.targetReport.id,
            {
              data: { processingStatus: 'Complete' },
            },
          )
          .then((response) => {
            setOpenSuccessSnackbar(true)
            props.onHandle()
            console.log(response)
          })
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
      .then(() => {
        axios
          .put(
            process.env.REACT_APP_API_ENDPOINT +
              '/reports/' +
              props.targetReport.id,
            {
              data: { processingStatus: 'Complete' },
            },
          )
          .then((response) => {
            setOpenSuccessSnackbar(true)
            props.onHandle()
            console.log(response)
          })
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

  const UserInfoCard = (props) => {
    return (
      <Box>
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
        <Typography variant="h5" align="center" sx={{ mb: '8px' }}>
          Thông tin tố cáo
        </Typography>
        <CardContent
          align="center"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: '#eeeeee',
            border: 'lightgrey 1px solid',
            borderRadius: '15px',
            mt: '10px',
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: '8px' }}>
            Thông tin người dùng
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Họ tên: {targetData?.fullName}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Username: {targetData?.username}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Email: {targetData?.email}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Trạng thái tài khoản: {!targetData?.blocked}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Trường: {targetData?.university}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Địa chỉ: {targetData?.address}
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardContent
          align="center"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: '#eeeeee',
            border: 'lightgrey 1px solid',
            borderRadius: '15px',
            mt: '15px',
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: '8px' }}>
            Thông tin tố cáo
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <PersonIcon sx={{ fontSize: '20px', mr: '8px' }} />
                {' Người tố cáo: '}
                {targetReport.attributes?.reporter.data?.attributes.username}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <WarningRoundedIcon sx={{ fontSize: '20px', mr: '8px' }} />
                {' Thời gian: '}
                {targetReport?.attributes?.createdAt}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <AccessTimeFilledRoundedIcon
                  sx={{ fontSize: '20px', mr: '8px' }}
                />
                {' Lý do: '}
                {targetReport?.attributes?.description}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <AssessmentRoundedIcon sx={{ fontSize: '20px', mr: '8px' }} />
                {' Số lượng tố cáo người dùng này: '}
                {
                  reportList?.filter((object) => {
                    console.log(object)
                    return (
                      object.attributes.accused?.data?.id ===
                      targetReport.attributes.accused?.data?.id
                    )
                  }).length
                }
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', mt: '12px' }}>
          <Link
            href={
              process.env.REACT_APP_PUBLIC_ECOMMERCE_URL +
              'user/info/' +
              targetData?.id
            }
            underline="none"
            target="_blank"
          >
            <Button
              variant="contained"
              sx={{ marginRight: '20px', textTransform: 'lowercase' }}
              color="info"
              startIcon={<NearMeIcon />}
            >
              Chi tiết người dùng
            </Button>
          </Link>
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
      </Box>
    )
  }

  const ProductInfoCard = (props) => {
    return (
      <Box>
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
          Thông tin tố cáo
        </Typography>
        <CardContent
          align="center"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: '#eeeeee',
            border: 'lightgrey 1px solid',
            borderRadius: '15px',
            mt: '10px',
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: '8px' }}>
            Thông tin sản phẩm
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                ID sản phẩm: {targetData?.id}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Tên sản phẩm: {targetData?.attributes.name}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Danh mục: {targetData?.attributes.category.data.attributes.name}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Giá thành: {targetData?.attributes.price}
              </Box>
              {/* <Box sx={{ marginBottom: '8px', textAlign: 'left', alignItems: 'center', display: 'flex' }}>
                Mô tả sản phẩm: {targetData?.attributes.description}
              </Box> */}
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                Trạng thái sản phẩm:{' '}
                {targetData?.attributes.status === 'onSale'
                  ? 'Còn bán'
                  : 'Ngưng bán'}
              </Box>
              {/* <Box sx={{ marginBottom: '8px', textAlign: 'left', alignItems: 'center', display: 'flex' }}>
                  Địa chỉ: {targetData?.address}
                </Box> */}
            </Box>
          </Box>
        </CardContent>
        <CardContent
          align="center"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: '#eeeeee',
            border: 'lightgrey 1px solid',
            borderRadius: '15px',
            mt: '15px',
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: '8px' }}>
            Thông tin tố cáo
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <PersonIcon sx={{ fontSize: '20px', mr: '8px' }} />
                {' Người tố cáo: '}
                {targetReport.attributes?.reporter.data?.attributes.username}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <WarningRoundedIcon sx={{ fontSize: '20px', mr: '8px' }} />
                {' Thời gian: '}
                {targetReport?.attributes?.createdAt}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <AccessTimeFilledRoundedIcon
                  sx={{ fontSize: '20px', mr: '8px' }}
                />
                {' Lý do: '}
                {targetReport?.attributes?.description}
              </Box>
              <Box
                sx={{
                  marginBottom: '8px',
                  textAlign: 'left',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <AssessmentRoundedIcon sx={{ fontSize: '20px', mr: '8px' }} />
                {' Số lượng tố cáo người dùng này: '}
                {
                  reportList?.filter((object) => {
                    console.log(object)
                    return (
                      object.attributes.product?.data?.id ===
                      targetReport.attributes.product?.data?.id
                    )
                  }).length
                }
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', mt: '12px' }}>
          <Link
            href={
              process.env.REACT_APP_PUBLIC_ECOMMERCE_URL +
              'product/' +
              targetData?.id
            }
            underline="none"
            target="_blank"
          >
            <Button
              variant="contained"
              sx={{ marginRight: '20px', textTransform: 'lowercase' }}
              color="info"
              startIcon={<NearMeIcon />}
            >
              Chi tiết sản phẩm
            </Button>
          </Link>
          {targetReport.attributes.processingStatus === 'Uncomplete' && (
            <Button
              variant="contained"
              sx={{ marginRight: '20px', textTransform: 'lowercase' }}
              color="error"
              startIcon={<RemoveCircleIcon />}
              onClick={handleReportProduct}
            >
              Ngưng bán sản phẩm
            </Button>
          )}
          {targetReport.attributes.processingStatus === 'Uncomplete' && (
            <Button
              variant="contained"
              sx={{ marginRight: '20px', textTransform: 'lowercase' }}
              color="error"
              startIcon={<PersonOffIcon />}
              onClick={handleReportUser}
            >
              Chặn người dùng
            </Button>
          )}
        </CardActions>
      </Box>
    )
  }

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
              maxWidth: 670,
              margin: 'auto',
              marginTop: 10,
              padding: '25px 25px',
              position: 'relative',
            }}
          >
            {/* Display  */}
            {props.targetType === 'user' ? (
              <UserInfoCard
                onClose={props.onClose}
                selectedData={props.selectedData}
              />
            ) : (
              targetData !== undefined && (
                <ProductInfoCard
                  onClose={props.onClose}
                  selectedData={props.selectedData}
                />
              )
            )}
          </Card>
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
