import { ReactNode, useState } from 'react'

import {
  Alert,
  AlertColor,
  AlertTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { OrderListProperties } from '../../models/Properties'
import { isCustomer } from '../../helpers/AuthHelper'
import OrderItem from './OrderItem'
import alertStyle from '../../App.module.css'

const OrderList = (prop: OrderListProperties) => {
  const [alertShow, setAlertShow] = useState({
    isError: false,
    severity: '',
    message: ''
  })

  const handleError = (message: string) => {
    setAlertShow({
      isError: true,
      severity: 'error',
      message: message
    })
  }

  const handleCancelOrder = (message: string) => {
    setAlertShow({
      isError: true,
      severity: 'success',
      message: message
    })
    if (prop.onCancel) {
      prop.onCancel()
    }
  }

  let content: ReactNode = null
  if (prop.orders.length === 0) {
    content = (
      <TableBody>
        <TableRow sx={{ backgroundColor: 'var(--cream_color)' }}>
          <TableCell align='center' colSpan={6}>
            <Typography variant='body2' align='center' style={{ marginBottom: '16px' }}>
              There is no orders
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    content = (
      <TableBody>
        {prop.orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            onError={handleError}
            onCancel={handleCancelOrder}
          />
        ))}
      </TableBody>
    )
  }
  return (
    <>
      {alertShow.isError && (
        <Alert
          className={alertStyle.alert}
          severity={alertShow.severity as AlertColor}
          onClose={() =>
            setAlertShow((pervState) => ({
              ...pervState,
              isError: false
            }))
          }
        >
          <AlertTitle>Error</AlertTitle>
          {alertShow.message}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead sx={{ backgroundColor: 'var(--blue_color)' }}>
            <TableRow>
              <TableCell sx={{ color: 'var(--white_color)' }}>Id</TableCell>
              {!isCustomer() && (
                <TableCell align='right' sx={{ color: 'var(--white_color)' }}>
                  Buyer
                </TableCell>
              )}
              <TableCell align='center' sx={{ color: 'var(--white_color)' }}>
                Items
              </TableCell>
              <TableCell align='center' sx={{ color: 'var(--white_color)' }}>
                Total Price
              </TableCell>
              <TableCell align='right' sx={{ color: 'var(--white_color)' }}>
                Address
              </TableCell>
              <TableCell align='right' sx={{ color: 'var(--white_color)' }}>
                Status
              </TableCell>
              {isCustomer() && <TableCell />}
            </TableRow>
          </TableHead>
          {content}
        </Table>
      </TableContainer>
    </>
  )
}

export default OrderList
