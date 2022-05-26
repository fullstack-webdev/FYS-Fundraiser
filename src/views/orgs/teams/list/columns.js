// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getTeam, deleteTeam } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row?.avatar?.length) {
    return <Avatar className='me-1' img={row?.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row?.avatarColor || 'light-primary'}
        content={row?.name || 'John Doe'}
      />
    )
  }
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [

  {
    name: 'Team',
    sortable: true,
    minWidth: '200px',
    sortField: 'teamName',
    selector: row => row.name,
    cell: row => row.name 
  },
  {
    name: 'Primary Contact',
    sortable: true,
    minWidth: '300px',
    sortField: 'primary_contact.name',
    selector: row => row?.primary_contact?.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/teams/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getTeam(row.id))}
          >
            <span className='fw-bolder'>{row?.primary_contact?.firstName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row?.primary_contact?.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Plan',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
  },
  {
    name: 'Billing',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.billing}</span>
  },
  {
    name: 'Organization',
    minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.parent.name,
    cell: row => <span className='text-capitalize'>{row.parent.name}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.enabled,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.enabled]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/fundriasers/view/${row.id}`}
              onClick={() => store.dispatch(getTeam(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteTeam(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
