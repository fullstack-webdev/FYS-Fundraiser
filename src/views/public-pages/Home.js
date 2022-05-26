import './public-pages.scss'

import React, {
  useEffect,
  useState
} from 'react'

import axios from 'axios'
import Carousel from 'react-elastic-carousel'
import { useParams } from 'react-router-dom'
import {
  Container,
  Progress
} from 'reactstrap'

import Footer from './Footer'
import NavBar from './NavBar'

const Team = ({ team }) => {
  return (
    <div className='col-md-4' style={{mamrginBottom: "2rem"}}>
      <div style={{background: "white", borderRadius: '1rem', padding: "2rem", marginBottom: "2rem"}}>
        <div className='myFlex' style={{paddingBottom: "1rem"}}>
          <img src={(team && team.organization.logo) || ""} className='myCenter' alt="logo" style={{minHeight: "50px"}}></img>
        </div>
        <div className='myFlex' style={{paddingBottom: "1rem"}}>
          <h3 style={{color: "black", fontWeight: "bold"}} className="myCenter">{(team && team.organization.name) || ""}</h3>
        </div>
        <div className='myFlex' style={{paddingBottom: "1rem"}}>
          <p style={{fontWeight: "bold", paddingBottom: "1rem", fontSize: "1rem"}} className="myLeft">${(team && team.currentDonations.toString()) || ""} Raised of ${(team && team.fundRaisingGoal.toString()) || ""} Goal</p>
        </div>
        <div className='myFlex' style={{paddingBottom: "2rem"}}>
          <Progress className='myCenter' style={{width: "100%"}}
              color="success"
              value={(team && team.currentDonations * 100 / team.fundRaisingGoal) || 0}
            />
        </div>
        <div className='myFlex' style={{paddingBottom: "0rem"}}>
          <a className="viewTeam_btn myFlex" href="#">
              <div className='myCenter'>
                View Team <span><svg className="svg" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.92505 16.6L13.3584 11.1667C14 10.525 14 9.475 13.3584 8.83334L7.92505 3.4" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
              </div>
            
            </a>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const { campaign_slug } = useParams()
  const [campaign, setCampaign] = useState()
  const [teams, setTeams] = useState()
  async function getTeams() {
    const id = (campaign && campaign.id) || window.location.pathname.split("/").pop()
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/organization_campaign/donate?campaign=${id}`)
    setTeams(res.data.data)
  }
  async function getCampaign() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/campaign/donate?url_slug=${campaign_slug}&ip_address=127.0.0.1`)
    setCampaign(res.data.data[0])
  }
  useEffect(() => {
    getCampaign()
    console.log(campaign)
  }, [campaign_slug])
  useEffect(() => {
    getTeams()
    console.log(teams)
  }, [campaign])

  return (
    <div>
      <NavBar></NavBar>
      <div id='home'>
        <div id='banner' className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='row'>
              <div className='col-md-4 myFlex'>
                <img src={(campaign && campaign.logoImage) || ""} style={{maxWidth:"100%"}} alt="logoImage" className='myCenter'></img>
              </div>
              <div className='col-md-8'>
                <div className='row' style={{paddingBottom: "2rem"}}>
                  <div className='col-md-6 myFlex'>
                    <p className="myLeft" style={{fontSize:"2rem", lineHeight:"2rem", fontWeight: "bold", color: "black"}}>{(campaign && campaign.organization.name) || ""}</p>
                  </div>
                  <div className='col-md-6 myFlex'>
                    <a className="myRight donate_btn" href={`/campaigns/${campaign_slug}/donate`}>Donate <span><svg className="svg" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.92505 16.6L13.3584 11.1667C14 10.525 14 9.475 13.3584 8.83334L7.92505 3.4" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></a>
                  </div>
                </div>
                <div className='' style={{background: "white", borderRadius: "1rem", padding: "1rem 0rem 1rem 0rem"}}>
                  <div className='row' style={{paddingBottom: "1.5rem"}}>
                    <div className='col-md-4'>
                      <div className='myFlex title'>
                        <h5 className='myCenter'>Total Donations</h5>
                      </div>
                      <div className='myFlex content'>
                        <h2 className='myCenter'>{(campaign && campaign.currentDonors.toString()) || ""}</h2>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='myFlex title'>
                        <h5 className='myCenter'>Average Donation</h5>
                      </div>
                      <div className='myFlex content'>
                        <h2 className='myCenter'>${(campaign && campaign.averageDonation.toString()) || ""}</h2>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='myFlex title'>
                        <h5 className='myCenter'>Total Raised</h5>
                      </div>
                      <div className='myFlex content'>
                        <h2 className='myCenter'>${(campaign && campaign.currentDonations.toString()) || ""}</h2>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='myFlex' style={{paddingBottom: "1rem"}}>
                      <Progress className='myCenter' style={{width: "90%"}}
                        color="success"
                        value={(campaign && campaign.currentDonations * 100 / campaign.goalAmount) || 0}
                      />
                    </div>
                    <div className='myFlex'>
                      <h5 className="myCenter" style={{fontWeight: "bold"}}>${(campaign && campaign.currentDonations.toString()) || ""} Raised of our ${(campaign && campaign.fundRaisingGoal.toString()) || ""} goal.</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='myFlex' style={{paddingBottom: "1.5rem"}}>
              <h1 className='myLeft' style={{color: "black", fontWeight: "bold"}}>Why We're Fundraising</h1>
            </div>
            <div className='myFlex'>
              <h5 className='myLeft' style={{lineHeight: "1.5"}}>{(campaign && campaign.shortDescription) || ""}</h5>
            </div>
            <div className='myFlex'>
              <h5 className='myLeft' style={{lineHeight: "1.5"}}>{(campaign && campaign.longDescription) || ""}</h5>
            </div>
          </Container>
        </div>
        <div id="teams" className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h1 className='myLeft' style={{color: "black", fontWeight: "bold"}}>Our Teams</h1>
            </div>
            <div className='row'>
              {
                teams && teams.length && 
                teams.map((team, index) => (
                    <Team key={team.id} index={index} team={team} />
                  )
                )
              }
            </div>
          </Container>
        </div>
        <div id="sponsors" className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='myFlex' style={{paddingBottom: "1.5rem"}}>
              <h1 className='myCenter' style={{color: "black", fontWeight: "bold"}}>Our Sponsors</h1>
            </div>
            <div>
              <Carousel itemPadding={[10, 50]} itemsToShow={3}
              renderPagination={({}) => {
                return (<div></div>)
              }}
              >
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>

              </Carousel>
            </div>
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
