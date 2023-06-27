import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import { Alert, AlertTitle } from '@mui/material'

import OrderList from '../../OrderList/OrderList'
import { getAllOrders } from '../../../services/OrderService'
import { Order } from '../../../models/OrderModels'
import styles from '../../../App.module.css'
import { ErrorData } from '../../../models/ErrorModels'

const AllOrderContent = () => {
  const [orderList, setOrderList] = useState<Order[]>([])
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })
  useEffect(() => {
    getAllOrders()
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
  }, [])

  return (
    <>
      {alertError.isError && (
        <Alert
          className={styles.alert}
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
      <OrderList orders={orderList} />
    </>
  )
}

export default AllOrderContent
