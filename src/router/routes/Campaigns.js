// ** React Imports
import { lazy } from 'react'

import { Navigate } from 'react-router-dom'

const CampaignList = lazy(() => import('../../views/campaigns/list'))
const CampaignView = lazy(() => import('../../views/campaigns/view'))

const PublicHome = lazy(() => import('../../views/public-pages/Home'))
const PublicDonationForm = lazy(() => import('../../views/public-pages/DonationForm'))
const PublicThankYou = lazy(() => import('../../views/public-pages/ThankYou'))

const CampaignRoutes = [
  {
    element: <CampaignList />,
    path: '/campaigns/list',
    meta: {
      action: 'read',
      resource: 'campaigns'
    }
  },
  {
    path: '/campaigns/view',
    element: <Navigate to='/campaigns/view/1' />
  },
  {
    path: '/campaigns/:campaign_slug',
    element: <PublicHome />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: '/campaigns/:campaign_slug/donate',
    element: <PublicDonationForm />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: '/campaigns/:campaign_slug/thank-you',
    element: <PublicThankYou />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <CampaignView />,
    path: '/campaigns/view/:id'
  }
]

export default CampaignRoutes
