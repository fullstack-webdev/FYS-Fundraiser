// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import fundraisers from '@src/views/fundraisers/store'
import campaigns from '@src/views/campaigns/store'
import donations from '@src/views/donations/store'
import organizations from '@src/views/orgs/organizations/store'
import leagues from '@src/views/orgs/leagues/store'
import clubs from '@src/views/orgs/clubs/store'
import teams from '@src/views/orgs/teams/store'
import email from '@src/views/apps/email/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'

const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions, 
  fundraisers, 
  organizations, 
  leagues, 
  clubs, 
  teams, 
  campaigns, 
  donations
}

export default rootReducer
