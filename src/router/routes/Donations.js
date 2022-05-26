// ** React Imports
import { lazy } from 'react'

import { Navigate } from 'react-router-dom'

const DonationList = lazy(() => import('../../views/donations/list'))
const DonationView = lazy(() => import('../../views/donations/view'))
const DonationPublicView = lazy(() => import('../../views/donations/public'))
const PublicThankYou = lazy(() => import('../../views/public-pages/ThankYou'))

const DonationRoutes = [
  {
    element: <DonationList />,
    path: '/donations/list',
    meta: {
      action: 'read',
      resource: 'donations'
    }
  },
  {
    path: '/donations/view',
    element: <Navigate to='/donations/view/1' />
  },
  {
    path: '/donations/:donation_slug',
    element: <DonationPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: '/donations/:donation_slug/thank-you',
    element: <PublicThankYou />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <DonationView />,
    path: '/donations/view/:id'
  }
]

export default DonationRoutes
