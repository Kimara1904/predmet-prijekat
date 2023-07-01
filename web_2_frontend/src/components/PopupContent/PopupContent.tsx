import React from 'react'

import { Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'

import { MarkProperties } from '../../models/Properties'

const PopupContent = (props: MarkProperties) => {
  const navigate = useNavigate()

  const handleClickLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    navigate('/order_detail', { state: { order: props.mark.order } })
  }

  return (
    <div>
      <Typography>{`Order id: ${props.mark.order.id}`}</Typography>
      <Typography>{props.mark.order.address}</Typography>
      <Typography>{props.mark.order.isPayed ? 'Payed' : 'Unpayed'}</Typography>
      <Link to='#' onClick={handleClickLink}>
        Details
      </Link>
    </div>
  )
}

export default PopupContent
