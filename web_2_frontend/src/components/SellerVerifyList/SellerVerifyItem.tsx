import { Button, TableCell, TableRow } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { SellerVerifyItemProperties } from '../../models/Properties'
import DefaultUserImage from '../../images/default_user_picture.jpg'
import { verifySeller } from '../../services/UserService'
import styles from './SellerVerifyItem.module.css'
import { ErrorData } from '../../models/ErrorModels'

const SellerVerifyItem = (props: SellerVerifyItemProperties) => {
  const handleVerify = (verified: string) => {
    verifySeller({ username: props.seller.username, verified })
      .then(() => {
        if (props.onVerify) {
          props.onVerify()
        }
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          props.onError(error.response?.data.Exception as string)
        }
      })
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  const handleAcceptClick = () => {
    handleVerify('Accepted')
  }

  const handleDenyClick = () => {
    handleVerify('Denied')
  }

  return (
    <TableRow
      key={props.seller.username}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <img
          className={styles.user_verify_image}
          src={
            props.seller.image !== ''
              ? `data:image/png;base64,${props.seller.image}`
              : DefaultUserImage
          }
          alt='Profile_picture'
        />
      </TableCell>
      <TableCell component='th' scope='row'>
        {props.seller.username}
      </TableCell>
      <TableCell>{props.seller.email}</TableCell>
      <TableCell>{props.seller.firstName + ' ' + props.seller.lastName}</TableCell>
      <TableCell>{formatDate(props.seller.birthDate)}</TableCell>
      <TableCell align='right'>{props.seller.address}</TableCell>
      <TableCell align='right'>
        {!props.verified && (
          <>
            <Button variant='contained' color='success' onClick={handleAcceptClick}>
              Accept
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={handleDenyClick}
              style={{ marginLeft: '16px' }}
            >
              Denied
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  )
}

export default SellerVerifyItem
