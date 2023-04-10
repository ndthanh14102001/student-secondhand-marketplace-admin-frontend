import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ProductRow = ({ product, onEdit, onDelete }) => {
  const { id, name, price, quantity } = product

  return (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{quantity}</TableCell>
      <TableCell align="center">
        <IconButton color="primary" onClick={() => onEdit(product)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
