import { ChangeEvent, useContext, useEffect, useState } from 'react'

import {
  Alert,
  AlertColor,
  AlertTitle,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

import PickedItem from './PickedItem'
import CartContext from '../../store/cart-context'
import { CreateItem } from '../../models/OrderItemModels'
import { CreateOrder } from '../../models/OrderModels'
import { createOrder, getDeliveryPrice } from '../../services/OrderService'
import styles from './OrderForm.module.css'
import alertStyle from '../../App.module.css'
import { ErrorData, PayPalError } from '../../models/ErrorModels'
import { CalculateItemPrice } from '../../helpers/PriceHelper'

const OrderForm = () => {
  const [isAddressError, setIsAddressError] = useState(false)
  const [isListItemEmpty, setIsListItemEmpty] = useState(false)
  const [alert, setAlert] = useState({
    message: '',
    severity: 'success'
  })
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')

  const cartContext = useContext(CartContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (cartContext.items.length !== 0) {
      setIsListItemEmpty(false)
      getDeliveryPrice(
        cartContext.items.map((item) => {
          return item.articleId
        })
      )
        .then((response) => {
          setDeliveryPrice(response.data)
        })
        .catch((error: AxiosError<ErrorData>) => {
          if (isAxiosError(error)) {
            setAlert({
              severity: 'error',
              message: error.response?.data.Exception as string
            })
          }
          return
        })
    }
  }, [cartContext.items])

  const handleBlurAddress = (): void => {
    if (address.trim().length === 0) {
      setIsAddressError(true)
    }
  }

  const handleChangePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value)
  }

  const makeOrder = (isPayed: boolean) => {
    const enteredAddrress = address
    const enteredComment = comment
    if (enteredAddrress.length === 0) {
      setIsAddressError(true)
      return
    }

    if (cartContext.items.length === 0) {
      setIsListItemEmpty(true)
      return
    }

    const pickedItems: CreateItem[] = []

    cartContext.items.map((item) => {
      const pickedItem: CreateItem = {
        articleId: item.articleId,
        amount: item.amount
      }
      pickedItems.push(pickedItem)
    })

    const request: CreateOrder = {
      items: pickedItems,
      address: enteredAddrress,
      comment: enteredComment,
      payingMethod: paymentMethod,
      isPaying: isPayed
    }

    createOrder(request)
      .then((response) => {
        cartContext.onRemoveAll()
        navigate('/order_detail', { state: { order: response.data } })
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setAlert({
            severity: 'error',
            message: error.response?.data.Exception as string
          })
        }
      })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    makeOrder(paymentMethod === 'Cash')
  }

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  return (
    <div>
      {alert.message !== '' && (
        <Alert
          className={alertStyle.alert}
          severity={alert.severity as AlertColor}
          onClose={() => setAlert({ message: '', severity: 'success' })}
        >
          <AlertTitle>Error</AlertTitle>
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className={styles.order_form}>
        <div>
          {cartContext.items.map((item) => {
            return <PickedItem key={item.articleId} item={item} />
          })}
        </div>
        {isListItemEmpty && (
          <Typography variant='body2' color='error' style={{ marginBottom: '16px' }}>
            Cart is empty
          </Typography>
        )}
        <TextField
          id='OrderAddress'
          type='text'
          label='Address'
          variant='outlined'
          error={isAddressError}
          helperText={isAddressError && 'Address is required.'}
          value={address}
          onChange={handleAddressChange}
          onBlur={handleBlurAddress}
          onFocus={() => setIsAddressError(false)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='OrderComment'
          multiline
          rows={4}
          type='text'
          label='Comment'
          variant='outlined'
          value={comment}
          onChange={handleCommentChange}
          style={{ marginBottom: '16px' }}
        />
        <FormLabel id='PaymentMethodLabel'>Payment method</FormLabel>
        <RadioGroup
          aria-labelledby='PaymentMethodLabel'
          id='PaymentMethod'
          row
          defaultValue='Customer'
          value={paymentMethod}
          onChange={handleChangePaymentMethod}
        >
          <FormControlLabel value='Cash' control={<Radio />} label='Cash' />
          <FormControlLabel value='Card' control={<Radio />} label='Card' />
        </RadioGroup>
        {paymentMethod === 'Card' && cartContext.items.length !== 0 && address.length !== 0 && (
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
                return actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          value: (CalculateItemPrice(cartContext.items) + deliveryPrice)
                            .toFixed(2)
                            .toString(),
                          currency_code: 'AUD'
                        }
                      }
                    ]
                  })
                  .then((result) => {
                    return result
                  })
                  .catch((error: PayPalError) => {
                    setAlert({
                      severity: 'error',
                      message: error.details[0].description
                    })
                    return Promise.reject('')
                  })
              }}
              onApprove={async (data, actions) => {
                return actions.order
                  ?.capture()
                  .then(() => {
                    setAlert({
                      message: 'You payed successfully',
                      severity: 'success'
                    })
                    makeOrder(true)
                  })
                  .catch(() => {
                    setAlert({
                      message: 'Something is wrong with paying',
                      severity: 'error'
                    })
                  })
              }}
            />
          </PayPalScriptProvider>
        )}
        <Button type='submit' variant='contained' color='primary' style={{ marginBottom: '16px' }}>
          Place order
        </Button>
      </form>
    </div>
  )
}

export default OrderForm
