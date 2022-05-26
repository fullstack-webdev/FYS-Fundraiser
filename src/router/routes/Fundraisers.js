// ** React Imports
import { lazy } from 'react'

import { Navigate } from 'react-router-dom'

const FundraiserList = lazy(() => import('../../views/fundraisers/list'))
const FundraiserView = lazy(() => import('../../views/fundraisers/view'))
const FundraiserPublicView = lazy(() => import('../../views/fundraisers/public'))

const PublicLandingPage = lazy(() => import('../../views/public-pages/LandingPage'))
const PublicDonationForm = lazy(() => import('../../views/public-pages/DonationForm'))
const PublicThankYou = lazy(() => import('../../views/public-pages/ThankYou'))

const FundraiserRoutes = [
  {
    element: <FundraiserList />,
    path: '/fundraisers/list',
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    path: '/fundraisers/view',
    element: <Navigate to='/fundraisers/view/1' />
  },
  {
    path: '/fundraisers/:fundraiser_slug',
    element: <PublicLandingPage />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: '/fundraisers/:fundraiser_slug/donate',
    element: <PublicDonationForm />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: '/fundraisers/:fundraiser_slug/thank-you',
    element: <PublicThankYou />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <FundraiserView />,
    path: '/fundraisers/view/:id'
  }
]

export default FundraiserRoutes
