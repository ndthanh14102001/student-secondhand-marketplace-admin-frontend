// project import
import Routes from 'routes'
import ThemeCustomization from 'themes'
import ScrollTop from 'components/ScrollTop'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getUserLogin } from 'utils/userLoginStorage'
import { useSelector } from 'react-redux'
import { dispatch } from 'store/index'
import { login } from 'store/reducers/login'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const loggedInUser = useSelector((state) => state?.login)
  useEffect(() => {
    const loggedInInfor = getUserLogin()
    if (!loggedInInfor) {
      navigate('/login')
    } else if (!loggedInUser?.id) {
      console.log('loggedInUser', loggedInUser)
      dispatch(login({ user: loggedInInfor?.user }))
    }
  }, [location?.pathname])
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  )
}

export default App
