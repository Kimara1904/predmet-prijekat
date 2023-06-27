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

import { Order } from '../../models/OrderModels'
import { isAdmin, isCustomer } from '../../helpers/AuthHelper'
import styles from './OrderDetail.module.css'
import alertStyle from '../../App.module.css'
import { cancelOrder } from '../../services/OrderService'
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
    setOrder(location.order)
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
                      : isInDelivery(new Date(order?.deliveryTime as string), currentTime)
                      ? isAdmin()
                        ? 'In Delivery'
                        : GetTimeUntilDelivery(new Date(order?.deliveryTime as string), currentTime)
                      : 'Delivered'}
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
                            }RSD`}
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
                  <TableCell align='right'>{order?.deliveryPrice || ''} RSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Total price:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    {(order?.itemPrice as number) + (order?.deliveryPrice as number) || ''} RSD
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {isCustomer() &&
          !order?.isCancled &&
          isInDelivery(new Date(order?.deliveryTime as string), currentTime) &&
          !hasPassedOneHour(new Date(order?.deliveryTime as string), currentTime) && (
            <Button variant='contained' color='error' onClick={handleOpenDialog}>
              Cancel
            </Button>
          )}
      </div>
    </div>
  )
}

export default OrderDetail
