// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** React Imports
import { useContext } from 'react'

import axios from 'axios'
import {
  Coffee,
  Lock,
  X
} from 'react-feather'
import {
  Controller,
  useForm
} from 'react-hook-form'
// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {
  Link,
  useNavigate
} from 'react-router-dom'
// ** Reactstrap Imports
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row
} from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
// ** Context
import { AbilityContext } from '@src/utility/context/Can'
// ** Actions
import { handleLogin } from '@store/authentication'
// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to fYS. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}
const ToastError = ({ t }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='danger' icon={<Lock size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6></h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t?.id)} />
        </div>
        <span>The user name or password are incorrect. This is easily corrected by typing the correct user name and password.</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: '7oEjbWXkkAJ8XZbe',
  loginEmail: 'tom@devnostic.com'
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const illustration = skin === 'dark' ? '3.jpg' : '3.jpg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/login`, {
        email: data.loginEmail,
        password: data.password
      })
        .then(res => {
          if (!(res.data.hasError)) {
            const data = { ...res.data.data, accessToken: res.data.data.token, refreshToken: res.data.data.token, abilities: res?.data?.data?.abilities }
            dispatch(handleLogin(data))
            ability.update(res.data.data?.abilities)
            navigate(getHomeRouteForLoggedInUser(res.data.data.role || 'admin'))
            toast(t => (
              <ToastContent t={t} role={data.role || 'admin'} name={res.data.data.email || res.data.data.username} />
            ))
          } else {
            toast(t => (
              <ToastError t={t} />
            ))
          }
        })
        .catch(err => console.log(err))
      
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={require('@src/assets/images/logo/FYS-horizontal.png').default} style={{ width: "auto", height: "30px" }}></img>
          <h2 className='brand-text text-primary ms-1'>Fundraiser Console</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-6' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to FundYouthSports! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to manage your campaigns.</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
