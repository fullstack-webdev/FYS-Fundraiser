// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getClub, deleteClub } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row?.logo) {
    return <Avatar className='me-1' img={row.logo || '/assets/images/avatars/10-small.png'} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.name || 'John Doe'}
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
    name: 'Chapter Name',
    minWidth: '250px',
    sortable: true,
    sortField: 'name',
    className: 'fw-bolder',
    selector: row => row.name,
    cell: row => (<Link
      to={`/orgs/clubs/view/${row.id}`}
      className='user_name text-truncate text-body'
      onClick={() => store.dispatch(getCampaign(row.id))}><span className='text-capitalize'>{row.name}</span></Link>
    )
  },
  {
    name: 'Primary Contact',
    sortable: true,
    minWidth: '300px',
    sortField: 'primary_contact.last_name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/orgs/clubs/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getClub(row.id))}
          >
            <span className='fw-bolder'>{row.name}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Phone Number',
    minWidth: '138px',
    sortable: true,
    sortField: 'primary_contact.phone',
    selector: row => row.phone,
    cell: row => <span className='text-capitalize'>{row.phone}</span>
  },
  {
    name: 'Campaigns',
    minWidth: '150px',
    sortable: true,
    sortField: 'active_campaigns',
    selector: row => row.active_campaigns,
    cell: row => <span className='text-capitalize'>{row.active_campaigns}</span>
  },
  {
    name: 'Total Donations',
    minWidth: '200px',
    sortable: true,
    sortField: 'total_donations',
    selector: row => row.total_donations,
    cell: row => <span className='text-capitalize'>{row.total_donations}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
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
              onClick={() => store.dispatch(getClub(row.id))}
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
                store.dispatch(deleteClub(row.id))
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
