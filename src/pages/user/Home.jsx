import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box } from '@mui/system'
import Pagination from '@mui/material/Pagination'
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

// Icon import
import SearchIcon from '@mui/icons-material/Search'
import ConstructionIcon from '@mui/icons-material/Construction'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AddUserModal from './AddUserModal'
import DeleteUserModal from './DeleteUserModal'

export default function category() {
  const [customer, setCustomer] = React.useState([])
  const [elementNum, setElementNum] = React.useState([])
  const [selectedPage, setSelectedPage] = React.useState('')
  const [change, setChange] = React.useState(true)

  const handleGetPage = (event, elementNum) => {
    setSelectedPage(elementNum)
  }

  const [searchedKey, setSearchedKey] = React.useState('')

  const handleGetSearch = (e) => {
    setSearchedKey(e.target.value)
  }

  // Using for Modal Add user
  const [openAddUserModal, setOpenAddUserModal] = React.useState(false)
  const handleOpenAddUserModal = () => setOpenAddUserModal(true)
  const handleCloseAddUserModal = () => setOpenAddUserModal(false)

  // Using for Dialog delete user
  const [userData, setUserData] = React.useState({})
  const [openDeleteUserModal, setOpenDeleteUserModal] = React.useState(false)
  const handleOpenDeleteUserModal = (data) => {
    setOpenDeleteUserModal(true)
    setUserData(data)
  }
  const handleCloseDeleteUserModal = () => setOpenDeleteUserModal(false)

  const handleRefreshBoard = (deletedID) => {
    setCustomer(customer.filter((item) => item.id !== deletedID))
    setChange(!change)
    handleCloseDeleteUserModal()
    console.log(deletedID)
  }

  //const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const requestUrl = `http://localhost:3000/api/user?_limit=7&_page=${selectedPage}&q=${searchedKey}`
    fetch(requestUrl)
      .then((res) => res.json())
      .then((posts) => {
        setCustomer(posts)
      })
  }, [selectedPage, searchedKey, change])

  React.useEffect(() => {
    const requestUrl = `http://localhost:3000/api/user?q=${searchedKey}`
    fetch(requestUrl)
      .then((res) => res.json())
      .then((posts) => {
        setElementNum(posts)
      })
  }, [searchedKey])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
        <Box>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '300px',
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={searchedKey}
              onChange={handleGetSearch}
              placeholder="Tìm kiếm theo tên, mã danh mục"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
          </Paper>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', margin: '0 10px' }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleOpenAddUserModal}
          >
            Thêm danh mục
          </Button>
          <AddUserModal
            open={openAddUserModal}
            onClose={handleCloseAddUserModal}
          />
          <DeleteUserModal
            open={openDeleteUserModal}
            onClose={handleCloseDeleteUserModal}
            data={userData}
            onAfterDelete={handleRefreshBoard}
          />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Mã người dùng</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">
                Họ và tên
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="right">
                Mô tả
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Ngày sinh
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="right">
                Giới tính
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.birthday}</TableCell>
                <TableCell align="center">{row.sex}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <ConstructionIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteUserModal(row)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box spacing={2} sx={{ padding: '20px' }}>
        <Pagination
          count={Math.ceil(elementNum.length / 7)}
          onChange={handleGetPage}
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  )
}
