import { useEffect, useState } from 'react'

import { Alert, AlertTitle } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { Order } from '../../../models/OrderModels'
import alertStyle from '../../../App.module.css'
import OrderList from '../../OrderList/OrderList'
import { getMyOrders } from '../../../services/OrderService'
import { ErrorData } from '../../../models/ErrorModels'

const MyOrdersContent = () => {
  const [orderList, setOrderList] = useState<Order[]>([])
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    getMyOrders()
      .then((response) => {
        setOrderList(response.data)
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
    <>
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
      <OrderList orders={orderList} onCancel={getOrders} />
    </>
  )
}

export default MyOrdersContent
