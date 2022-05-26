import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  teams: [
    {
      id: 4987,
      teamName: 'Clemson Tigers', 
      issuedDate: '13 Dec 2019',
      primary_contact: {
        email_address: 'don85@johnson.com',
        city: 'Clemson', 
        state: 'South Carolina', 
        phone: '(616) 865-4180',
        name: 'Jordan Stevenson'
      },
      total_donations: 4354, 
      avatar: require('@src/assets/images/avatars/10-small.png').default,
      createDate: '23 Apr 2019'
    },
    {
      id: 4988,
      teamName: 'San Diego State', 
      issuedDate: '13 Dec 2019',
      primary_contact: {
        email_address: 'don85@johnson.com',
        city: 'San Diego', 
        state: 'California', 
        phone: '(616) 865-4180',
        name: 'Jordan Stevenson'
      },
      total_donations: 4354, 
      avatar: require('@src/assets/images/avatars/9-small.png').default,
      createDate: '23 Apr 2019'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/teams/list/all-data').reply(200, data.teams)

// POST: Add new team
mock.onPost('/orgs/teams/add-team').reply(config => {
  // Get event from post data
  const team = JSON.parse(config.data)
  const highestValue = data.teams.reduce((a, b) => (a.id > b.id ? a : b)).id

  team.id = highestValue + 1

  data.teams.push(team)

  return [201, { team }]
})

// GET Updated DATA
mock.onGet('/api/teams/list/data').reply(config => {
  const {
    q = '',
    page = 1,
    role = null,
    perPage = 10,
    sort = 'asc',
    status = null,
    currentPlan = null,
    sortColumn = 'fullName'
  } = config

  /* eslint-disable  */
  const queryLowered = q.toLowerCase()

  const dataAsc = data.teams.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    team =>
      (team.email.toLowerCase().includes(queryLowered) ||
      team.fullName.toLowerCase().includes(queryLowered) ||
      team.billing.toLowerCase().includes(queryLowered)) &&
      team.role === (role || team.role) &&
      team.currentPlan === (currentPlan || team.currentPlan) &&
      team.status === (status || team.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      teams: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/teams/team').reply(config => {
  const { id } = config
  const team = data.teams.find(i => i.id === id)
  return [200, { team }]
})

// DELETE: Deletes User
mock.onDelete('/apps/teams/delete').reply(config => {
  // Get team id from URL
  let teamId = config.id

  // Convert Id to number
  teamId = Number(teamId)

  const teamIndex = data.teams.findIndex(t => t.id === teamId)
  data.teams.splice(teamIndex, 1)

  return [200]
})
