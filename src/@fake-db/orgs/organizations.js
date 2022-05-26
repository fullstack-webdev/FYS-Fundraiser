import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = {
  organizations: [
    {
      id: 4987,
      organizationName: 'Clemson Tigers', 
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
      organizationName: 'San Diego State', 
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
mock.onGet('/api/organizations/list/all-data').reply(200, data.organizations)

// POST: Add new organization
mock.onPost('/orgs/organizations/add-organization').reply(config => {
  // Get event from post data
  const organization = JSON.parse(config.data)
  const highestValue = data.organizations.reduce((a, b) => (a.id > b.id ? a : b)).id

  organization.id = highestValue + 1

  data.organizations.push(organization)

  return [201, { organization }]
})

// GET Updated DATA
mock.onGet('/api/organizations/list/data').reply(config => {
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

  const dataAsc = data.organizations.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const filteredData = dataToFilter.filter(
    organization =>
      (organization.email.toLowerCase().includes(queryLowered) ||
      organization.fullName.toLowerCase().includes(queryLowered) ||
      organization.billing.toLowerCase().includes(queryLowered)) &&
      organization.role === (role || organization.role) &&
      organization.currentPlan === (currentPlan || organization.currentPlan) &&
      organization.status === (status || organization.status)
  )
  /* eslint-enable  */

  return [
    200,
    {
      total: filteredData.length,
      organizations: paginateArray(filteredData, perPage, page)
    }
  ]
})

// GET USER
mock.onGet('/api/organizations/organization').reply(config => {
  const { id } = config
  const organization = data.organizations.find(i => i.id === id)
  return [200, { organization }]
})

// DELETE: Deletes User
mock.onDelete('/apps/organizations/delete').reply(config => {
  // Get organization id from URL
  let organizationId = config.id

  // Convert Id to number
  organizationId = Number(organizationId)

  const organizationIndex = data.organizations.findIndex(t => t.id === organizationId)
  data.organizations.splice(organizationIndex, 1)

  return [200]
})
