import { Link, useParams } from 'react-router-dom'
import {Row, Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const OrderScreen = () => {
    const { id: orderId } = useParams()
    
    const { data: order,refetch, isLoading, error } = useGetOrderQuery(orderId)
    
    const [ payOrder,{ isLoading: loadingPay } ] = usePayOrderMutation()
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const { data: paypal, isLoading: loadingPaypal,error: errorPaypal } = useGetPayPalClientIdQuery()
    
    const { userInfo } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (!errorPaypal && !loadingPaypal && !paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            if (order && !order.isPaid) {
                if(!window.paypal) {
                    loadPayPalScript()
                }
            }
        }
    }, [order,paypal,errorPaypal, loadingPaypal,paypalDispatch])
    
    const onApprove = (data, actions) => {
        return actions.order
          .capture()
          .then(async function (details) {
            try {
                const { data } = await payOrder({ orderId, details })
                toast.success('Payment Succesful')
                refetch()
            } catch (err) {
                toast.error(err.message)
            }
          })
      }
    
    async function onApproveTest() {
                await payOrder({ orderId, details:{payer:{}} })
                toast.success('Payment Succesful')
                refetch()
    }
    function onError() {
        toast.error('Error processing payment')
    }
    
    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: order.totalPrice },
                },
            ],
        }).then(function (orderID) {
            return orderID
        })
    }
    
  return isLoading ? (<Loader />) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
                 </p>    
                              {order.isDelivered ? (
                                <Message variant='success'>
                                      Delivered on {order.deliveredAt}
                                  </Message>
                              ) : (
                                <Message variant='danger'>Not Delivered</Message>
                              )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <h2>Payment Method</h2>
                              <p>
                                  <strong>Method: </strong>
                                  {order.paymentMethod}
                              </p>
                              {order.isPaid ? (
                                  <Message variant='success'>
                                      Paid on {order.paidAt}
                                  </Message>
                              ) : (
                                  <Message variant='danger'>Not Paid</Message>
                              )}
                          </ListGroup.Item>

                          <ListGroup.Item>
                              <h2>Order Items</h2>
                              {order.orderItems.length === 0 ? (
                                  <Message>Order is empty</Message>
                              ) : (
                                      <ListGroup variant='flush'>
                                          {order.orderItems.map((item, index) => (
                                              <ListGroup.Item key={index}>
                                                  <Row>
                                                      <Col md={1}>
                                                          <Image
                                                              src={item.image}
                                                              alt={item.name}
                                                              fluid
                                                              rounded
                                                          />
                                                      </Col>
                                                      <Col>
                                                          <Link
                                                              to={`/product/${item.product}`}
                                                          >
                                                              {item.name}
                                                          </Link>
                                                      </Col>
                                                      <Col md={4}>
                                                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                      </Col>
                                                  </Row>
                                              </ListGroup.Item>
                                          ))}
                                      </ListGroup>
                              )}
                          </ListGroup.Item>
                      </ListGroup>  
                  </Col>
                  <Col md={4}>
                      <Card>
                          <ListGroup variant='flush'>
                              <ListGroup.Item>
                                  <h2>Order Summary</h2>
                                  <Row>
                                      <Col>Items</Col>
                                      <Col>${order.itemsPrice}</Col>
                                  </Row>
                                  <Row>
                                      <Col>Shipping</Col>
                                      <Col>${order.shippingPrice}</Col>
                                  </Row>
                                  <Row>
                                      <Col>Tax</Col>
                                      <Col>${order.taxPrice}</Col>
                                  </Row>
                                  <Row>
                                      <Col>Total</Col>
                                      <Col>${order.totalPrice}</Col>
                                  </Row>
                                  {error && <Message variant='danger'>{error}</Message>}
                              </ListGroup.Item>
                              
                              {!order.isPaid&&(
                              <ListGroup.Item>
                                  <div>
                                      <Button onClick = {onApproveTest} style={{ marginTop: '10px' }} >Test Pay Order</Button>
                                  </div>
                                  <div>
                                  <PayPalButtons createOrder={ createOrder } onApprove={onApprove} onError={onError}></PayPalButtons>
                                      
                                  </div>
                              </ListGroup.Item>)}  
                          </ListGroup>
                      </Card>
                  </Col>
              </Row>
          </div>
      )
}

export default OrderScreen