import './public-pages.scss'
import React, {
  useEffect, useState
} from 'react'

import { Container } from 'reactstrap'
import axios from 'axios'

import Footer from './Footer'
import NavBar from './NavBar'

const ThankYou = () => {
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/stripe/sd`, {
      ...params
    })
      .then((data) => { 
        setAmount(data.data.data.donationAmount)
        setName(data.data.data.name)
      })

  }, [])

  return (
    <div>
      <NavBar></NavBar>
      <div id='thankyou' style={{background: "white"}}>
        <div className='myComponent'>
          <Container fluid="md" className='container'>
            {/* <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <img className="myCenter" src={require('@src/assets/images/public_pages/congratulation.svg').default} style={{width: "490px"}}></img>
            </div> */}
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h2 className='myCenter' style={{color: "black", fontWeight: "bold"}}>THANKS {name}</h2>
            </div>
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h4 className='myCenter' style={{color: "black"}}>Your Donation of ${amount}.00 has been Processed!</h4>
            </div>
            <div className='myFlex' style={{paddingBottom: "5rem"}}>
              <h5 className='myCenter' style={{lineHeight: "1.5rem", textAlign: "center"}}>
                 We appreciate your help in continuing our mission to provide opportunities for personal growth and development in our athletes through youth sports programs.
                 It makes a huge difference when people like you make an investment in our young athletes.
                 Thank you for making a difference.
              </h5>
            </div>
            <div className='row myFlex' style={{paddingBottom: "3rem"}}>
              <div className='col-md-6' style={{padding: "10px"}}>
                <div style={{background: "#efefef", padding: "2rem"}}>
                  <div className='myFlex' style={{paddingBottom: "2rem"}}>
                    <img className="myCenter" src={require('@src/assets/images/public_pages/thanks1.svg').default}></img>
                  </div>
                  <div className='myFlex' style={{paddingBottom: "2rem"}}>
                    <h3 className='myCenter' style={{fontSize: "1.4rem", color: "black", fontWeight: "bold", textAlign: "center"}}>Notify Me of Future Fund Paisors for Billy</h3>
                  </div>
                  <div className='myFlex' style={{paddingBottom: "1rem"}}>
                    <h5 className='myCenter' style={{fontWeight: "bold", lineHeight: "1.5rem", textAlign: "center"}}>Consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-6' style={{padding: "10px"}}>
                <div style={{background: "#efefef", padding: "2rem"}}>
                  <div className='myFlex' style={{paddingBottom: "2rem"}}>
                    <img className="myCenter" src={require('@src/assets/images/public_pages/thanks2.svg').default}></img>
                  </div>
                  <div className='myFlex' style={{paddingBottom: "2rem"}}>
                    <h3 className='myCenter' style={{fontSize: "1.4rem", color: "black", fontWeight: "bold", textAlign: "center"}}>Create an Account to Track My Donations</h3>
                  </div>
                  <div className='myFlex' style={{paddingBottom: "1rem"}}>
                    <h5 className='myCenter' style={{fontWeight: "bold", lineHeight: "1.5rem", textAlign: "center"}}>Consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{padding: "3rem 0rem"}}>
              <div style={{width: "20%"}}></div>
              <div style={{width: "3%", padding: "5px"}} className="myFlex">
                <div className="myCenter" style={{background: "#3157dd", width: "100%", height: "3px"}}></div>
              </div>
              <div style={{width: "13%", padding: "5px"}} className="myFlex">
                <div className="myCenter" style={{background: "#3157dd", width: "100%", height: "3px"}}></div>
              </div>
              <div style={{width: "28%"}} className="myFlex">
                <h2 className="myCenter" style={{color: "black", fontWeight: "bold", fontSize: "2rem"}}> Share on Social</h2>
              </div>
              <div style={{width: "3%", padding: "5px"}} className="myFlex">
                <div className="myCenter" style={{background: "#3157dd", width: "100%", height: "3px"}}></div>
              </div>
              <div style={{width: "13%", padding: "5px"}} className="myFlex">
                <div className="myCenter" style={{background: "#3157dd", width: "100%", height: "3px"}}></div>
              </div>
              <div style={{width: "20%"}}>
              </div>
            </div>
            <div className='row' style={{paddingBottom: "3rem"}}>
              <div className='socialLink d-flex align-items-center gap-3 justify-content-center'>
                <a href="#" className="socialLinkItem fillLink">
                  <svg width="15" height="28" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.20013 6.46657L9.28345 11.3832L13.6668 11.3166C13.9835 11.3166 14.2168 11.5999 14.1668 11.8999L13.5834 15.0832C13.5334 15.3166 13.3335 15.4832 13.1001 15.4999L9.35013 15.5666L9.55012 27.6499L4.55012 27.7332L4.35013 15.6499L1.51677 15.6999C1.23344 15.6999 1.01679 15.4832 1.01679 15.1999L0.966797 12.0332C0.966797 11.7499 1.18344 11.5332 1.46678 11.5332L4.30013 11.4832L4.21677 6.06657C4.16677 3.2999 6.36679 1.03323 9.13345 0.983233L13.6334 0.916565C13.9168 0.916565 14.1335 1.13324 14.1335 1.41657L14.2001 5.41657C14.2001 5.69991 13.9834 5.91656 13.7001 5.91656L9.70011 5.98323C9.41678 5.96657 9.20013 6.1999 9.20013 6.46657Z" fill="#6C707D">
                  </path>
                  </svg>
                </a>
                <a href="#" className="socialLinkItem strokeLink">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9998 29.3334H19.9998C26.6665 29.3334 29.3332 26.6667 29.3332 20V12C29.3332 5.33335 26.6665 2.66669 19.9998 2.66669H11.9998C5.33317 2.66669 2.6665 5.33335 2.6665 12V20C2.6665 26.6667 5.33317 29.3334 11.9998 29.3334Z" stroke="#6C707D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15.9997 20.6667C18.577 20.6667 20.6663 18.5774 20.6663 16C20.6663 13.4227 18.577 11.3334 15.9997 11.3334C13.4223 11.3334 11.333 13.4227 11.333 16C11.333 18.5774 13.4223 20.6667 15.9997 20.6667Z" stroke="#6C707D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M23.5147 9.33335H23.5301" stroke="#6C707D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    </path>
                  </svg>
                </a>
                <a href="#" className="socialLinkItem fillLink">
                  <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.8412 5.98121C25.8602 6.24433 25.8602 6.50595 25.8602 6.76757C25.8602 14.7741 19.9205 24 9.06558 24C5.72131 24 2.61445 23.0061 0 21.28C0.474822 21.3357 0.932058 21.3552 1.42593 21.3552C4.08287 21.3618 6.66457 20.4503 8.75489 18.7676C7.52303 18.7447 6.32887 18.3277 5.33916 17.5748C4.34946 16.822 3.61361 15.7708 3.23436 14.5681C3.59927 14.6237 3.96564 14.6613 4.3496 14.6613C4.87865 14.6613 5.41062 14.5861 5.9045 14.4553C4.56761 14.1784 3.36548 13.4349 2.50251 12.3514C1.63955 11.2678 1.16902 9.91101 1.17093 8.51172V8.43654C1.95791 8.8861 2.87091 9.16727 3.83814 9.20486C3.02785 8.65243 2.36344 7.9028 1.90418 7.02287C1.44492 6.14293 1.2051 5.16004 1.20611 4.16188C1.20611 3.03721 1.49774 2.00576 2.0092 1.10663C3.49249 2.9786 5.34248 4.51005 7.43937 5.60179C9.53625 6.69353 11.8333 7.32121 14.1816 7.44418C14.0908 6.99311 14.0351 6.5255 14.0351 6.05638C14.0347 5.26094 14.1871 4.47321 14.4836 3.73824C14.7802 3.00327 15.215 2.33546 15.7632 1.77299C16.3114 1.21053 16.9623 0.764432 17.6787 0.460211C18.395 0.155989 19.1628 -0.000394506 19.9381 7.4737e-07C21.6381 7.4737e-07 23.1725 0.730736 24.2511 1.91254C25.5726 1.65035 26.84 1.15538 27.9969 0.449568C27.5564 1.84912 26.6336 3.03587 25.4015 3.7875C26.5736 3.65034 27.7191 3.3341 28.8 2.84927C27.9927 4.05678 26.9923 5.11567 25.8412 5.98121V5.98121Z" fill="#6C707D"></path>
                  </svg>
                </a>
                <a href="#" className="socialLinkItem strokeLink">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.0835 29.0416H9.91683C5.66683 29.0416 2.8335 26.9166 2.8335 21.9583V12.0416C2.8335 7.08331 5.66683 4.95831 9.91683 4.95831H24.0835C28.3335 4.95831 31.1668 7.08331 31.1668 12.0416V21.9583C31.1668 26.9166 28.3335 29.0416 24.0835 29.0416Z" stroke="#6C707D" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M24.0832 12.75L19.649 16.2917C18.1898 17.4533 15.7957 17.4533 14.3365 16.2917L9.9165 12.75" stroke="#6C707D" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default ThankYou
