import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  leagues: [
    {
      id: 4987,
      issuedDate: '13 Dec 2019',
      client: {
        address: '7777 Mendez Plains',
        company: 'Hall-Robbins PLC',
        companyEmail: 'don85@johnson.com',
        country: 'USA',
        contact: '(616) 865-4180',
        name: 'Jordan Stevenson'
      },
      service: 'Software Development',
      total: 3428,
      avatar: '',
      leagueStatus: 'Paid',
      balance: '$724',
      dueDate: '23 Apr 2019'
    },
    {
      id: 4988,
      issuedDate: '17 Jul 2019',
      client: {
        address: '04033 Wesley Wall Apt. 961',
        company: 'Mccann LLC and Sons',
        companyEmail: 'brenda49@taylor.info',
        country: 'Haiti',
        contact: '(226) 204-8287',
        name: 'Stephanie Burns'
      },
      service: 'UI/UX Design & Development',
      total: 5219,
      avatar: require('@src/assets/images/avatars/10-small.png').default,
      leagueStatus: 'Downloaded',
      balance: 0,
      dueDate: '15 Dec 2019'
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/leagues/list/all-data').reply(200, data.leagues)

// POST: Add new league
mock.onPost('/orgs/leagues/add-league').reply(config => {
  // Get event from post data
  const league = JSON.parse(config.data)
  const highestValue = data.leagues.reduce((a, b) => (a.id > b.id ? a : b)).id

  league.id = highestValue + 1

  data.leagues.push(league)

  return [201, { league }]
})

// GET Updated DATA
mock.onGet('/api/leagues/list/data').reply(config => {
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

  const dataAsc = data.leagues.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    league =>
      (league.email.toLowerCase().includes(queryLowered) ||
      league.fullName.toLowerCase().includes(queryLowered) ||
      league.billing.toLowerCase().includes(queryLowered)) &&
      league.role === (role || league.role) &&
      league.currentPlan === (currentPlan || league.currentPlan) &&
      league.status === (status || league.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      leagues: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/leagues/league').reply(config => {
  const { id } = config
  const league = data.leagues.find(i => i.id === id)
  return [200, { league }]
})

// DELETE: Deletes User
mock.onDelete('/apps/leagues/delete').reply(config => {
  // Get league id from URL
  let leagueId = config.id

  // Convert Id to number
  leagueId = Number(leagueId)

  const leagueIndex = data.leagues.findIndex(t => t.id === leagueId)
  data.leagues.splice(leagueIndex, 1)

  return [200]
})
