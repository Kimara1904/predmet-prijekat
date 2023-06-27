import { ChangeEvent, useContext, useState } from 'react'

import { IconButton, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { PickedItemProperties } from '../../models/Properties'
import CartContext from '../../store/cart-context'
import styles from './PickedItem.module.css'

const PickedItem = (props: PickedItemProperties) => {
  const [amount, setAmount] = useState('1')
  const cartContext = useContext(CartContext)

  const handleBlurAmount = () => {
    if (amount.length === 0) {
      setAmount('1')
      cartContext.onChange(props.item.articleId, 1)
    } else {
      cartContext.onChange(props.item.articleId, parseInt(amount))
    }
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim()

    if (parseInt(newValue) < 1) {
      setAmount('1')
    } else if (parseInt(newValue) > props.item.capacity) {
      setAmount(props.item.capacity.toString())
    } else {
      setAmount(newValue)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '.') {
      event.preventDefault()
    }
  }

  const handleRemoveItem = () => {
    cartContext.onRemove(props.item.articleId)
  }

  return (
    <div className={styles.picked_item}>
      <Typography>{props.item.name}: </Typography>
      <TextField
        id='ArticleAmount'
        type='number'
        label='Amount'
        variant='outlined'
        value={amount}
        onBlur={handleBlurAmount}
        onChange={handleAmountChange}
        onKeyPress={handleKeyPress}
        inputProps={{ inputMode: 'numeric', min: '1', step: '1', max: `${props.item.capacity}` }}
        style={{ marginBottom: '16px' }}
      />
      <Typography> x {props.item.price}RSD</Typography>
      <IconButton aria-label='delete' onClick={handleRemoveItem}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

export default PickedItem
