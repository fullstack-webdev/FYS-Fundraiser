import './public-pages.scss'

import { Container } from 'reactstrap'

const Footer = () => {
  return (
    <div id="footer">
        {/* <div className='myComponent' style={{background: "#232d41"}}>
            <Container fluid="md" className='container'>
                <div className='row'>
                    <div className="col-md-8 myFlex">
                        <h1 className="myRight" style={{color: "white", fontWeight: "bold", fontSize: "2rem"}}>Ready to make a difference?</h1>
                    </div>
                    <div className="col-md-4 myFlex">
                        <a className="myLeft getStarted_btn" href="public/get-started"><span style={{fontSize: "1.2rem"}}>Get Started</span> <span><svg style={{width: "1.6rem", height: "1.6rem", marginLeft: "1rem", marginBottom: "5px"}} viewBox="0 0 512 512" height="1em" width="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path></svg></span></a>
                    </div>
                </div>
            </Container>
        </div> */}
        <div style={{background: "#222222", padding: "2rem"}}>
            <Container fluid="md" className='container'>
                <div className='row'>
                    <div className='col-md-6 myFlex'>
                        <a href='https://fundyouthsports.com/' className="navLink">Home</a>
                        <a href='https://fundyouthsports.com/how-it-works' className="navLink">How It Works</a>
                        <a href='https://fundyouthsports.com/our-story' className="navLink">Our Story</a>
                        <a href='https://fundyouthsports.com/contact-us' className="navLink">Contact-Us</a>
                    </div>
                    <div className='col-md-6 myFlex'>
                        <h5 className='myRight' style={{color: "white"}}>©2022 Fund Youth Sports, Inc.</h5>
                    </div>
                </div>
            </Container>
        </div>
    </div>
    
  )
}

export default Footer
