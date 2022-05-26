// ** Icons Import
import {
  Box,
  Circle,
  FileText
} from 'react-feather'

export default [
  {
    id: 'orgs',
    title: 'Fundraising Entities',
    icon: <Box />,
    children: [
      {
        id: 'organizations',
        title: 'Organizations',
        icon: <FileText />,
        action: 'read',
        resource: 'org-organizations',
        children: [
          {
            id: 'orgList',
            title: 'List',
            icon: <Circle />,
            action: 'read',
            resource: 'org-organizations',
            navLink: '/orgs/organizations/list'
          },
          {
            id: 'orgAdd',
            title: 'Add',
            icon: <Circle />,
            action: 'read',
            resource: 'org-organizations',
            navLink: '/orgs/organizations/add'
          }
        ]
      },
      {
        id: 'leagues',
        title: 'Leagues',
        icon: <FileText />,
        action: 'read',
        resource: 'org-leagues',
        children: [
          {
            id: 'leagueList',
            title: 'List',
            icon: <Circle />,
            action: 'read',
            resource: 'org-leagues',
            navLink: '/orgs/leagues/list'
          },
          {
            id: 'leagueAdd',
            title: 'Add',
            icon: <Circle />,
            action: 'read',
            resource: 'org-leagues',
            navLink: '/orgs/leagues/add'
          }
        ]
      },
      {
        id: 'clubs',
        title: 'Clubs',
        icon: <FileText />,
        action: 'read',
        resource: 'org-clubs',
        children: [
          {
            id: 'clubList',
            title: 'List',
            icon: <Circle />,
            action: 'read',
            resource: 'org-clubs',
            navLink: '/orgs/clubs/list'
          },
          {
            id: 'clubAdd',
            title: 'Add',
            icon: <Circle />,
            action: 'read',
            resource: 'org-clubs',
            navLink: '/orgs/clubs/add'
          }
        ]
      },
      {
        id: 'teams',
        title: 'Teams',
        icon: <FileText />,
        action: 'read',
        resource: 'org-teams',
        children: [
          {
            id: 'teamList',
            title: 'List',
            icon: <Circle />,
            action: 'read',
            resource: 'org-teams',
            navLink: '/orgs/teams/list'
          },
          {
            id: 'teamAdd',
            title: 'Add',
            icon: <Circle />,
            action: 'read',
            resource: 'org-teams',
            navLink: '/orgs/teams/add'
          }
        ]
      }
    ]
  }
]
