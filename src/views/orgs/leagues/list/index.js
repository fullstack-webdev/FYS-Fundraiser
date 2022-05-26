// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const LeaguesList = () => {
  return (
    <div className='app-user-list'>
      <Table />
    </div>
  )
}

export default LeaguesList
