import React, { useCallback, useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'

import RestartAltIcon from '@mui/icons-material/RestartAlt'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function UpdateCategoryModal(props) {
  const [value, setValue] = useState(props.categoryParent)
  const handleCreateNewItem = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }
  // Thông báo snackbar
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false)
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessSnackbar(false)
    setOpenErrorSnackbar(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const [error, setError] = useState(null)
  // const [modifiedData, setModifiedData] = useState({
  //   id: props.categoryID,
  //   name: props.categoryName,
  //   description: props.categoryDescription,
  //   parent: props.categoryParent,
  // })

  // console.log(modifiedData)

  // const handleInputChange = useCallback(({ target: { name, value } }) => {
  //   setModifiedData((prevData) => ({ ...prevData, [name]: value }))
  // }, [])

  const handleUpdateSubmition = async (e) => {
    e.preventDefault()
    console.log({
      name: document.getElementById('update_name').value,
      description: document.getElementById('update_description').value,
      parent: value,
    })
    await axios
      .put(
        process.env.REACT_APP_API_ENDPOINT + '/categories/' + props.categoryID,
        {
          data: {
            name: document.getElementById('update_name').value,
            description: document.getElementById('update_description').value,
            parent: value,
            children: null,
          },
        },
      )
      .then((response) => {
        console.log(response)
        setOpenSuccessSnackbar(true)
      })
      .catch((error) => {
        setError(error)
        setOpenErrorSnackbar(true)
      })
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
              maxWidth: 550,
              margin: 'auto',
              marginTop: 10,
              padding: '25px 0px',
              position: 'relative',
            }}
          >
            <Typography variant="h5" align="center">
              Cập nhật danh mục
            </Typography>
            <CardContent align="center">
              <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                <TextField
                  label="Tên danh mục"
                  id="update_name"
                  name="name"
                  // onChange={handleInputChange}
                  defaultValue={props.categoryName}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                <TextField
                  label="Mô tả"
                  id="update_description"
                  name="description"
                  // onChange={handleInputChange}
                  defaultValue={props.categoryDescription}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                <TextField
                  id="update_parent"
                  select
                  name="parent"
                  label="Danh mục cha"
                  align="left"
                  onChange={handleCreateNewItem}
                  value={value ? value : props.categoryParent}
                >
                  {props.categoryData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.attributes.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              {/* <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                <TextField
                  label="Mã danh mục con"
                  id="children"
                  name="children"
                  onChange={handleInputChange}
                  value={modifiedData.children}
                  multiline
                  maxRows={1}
                />
              </FormControl> */}
              {error}
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{ marginRight: '20px', textTransform: 'lowercase' }}
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleUpdateSubmition}
              >
                Cập nhật
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
      {/* Thông báo thành công */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Cập nhật danh mục thành công"
        action={action}
      />
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Cập nhật danh mục thất bại"
        action={action}
      />
    </div>
  )
}
