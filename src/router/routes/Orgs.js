// ** React Imports
import { lazy } from 'react'

import { Navigate } from 'react-router-dom'

const OrganizationList = lazy(() => import('../../views/orgs/organizations/list'))
const OrganizationView = lazy(() => import('../../views/orgs/organizations/view'))
const OrganizationPublicView = lazy(() => import('../../views/orgs/organizations/public'))

const LeagueList = lazy(() => import('../../views/orgs/leagues/list'))
const LeagueView = lazy(() => import('../../views/orgs/leagues/view'))
const LeaguePublicView = lazy(() => import('../../views/orgs/leagues/public'))

const ClubList = lazy(() => import('../../views/orgs/clubs/list'))
const ClubView = lazy(() => import('../../views/orgs/clubs/view'))
const ClubPublicView = lazy(() => import('../../views/orgs/clubs/public'))

const TeamList = lazy(() => import('../../views/orgs/teams/list'))
const TeamView = lazy(() => import('../../views/orgs/teams/view'))
const TeamPublicView = lazy(() => import('../../views/orgs/teams/public'))

const OrgRoutes = [
  

  {
    element: <OrganizationList />,
    path: '/orgs/organizations/list',
    meta: {
      action: 'read',
      resource: 'org-organizations'
    }
  },
  {
    path: '/orgs/organizations/view',
    element: <Navigate to='/orgs/organizations/view/1' />,
    meta: {
      action: 'read',
      resource: 'org-organizations'
    }
  },
  {
    path: '/orgs/organizations/:org_slug',
    element: <OrganizationPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false,
      action: 'read',
      resource: 'org-organizations'
    }
  },
  {
    element: <OrganizationView />,
    path: '/orgs/organizations/view/:id',
    meta: {
      action: 'read',
      resource: 'org-organizations'
    }
  },

  {
    element: <LeagueList />,
    path: '/orgs/leagues/list',
    meta: {
      action: 'read',
      resource: 'org-leagues'
    }
  },
  {
    path: '/orgs/leagues/view',
    element: <Navigate to='/orgs/leagues/view/1' />,
    meta: {
      action: 'read',
      resource: 'org-leagues'
    }
  },
  {
    path: '/orgs/leagues/:league_slug',
    element: <LeaguePublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false,
      action: 'read',
      resource: 'org-leagues'
    }
  },
  {
    element: <LeagueView />,
    path: '/orgs/leagues/view/:id',
    meta: {
      action: 'read',
      resource: 'org-leagues'
    }
  },

  {
    element: <ClubList />,
    path: '/orgs/clubs/list',
    meta: {
      action: 'read',
      resource: 'org-clubs'
    }
  },
  {
    path: '/orgs/clubs/view',
    element: <Navigate to='/orgs/clubs/view/1' />,
    meta: {
      action: 'read',
      resource: 'org-clubs'
    }
  },
  {
    path: '/orgs/clubs/:club_slug',
    element: <ClubPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false,
      action: 'read',
      resource: 'org-clubs'
    }
  },
  {
    element: <ClubView />,
    path: '/orgs/clubs/view/:id',
    meta: {
      action: 'read',
      resource: 'org-clubs'
    }
  },

  {
    element: <TeamList />,
    path: '/orgs/teams/list',
    meta: {
      action: 'read',
      resource: 'org-teams'
    }
  },
  {
    path: '/orgs/teams/view',
    element: <Navigate to='/orgs/teams/view/1' />,
    meta: {
      action: 'read',
      resource: 'org-teams'
    }
  },
  {
    path: '/orgs/teams/:team_slug',
    element: <TeamPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false,
      action: 'read',
      resource: 'org-teams'
    }
  },
  {
    element: <TeamView />,
    path: '/orgs/Teams/view/:id',
    meta: {
      action: 'read',
      resource: 'org-teams'
    }
  }
]

export default OrgRoutes
