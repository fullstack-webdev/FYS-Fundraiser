import '../public-pages/public-pages.scss'

import React, {
  useEffect,
  useState
} from 'react'

import { Button, Container } from 'reactstrap'

import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

import Footer from '../public-pages/Footer'
import NavBar from '../public-pages/NavBar'

const StripeConnect = () => {
  
  const { sourceId } = useParams()
  const [account, setAccount] = useState()
  
  async function getAccount() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/stripe/account?source=website&sourceId=${sourceId}`)

    setAccount(res.data.data)
  }
  useEffect(() => {
    getAccount()
  }, [])

  return (
    <div>
      <NavBar></NavBar>
      <div id='thankyou' style={{background: "white"}}>
        <div className='myComponent'>
          <Container fluid="md" className='container' style={{maxWidth:"800px"}}>
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h2 className='myCenter' style={{color: "black", fontWeight: "bold"}}>Thanks Thomas Brown</h2>
            </div>
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h4 className='myCenter' style={{color: "black"}}>We have sent you an onboarding email with instructions on next steps and how to access our portal to manage your campaigns.</h4>
            </div>
            {/* <div className='myFlex' style={{paddingBottom: "1rem"}}>
              <img className="myCenter" src={require('@src/assets/images/logo/stripe-logo-white.svg').default} style={{width: "290px"}}></img>
            </div> */}
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h5 className='myCenter' style={{lineHeight: "1.5rem", textAlign: "center"}}>We use Stripe to make sure you get paid in real-time and to keep your banking details secure. Click Continue below to set up a Stripe Express account to better manage your donation dollars.</h5>
            </div>
            <div className='myFlex' style={{paddingBottom: "1rem"}}>
              <Button href={`${(account && account.url) || ''}`} color='primary' block className='mb-75'>
                Setup your Stripe Express Account
              </Button>
            </div>
            
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default StripeConnect
