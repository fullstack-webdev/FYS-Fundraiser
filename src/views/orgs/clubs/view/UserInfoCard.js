// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader, CardHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// const roleColors = {
//   editor: 'light-info',
//   admin: 'light-danger',
//   author: 'light-warning',
//   maintainer: 'light-success',
//   subscriber: 'light-primary'
// }

// const statusColors = {
//   active: 'light-success',
//   pending: 'light-warning',
//   inactive: 'light-secondary'
// }

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: selectedUser?.username,
      lastName: selectedUser?.primary_contact?.last_name,
      firstName: selectedUser?.primary_contact?.first_name
    }
  })

  // ** render user img
  // const renderUserImg = () => {
  //   if (selectedUser !== null && selectedUser.avatar.length) {
  //     return (
  //       <img
  //         height='110'
  //         width='110'
  //         alt='user-avatar'
  //         src={selectedUser.avatar}
  //         className='img-fluid rounded mt-3 mb-2'
  //       />
  //     )
  //   } else {
  //     return (
  //       <Avatar
  //         initials
  //         color={selectedUser.avatarColor || 'light-primary'}
  //         className='rounded mt-3 mb-2'
  //         content={selectedUser.primary_contact.full_name}
  //         contentStyles={{
  //           borderRadius: 0,
  //           fontSize: 'calc(48px)',
  //           width: '100%',
  //           height: '100%'
  //         }}
  //         style={{
  //           height: '110px',
  //           width: '110px'
  //         }}
  //       />
  //     )
  //   }
  // }

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      username: selectedUser.username,
      lastName: selectedUser?.primary_contact?.last_name,
      firstName: selectedUser?.primary_contact?.first_name
    })
  }

  return (
    <Fragment>
      <Card>
        <CardHeader><h2>{selectedUser.name}</h2></CardHeader>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Primary Contact</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Name:</span>
                  <span>{selectedUser?.username}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email:</span>
                  <span>{selectedUser?.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Phone:</span>
                  <span>{selectedUser.phone}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit Chapter Information</h1>
            <p>Update details related to this Chapter</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='org_name'>
                  Club Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='org_name'
                  name='org_name'
                  render={({ field }) => (
                    <Input {...field} id='org_name' placeholder='' invalid={errors.org_name && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='club_logo'>
                  Club Logo
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='club_logo'
                  name='club_logo'
                  render={({ field }) => (
                    <Input {...field} id='club_logo' placeholder='Doe' invalid={errors.club_logo && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='aboutInfo'>
                  About the Chapter
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='aboutInfo'
                  name='aboutInfo'
                  render={({ field }) => (
                    <Input type="textarea" {...field} id='aboutInfo' placeholder='john.doe.007' invalid={errors.aboutInfo && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='federailEin'>
                  Federal EIN
                </Label>
                <Input
                  type='email'
                  id='federailEin'
                  defaultValue=''
                  placeholder='XXXXXXX-XX'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)]}
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
