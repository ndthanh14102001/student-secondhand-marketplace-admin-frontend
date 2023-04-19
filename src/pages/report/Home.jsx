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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import WarningIcon from '@mui/icons-material/Warning'
import AddUserModal from './AddUserModal'
import DeleteReportModal from './DeleteReportModal'
import PersonIcon from '@mui/icons-material/Person'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import { MenuItem, TextField } from '../../../node_modules/@mui/material/index'

export default function category() {
  const currencies = [
    {
      value: 'user',
      label: 'Người dùng',
    },
    {
      value: 'product',
      label: 'Sản phẩm',
    },
  ]
  const formatDate = (date) => {
    const inputDate = new Date(date)
    const minutes =
      inputDate.getMinutes() < 10
        ? `0${inputDate.getMinutes()}`
        : inputDate.getMinutes()

    return (
      `${inputDate.getDate().toString().padStart(2, '0')}-${(
        inputDate.getMonth() + 1
      )
        .toString()
        .padStart(
          2,
          '0',
        )}-${inputDate.getFullYear()} ${inputDate.getHours()}:` + minutes
    )
  }

  const [report, setReport] = React.useState([])
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

  // Using for Dialog delete user
  const [userData, setUserData] = React.useState({})
  const [openDeleteReportModal, setOpenDeleteReportModal] =
    React.useState(false)
  const handleOpenDeleteReportModal = (data) => {
    setOpenDeleteReportModal(true)
    setUserData(data)
  }
  const handleCloseDeleteReportModal = () => setOpenDeleteReportModal(false)

  const handleRefreshBoard = (deletedID) => {
    setReport(report.filter((item) => item.id !== deletedID))
    setChange(!change)
    handleCloseDeleteReportModal()
    console.log(deletedID)
  }

  //const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const requestUrl =
      process.env.REACT_APP_API_ENDPOINT +
      `/reports?pagination[page]=${selectedPage}&pagination[pageSize]=7&populate[product][filters][name][$contains]=${searchedKey}&populate[accused][filters][username][$contains]=${searchedKey}`
    fetch(requestUrl)
      .then((res) => res.json())
      .then((posts) => {
        setReport(posts.data)
      })
  }, [selectedPage, searchedKey, change])

  React.useEffect(() => {
    const requestUrl =
      process.env.REACT_APP_API_ENDPOINT +
      `/reports?populate[product][filters][name][$contains]=${searchedKey}&populate[accused][filters][username][$contains]=${searchedKey}`
    fetch(requestUrl)
      .then((res) => res.json())
      .then((posts) => {
        setElementNum(posts.data)
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
        <TextField
          id="outlined-select-currency"
          select
          label="Lọc báo cáo"
          sx={{ ml: '16px', width: '170px' }}
          helpText="wefkhuerfesfsehjfesj"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Mã báo cáo</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Loại báo cáo
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Người báo cáo
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Mục tiêu bị cáo cáo
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Thời gian
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="center">
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">
                  {row.attributes?.type === 'user' ? 'Người dùng' : 'Sản phẩm'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color:
                      row.attributes?.reporter?.data === undefined
                        ? 'lightgrey'
                        : '',
                  }}
                >
                  {row.attributes?.reporter?.data === undefined
                    ? 'Không có dữ liệu'
                    : row.attributes?.reporter.data?.attributes.username}
                </TableCell>
                <TableCell align="center">
                  {row.attributes?.accused?.data === undefined
                    ? row.attributes.product.data?.attributes.name
                    : row.attributes.accused.data?.attributes.username}
                </TableCell>
                <TableCell align="center">
                  {formatDate(row.attributes.createdAt)}
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteReportModal(row)}
                  >
                    <WarningIcon />
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
