import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  donations: [
    {
      id: 1,
      billing: 'Manual - Credit Card',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      role: 'editor',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'light-primary'
    },
    {
      id: 2,
      billing: 'Manual - Paypal',
      fullName: 'Halsey Redmore',
      company: 'Skinder PVT LTD',
      role: 'author',
      username: 'hredmore1',
      country: 'Albania',
      contact: '(472) 607-9137',
      email: 'hredmore1@imgur.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/10.png').default
    },
    {
      id: 3,
      billing: 'Auto Debit',
      fullName: 'Marjory Sicely',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      username: 'msicely2',
      country: 'Russia',
      contact: '(321) 264-4599',
      email: 'msicely2@who.int',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: require('@src/assets/images/avatars/1.png').default
    },
    {
      id: 4,
      billing: 'Manual - Credit Card',
      fullName: 'Cyrill Risby',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      username: 'crisby3',
      country: 'China',
      contact: '(923) 690-6806',
      email: 'crisby3@wordpress.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: require('@src/assets/images/avatars/9.png').default
    },
    {
      id: 5,
      billing: 'Auto Debit',
      fullName: 'Maggy Hurran',
      company: 'Aimbo PVT LTD',
      role: 'subscriber',
      username: 'mhurran4',
      country: 'Pakistan',
      contact: '(669) 914-1078',
      email: 'mhurran4@yahoo.co.jp',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: require('@src/assets/images/avatars/10.png').default
    }
  ]
}

// GET ALL DATA
mock.onGet('/api/donations/list/all-data').reply(200, data.donations)

// POST: Add new donation
mock.onPost('/apps/donations/add-donation').reply(config => {
  // Get event from post data
  const donation = JSON.parse(config.data)
  const highestValue = data.donations.reduce((a, b) => (a.id > b.id ? a : b)).id

  donation.id = highestValue + 1

  data.donations.push(donation)

  return [201, { donation }]
})

// GET Updated DATA
mock.onGet('/api/donations/list/data').reply(config => {
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

  const dataAsc = data.donations.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    donation =>
      (donation.email.toLowerCase().includes(queryLowered) ||
      donation.fullName.toLowerCase().includes(queryLowered) ||
      donation.billing.toLowerCase().includes(queryLowered)) &&
      donation.role === (role || donation.role) &&
      donation.currentPlan === (currentPlan || donation.currentPlan) &&
      donation.status === (status || donation.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      donations: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/donations/donation').reply(config => {
  const { id } = config
  const donation = data.donations.find(i => i.id === id)
  return [200, { donation }]
})

// DELETE: Deletes User
mock.onDelete('/apps/donations/delete').reply(config => {
  // Get donation id from URL
  let donationId = config.id

  // Convert Id to number
  donationId = Number(donationId)

  const donationIndex = data.donations.findIndex(t => t.id === donationId)
  data.donations.splice(donationIndex, 1)

  return [200]
})
