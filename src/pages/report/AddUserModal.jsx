import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddUserModal(props) {
   return (
      // <div>
      //   <Button onClick={handleOpen}>Open modal</Button>
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
            <Card sx={{ maxWidth: 550, margin: 'auto', marginTop: 10, padding: '25px 0px', position: 'relative' }}>
               <Typography variant="h5" align="center">
                  Thêm người dùng
               </Typography>
               <CardContent align="center">
                  <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                     <TextField label="Mã danh mục" name="id" multiline maxRows={1} fullWidth />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                     <TextField label="Tên danh mục" name="Name" multiline maxRows={1} />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                     <TextField label="Mã danh mục cha" name="BirthDay" multiline maxRows={1} />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '450px' }} variant="outlined">
                     <TextField label="Hình ảnh" name="Gender" multiline maxRows={1} />
                  </FormControl>
               </CardContent>
               <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                     variant="contained"
                     sx={{ marginRight: '20px', textTransform: 'lowercase' }}
                     startIcon={<AddCircleOutlineIcon />}
                  >
                     Thêm
                  </Button>
                  <Button
                     variant="contained"
                     sx={{ marginRight: '20px', textTransform: 'lowercase' }}
                     color="error"
                     startIcon={<RestartAltIcon />}
                  >
                     Đặt lại
                  </Button>
               </CardActions>
            </Card>
         </Fade>
      </Modal>
      // </div>
   );
}
