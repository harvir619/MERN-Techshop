import { useState, useEffect } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { useGetUsersDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'
import { toast } from 'react-toastify'

const UserEditScreen = () => {
    const { id: userId } = useParams()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data:user,refetch } = useGetUsersDetailsQuery(userId)
    const [updateUser, { isLoading: loadingUpdate, error: errorUpdate, isError }] = useUpdateUserMutation()
    
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)

        }
    }, [user])
    
    const submitHandler = async (e) => {
        e.preventDefault()
        const result = await updateUser({ _id: userId, name, email, isAdmin })
        if (result.error) {
            toast.error(result.error.data.message)
        } else {
            toast.success('User Updated')
            refetch()
            navigate('/admin/users')
        }
    }
    
    
  return (
      <>
          <Link to='/admin/users' className='btn btn-light my-3'>
              Go Back
          </Link>

          <FormContainer>
              <h1>Edit User</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {isError && <Message variant='danger'>{isError?.data?.message || isError.error}</Message>}

              <Form onSubmit={submitHandler }>
                  <Form.Group controlId='name' className='my-2'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                          type='name'
                          placeholder='Enter name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='email' className='my-2'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                          type='email'
                          placeholder='Enter email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='isAdmin' className='my-2'>
                      <Form.Label>Admin</Form.Label>
                      <Form.Check
                          type='checkbox'
                          label='isAdmin'
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                      ></Form.Check>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                      Update
                  </Button>
              </Form>
          </FormContainer>
      </>
  )
}

export default UserEditScreen