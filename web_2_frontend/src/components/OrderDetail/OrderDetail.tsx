import { useContext, useEffect, useState } from 'react'

import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

import { Order } from '../../models/OrderModels'
import { isAdmin, isCustomer, isSellerVerified } from '../../helpers/AuthHelper'
import styles from './OrderDetail.module.css'
import alertStyle from '../../App.module.css'
import { aproveOrder, cancelOrder, payOrder } from '../../services/OrderService'
import { GetTimeUntilDelivery, hasPassedOneHour, isInDelivery } from '../../helpers/DateTimeHelper'
import { ErrorData } from '../../models/ErrorModels'
import DashContext from '../../store/dashboard-context'

const OrderDetail = () => {
  const [order, setOrder] = useState<Order>()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const location = useLocation().state as { order: Order }

  const contentContext = useContext(DashContext)
  const navigate = useNavigate()

  useEffect(() => {
    const storedOrderData = sessionStorage.getItem('order')
    if (storedOrderData) {
      const parsedOrder = JSON.parse(storedOrderData) as Order
      setOrder(parsedOrder)
    } else if (location.order) {
      setOrder(location.order)
    }
  }, [location.order])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [currentTime, order?.deliveryTime, order?.isCancled])

  const handleCancelOrder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    cancelOrder(order?.id as number)
      .then(() => {
        contentContext.setContent('my_orders')
        navigate('/dashboard')
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setAlertError({
            isError: true,
            message: error.response?.data.Exception as string
          })
        }
      })
  }
  const handleDeleteLocalOrder = () => {
    sessionStorage.removeItem('order')
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleApproveOrder = () => {
    aproveOrder(order?.id as number)
      .then(() => {
        contentContext.setContent('map')
        navigate('/dashboard')
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setAlertError({
            isError: true,
            message: error.response?.data.Exception as string
          })
        }
      })
  }

  return (
    <div>
      {alertError.isError && (
        <Alert
          className={alertStyle.alert}
          severity='error'
          onClose={() =>
            setAlertError((pervState) => ({
              ...pervState,
              isError: false
            }))
          }
        >
          <AlertTitle>Error</AlertTitle>
          {alertError.message}
        </Alert>
      )}
      {order && (
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {`Are you sure you want to cancel order with id: ${order.id}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelOrder}>Yes</Button>
            <Button onClick={handleCloseDialog}>No</Button>
          </DialogActions>
        </Dialog>
      )}
      <div className={styles.order_detail_link_back}>
        <Link to='/dashboard' onClick={handleDeleteLocalOrder}>
          Back to Dashboard
        </Link>
      </div>
      <div className={styles.order_detail_div}>
        <div className={styles.order_detail}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Order id:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.id || ''}</TableCell>
                </TableRow>
                {!isCustomer() && (
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      <Typography variant='h6'>Buyer:</Typography>
                    </TableCell>
                    <TableCell align='right'>{order?.buyerUsername || ''}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Address:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.address || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Status:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    {order?.isCancled
                      ? 'Canceled'
                      : order?.isPayed
                      ? order?.isApproved
                        ? isInDelivery(new Date(order?.deliveryTime), currentTime)
                          ? isAdmin()
                            ? 'In Delivery'
                            : GetTimeUntilDelivery(new Date(order?.deliveryTime), currentTime)
                          : 'Delivered'
                        : 'Unaproved'
                      : 'Unpayed'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Items:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    {order?.items &&
                      order?.items.map((item) => {
                        return (
                          <Typography key={item.id} variant='body2'>
                            {`${item.articleName} x ${item.amount}: ${
                              item.articlePrice * item.amount
                            }USD`}
                          </Typography>
                        )
                      })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Comment:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.comment || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Delivery price:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.deliveryPrice || ''} AUD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Total price:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    {(order?.itemPrice as number) + (order?.deliveryPrice as number) || ''} AUD
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {isCustomer() &&
          !order?.isCancled &&
          (!order?.isPayed ||
            (order?.isPayed &&
              (!order?.isApproved ||
                (order.isApproved &&
                  isInDelivery(new Date(order?.deliveryTime), currentTime) &&
                  !hasPassedOneHour(new Date(order?.deliveryTime), currentTime))))) && (
            <Button
              variant='contained'
              color='error'
              onClick={handleOpenDialog}
              style={{ marginBottom: '16px' }}
            >
              Cancel
            </Button>
          )}
        {isCustomer() && !order?.isCancled && !order?.isPayed && (
          <PayPalScriptProvider
            options={{
              currency: 'AUD',
              clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID
                ? process.env.REACT_APP_PAYPAL_CLIENT_ID
                : ''
            }}
          >
            <PayPalButtons
              style={{ label: 'checkout' }}
              createOrder={async (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: ((order?.itemPrice as number) + (order?.deliveryPrice as number))
                          .toFixed(2)
                          .toString(),
                        currency_code: 'AUD'
                      }
                    }
                  ]
                })
              }}
              onApprove={async (data, actions) => {
                return actions.order?.capture().then(() => {
                  payOrder(order?.id as number)
                    .then((response) => {
                      setOrder(response.data)
                      sessionStorage.setItem('order', JSON.stringify(response.data))
                    })
                    .catch((error: AxiosError<ErrorData>) => {
                      if (isAxiosError(error)) {
                        setAlertError({
                          isError: true,
                          message: error.response?.data.Exception as string
                        })
                      }
                    })
                })
              }}
            />
          </PayPalScriptProvider>
        )}
        {isSellerVerified() && !order?.isCancled && order?.isPayed && !order?.isApproved && (
          <Button variant='contained' color='success' onClick={handleApproveOrder}>
            Approve
          </Button>
        )}
      </div>
    </div>
  )
}

export default OrderDetail
