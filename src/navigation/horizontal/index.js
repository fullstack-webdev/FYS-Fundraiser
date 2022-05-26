// ** Navigation imports
import dashboards from './dashboards'
import orgs from './organizations'
import fundraisers from './fundraisers'
import campaigns from './campaigns'
import donations from './donations'
import reports from './reports'
import settings from './settings'

// ** Merge & Export
export default [...dashboards, ...orgs, ...campaigns, ...fundraisers, ...donations, ...reports, ...settings]
