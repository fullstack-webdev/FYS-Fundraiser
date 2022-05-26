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

const StripeComplete = () => {
  
  const { organizationId } = useParams()
  const [account, setAccount] = useState()
  
  async function getAccount() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/organization/organization=${organizationId}`)

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
              <h2 className='myCenter' style={{color: "black", fontWeight: "bold"}}>Thanks Thomas Brown ({(account && account.name) || ""})</h2>
            </div>
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h4 className='myCenter' style={{color: "black"}}>You are now connected and can accept real-time donations!</h4>
            </div>           
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default StripeComplete
