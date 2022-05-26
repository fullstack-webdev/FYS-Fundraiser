import './public-pages.scss'
import '@styles/react/libs/input-number/input-number.scss'

import React, {
  useEffect,
  useState
} from 'react'

import axios from 'axios'
import {
  Mail,
  User
} from 'react-feather'
import { useParams } from 'react-router-dom'
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Label
} from 'reactstrap'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutForm from './CheckoutForm'
import Footer from './Footer'
import NavBar from './NavBar'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY)
//const stripePromise = loadStripe("pk_test_51KnwltAfcKEcHq5CQqmctsPDYdYzaU3NviORmdsys9vxPDfyxisuE6BWkecwmSu3cjLeNVVwRPFLEbHZuX8f6FGk003H6nGaZr")

const DonationForm = () => {
  const [isContinue, setIsContinue] = useState(false)
  const [customDonation, setCustomDonation] = useState(false)
  const [donationAmount, setDonationAmount] = useState(10)
  const [trasectionFee, setTrasectionFee] = useState(true)
  const [donationCheckbox, setDonationCheckbox] = useState(true)
  const [formValues, setFormValues] = useState({
      firstName:"",
      lastName:"",
      email:"",
      message: ""
  })

  const { campaign_slug } = useParams()
  const [campaign, setCampaign] = useState()

  async function getCampaign() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/campaign/donate?url_slug=${campaign_slug}&ip_address=127.0.0.1`)
    setCampaign(res.data.data[0])
  }
  useEffect(() => {
    getCampaign()
  }, [campaign_slug])
  // const payment_methods = [
  //   { type: "paypal", text: "Credit Card", checked: true },
  //   { type: "applepay", text: "Apple Pay", checked: false },
  //   { type: "googlepay", text: "Google Pay", checked: false }
  // ]
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {

    if (clientSecret) {
      console.log("clientSecret", clientSecret)
      setIsContinue(!isContinue)
    }
    
  }, [clientSecret])

  const updateClientSecret = (value) => {
    console.log("1---> updateClientSecret")
    setClientSecret(value)
  }
  function paymentIntent() {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/stripe/pi`, {
      cardAmount: donationAmount * 100,
      transferGroup: "transfer11123456",
      items: "asdf",
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      user: '',
      campaign: campaign_slug,
      organization: '',
      fundraiser: ''
    })
      .then((data) => {
        setClientSecret(data.data.data.client_secret)
        
      })
  }
  const appearance = {
    theme: 'stripe'
  }

  const changeDonationAmount = (e) => {
    const ammount = parseInt(e.target.innerHTML.split('$')[1])
    setDonationAmount(ammount)
    setCustomDonation(false)
  }

  const addCustomDonationAmount = (e) => {
    const ammount = e.target.value
    setDonationAmount(ammount)
  }

  const ChangeFormValues = (e) => {
    const key = e.target.name
    const val = e.target.value
    setFormValues(preVal => {
      return {
        ...preVal,
        [key]: val
      }
    })
  }

  const setActiveTab = (e) => {
    e.preventDefault()
    paymentIntent()
  }
  const options = {
    clientSecret,
    appearance
  }
  const PaymentMethod = ({ type, text, checked, idx }) => {
    return (
      <div className='col-md-4 paymentMethod' style={{ padding: "0rem 2rem" }}>
        <div className='row' style={{ background: "rgb(240, 240, 240)", padding: "1rem 0.5rem 1rem 0.5rem", borderRadius: "8px", height: "100%" }}>
          <div className='form-check myFlex'>
            <Label className='form-check-label myLeft' for={`paymentMethodRadio${idx}`} style={{ height: "100%" }}>
              <div className='row' style={{ height: "100%" }}>
                <div className='col-md-4 myFlex' htmlFor='paymentMethodRadio'>
                  <img src={require(`@src/assets/images/public_pages/${type}.png`).default} className='myCenter'></img>
                </div>
                <div className='col-md-8 myFlex' htmlFor='paymentMethodRadio'>
                  <h3 className='myLeft' style={{ fontWeight: "bold", color: "black" }}>{text}</h3>
                </div>
              </div>
            </Label>
            <Input type='radio' name='paymentMethodRadio' id={`paymentMethodRadio${idx}`} className="myRight" defaultChecked={checked} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar></NavBar>
      <div id='donationform'>
        <div className='myComponent' style={{ background: "#f0f0f0" }}>
          <Container fluid="md" className='container'>
            <div className='row'>
              <div className='col-md-3 myFlex'>
                <img src={campaign?.logoImage} className='myCenter' style={{maxWidth:"100%"}}></img>
              </div>
              <div className='col-md-9 myFlex'>
                <div className='myLeft' style={{ marginLeft: "2rem" }}>
                  <div className='myFlex' style={{ paddingBottom: "2rem" }}>
                    <p className="myLeft" style={{ fontSize: "2.5rem", lineHeight: "2.5rem", fontWeight: "bold", color: "black" }}>
                      {campaign?.title}
                    </p>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "2.5rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black" }}>
                      {campaign?.organization?.name}</h5>
                  </div>
                  <div className='myFlex' style={{ paddingBottom: "0rem" }}>
                    <h5 className="myLeft" style={{ fontWeight: "bold", color: "black", lineHeight: "1.5rem" }}>
                      {campaign?.shortDescription}</h5>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className='myComponent' style={{ background: "white" }}>
          
          {!isContinue && (<Container fluid="md" className='container'>
            <div className="myFlex" style={{ paddingBottom: "3rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Choose Your Donation Amount</h1>
            </div>
            <div className='row' style={{ paddingBottom: "4rem" }}>
              <div className='col-md-1'></div>
              <div className='col-md-4' style={{ padding: "1rem" }}>
                <Input type='text' id='readonlyInput' readOnly={!customDonation} value={`${donationAmount}`} style={{ textAlign: "center", marginBottom: "2rem", height: "4rem", fontSize: "1.5rem" }} onChange={addCustomDonationAmount} />
                <div className='form-check form-check-primary'>
                  <Input type='checkbox' id='checkbox' checked={trasectionFee} onChange={() => { setTrasectionFee(!trasectionFee) }} />
                  <Label className='form-check-label label' for='checkbox' >
                    I like to cover all transaction fees
                  </Label>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple  color='primary' className="myCenter donation_btn " onClick={changeDonationAmount}>$10</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary'  className="myCenter donation_btn" onClick={changeDonationAmount}>$20</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={changeDonationAmount}>$50</Button.Ripple>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={changeDonationAmount}>$75</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={changeDonationAmount}>$100</Button.Ripple>
                  </div>
                  <div className="col-4 myFlex" style={{ padding: ".5rem" }}>
                    <Button.Ripple color='primary' className="myCenter donation_btn" onClick={() => { setCustomDonation(true) }}>CUSTOM</Button.Ripple>
                  </div>
                </div>
              </div>
              <div className='col-md-1'></div>
            </div>
            <div style={{ borderBottom: "solid 1px rgb(200, 200, 200)", marginBottom: "4rem" }}></div>
            <div className="myFlex" style={{ paddingBottom: "2rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Donor Information</h1>
            </div>
            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-4'>
                <Label className='form-label label' for='firstname'>
                  First name
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText>
                    <User size={14} />
                  </InputGroupText>
                  <Input type='text' id='firstname' placeholder='First name' name="firstName" value={formValues.firstName} onChange={ChangeFormValues} />
                </InputGroup>
              </div>
              <div className='col-md-4'>
                <Label className='form-label label' for='lastname'>
                  Last name
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText>
                    <User size={14} />
                  </InputGroupText>
                  <Input type='text' id='lastname' placeholder='Last name' name="lastName" value={formValues.lastName} onChange={ChangeFormValues} />
                </InputGroup>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <Label className='form-label label' for='email'>
                  Email
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText>
                    <Mail size={14} />
                  </InputGroupText>
                  <Input type='email' id='email' placeholder='Enter your email' name="email" value={formValues.email} onChange={ChangeFormValues} />
                </InputGroup>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <Label className='form-label label' for='message'>
                  Enter a private message to {'{{fundraiser_name}}'}
                </Label>
                <InputGroup className='input-group-merge mb-2'>
                  <InputGroupText style={{}}>
                    <Mail size={14} />
                  </InputGroupText>
                  <Input type='textarea' id='message' rows='3' placeholder='Enter your message' name="messages" value={formValues.message} onChange={ChangeFormValues} />
                </InputGroup>
              </div>
              <div className='col-md-2'></div>
            </div>

            <div className='row' style={{ paddingBottom: "2rem" }}>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <div className='form-check form-check-primary'>
                  <Input type='checkbox' id='checkbox1' checked={donationCheckbox} onChange={() => { setDonationCheckbox(!donationCheckbox) }} />
                  <Label className='form-check-label label' for='checkbox1'>
                    Make this an anonymous donation
                  </Label>
                </div>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div className='row' style={{ paddingBottom: "1rem" }}>
              <div className='col-md-2 myFlex'>
                <a onClick={setActiveTab} className="myRight donate_btn" href="thankyou">Continue</a>
              </div>
            </div>


          </Container>)}
          {isContinue && (<Container fluid="md" className='container'>
            <div className="myFlex" style={{ paddingBottom: "3rem" }}>
              <h1 className='myCenter' style={{ color: "black", fontWeight: "bold" }}>Payments Method</h1>
            </div>
            {(
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm formData={formValues} donationAmount={donationAmount} updateClientSecret={updateClientSecret}  />
              </Elements>
            )}
            <div className='row' style={{ paddingBottom: "0rem" }}>
              <div className='col-md-2 myFlex'>
                {/* <a className="myLeft donate_btn" href="thankyou">Donate Now</a> */}
              </div>
            </div>
          </Container>)}
          
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DonationForm