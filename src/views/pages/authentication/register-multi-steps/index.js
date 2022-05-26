// ** Styles
import '@styles/react/pages/page-authentication.scss'

import {
  useRef,
  useState
} from 'react'

// ** Third Party Components
import {
  CreditCard,
  Home,
  User
} from 'react-feather'
// ** React Imports
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import {
  Col,
  Row
} from 'reactstrap'

// ** Custom Components
import Wizard from '@components/wizard'

import AccountDetails from './steps/AccountDetails'
// ** Steps
import Billing from './steps/Billing'
import PersonalInfo from './steps/PersonalInfo'

const RegisterMultiSteps = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Account',
      subtitle: 'Enter username',
      icon: <Home size={18} />,
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'Personal',
      subtitle: 'Enter Information',
      icon: <User size={18} />,
      content: <PersonalInfo stepper={stepper} />
    },
    {
      title: 'Billing',
      id: 'step-billing',
      subtitle: 'Payment Details',
      icon: <CreditCard size={18} />,
      content: <Billing stepper={stepper} />
    }
  ]

  const source = require('@src/assets/images/pages/create-account.svg').default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          <img src={require('@src/assets/images/logo/FYS-horizontal.png').default} style={{width: "auto", height: "30px"}}></img>
          <h2 className='brand-text text-primary ms-1'>Fundraising Portal</h2>
        </Link>
        <Col lg='3' className='d-none d-lg-flex align-items-center p-0'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center'>
            <img className='img-fluid w-100' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col lg='9' className='d-flex align-items-center auth-bg px-2 px-sm-3 px-lg-5 pt-3'>
          <div className='width-700 mx-auto'>
            <Wizard
              ref={ref}
              steps={steps}
              instance={el => setStepper(el)}
              headerClassName='px-0'
              contentWrapperClassName='px-0 mt-4'
              className='register-multi-steps-wizard shadow-none'
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterMultiSteps
