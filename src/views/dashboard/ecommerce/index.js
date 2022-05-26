// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

// ** Reactstrap Imports
import {
  Col,
  Row
} from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'
import CardBrowserStates
  from '@src/views/ui-elements/cards/advance/CardBrowserState'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import CardTransactions
  from '@src/views/ui-elements/cards/advance/CardTransactions'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart
  from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart
  from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'

// ** Demo Components
import CompanyTable from './CompanyTable'

const EcommerceDashboard = () => {
  
  return (
    <div id='dashboard-ecommerce'>
      
    </div>
  )
}

export default EcommerceDashboard
