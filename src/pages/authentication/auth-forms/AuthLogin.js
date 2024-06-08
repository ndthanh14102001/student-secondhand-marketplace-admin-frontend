import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

// project import
import FirebaseSocial from './FirebaseSocial'
import AnimateButton from 'components/@extended/AnimateButton'

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import axios from '../../../../node_modules/axios/index'
import { noRememberLogin, rememberLogin } from 'utils/userLoginStorage'
import { dispatch } from 'store/index'
import { login } from 'store/reducers/login'

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const navigate = useNavigate()
  const [checked, setChecked] = React.useState(false)

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const checkRoleByUserId = async (userId) => {
    const requestUrl = process.env.REACT_APP_API_ENDPOINT + '/users/' + userId
    const response = await axios.get(requestUrl, {
      params: {
        populate: ['role'],
      },
    })
    return response?.data?.role?.type === 'admin'
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false })
            setSubmitting(false)
            const requestUrl =
              process.env.REACT_APP_API_ENDPOINT + '/auth/local'

            fetch(requestUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                identifier: values.email,
                password: values.password,
              }),
            })
              .then((res) => res.json())
              .then(async (data) => {
                if (data?.error) {
                  setErrors({ submit: data?.error?.message })
                } else if (await checkRoleByUserId(data?.user?.id)) {
                  if (checked) {
                    rememberLogin(data?.jwt, data?.user)
                  }
                  noRememberLogin(data?.jwt, data?.user)
                  dispatch(login({ user: data?.user }))
                  navigate('/')
                } else {
                  setErrors({
                    submit: 'Bạn không có quyền truy cập vào trang này',
                  })
                }
              })
              .catch((error) => {
                // Xử lý lỗi nếu có
                // setErrors({ submit: err.message })
              })
          } catch (err) {
            console.log('err', err)
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">Ghi nhớ đăng nhập</Typography>
                    }
                  />
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Đăng nhập
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Login with</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthLogin
