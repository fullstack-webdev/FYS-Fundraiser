import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  clubs: [
    {
      id: 4987,
      uuid: '', 
      name: 'Clemson Tigers', 
      createdOn: '13 Dec 2019',
      primary_contact: {
        email_address: 'don85@johnson.com',
        phone: '(616) 865-4180',
        first_name: 'Jordan', 
        last_name: 'Stevenson', 
        full_name: 'Jordan Stevenson'
      },
      active_campaigns: 1, 
      total_donations: 4354, 
      status: 'active',
      avatar: require('@src/assets/images/avatars/10-small.png').default
    },
    {
      id: 4987,
      uuid: '', 
      name: 'Oregon Ducks', 
      createdOn: '13 Dec 2019',
      primary_contact: {
        email_address: 'don85@johnson.com',
        phone: '(616) 865-4180',
        first_name: 'Matt', 
        last_name: 'Dool', 
        full_name: 'Matt Dool'
      },
      active_campaigns: 1, 
      total_donations: 4354, 
      status: 'active',
      avatar: require('@src/assets/images/avatars/10-small.png').default
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/clubs/list/all-data').reply(200, data.clubs)

// POST: Add new club
mock.onPost('/orgs/clubs/add-club').reply(config => {
  // Get event from post data
  const club = JSON.parse(config.data)
  const highestValue = data.clubs.reduce((a, b) => (a.id > b.id ? a : b)).id

  club.id = highestValue + 1

  data.clubs.push(club)

  return [201, { club }]
})

// GET Updated DATA
mock.onGet('/api/clubs/list/data').reply(config => {
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

  const dataAsc = data.clubs.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    club =>
      (club.email.toLowerCase().includes(queryLowered) ||
      club.fullName.toLowerCase().includes(queryLowered) ||
      club.billing.toLowerCase().includes(queryLowered)) &&
      club.role === (role || club.role) &&
      club.currentPlan === (currentPlan || club.currentPlan) &&
      club.status === (status || club.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      clubs: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/clubs/club').reply(config => {
  const { id } = config
  const club = data.clubs.find(i => i.id === id)
  return [200, { club }]
})

// DELETE: Deletes User
mock.onDelete('/apps/clubs/delete').reply(config => {
  // Get club id from URL
  let clubId = config.id

  // Convert Id to number
  clubId = Number(clubId)

  const clubIndex = data.clubs.findIndex(t => t.id === clubId)
  data.clubs.splice(clubIndex, 1)

  return [200]
})
