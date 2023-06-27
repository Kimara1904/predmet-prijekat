import { useState } from 'react'

import {
  Alert,
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

import { SellerVerifyListProperties } from '../../models/Properties'
import SellerVerifyItem from './SellerVerifyItem'
import alertStyle from '../../App.module.css'

const SellerVerifyList = (props: SellerVerifyListProperties) => {
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  const handleError = (message: string) => {
    setAlertError({
      isError: true,
      message: message
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead sx={{ backgroundColor: 'var(--blue_color)' }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right' />
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'var(--cream_color)' }}>
            {props.sellers.length !== 0 ? (
              props.sellers.map((seller) => {
                return (
                  <SellerVerifyItem
                    key={seller.username}
                    seller={seller}
                    verified={props.verified}
                    onVerify={props.onVerify}
                    onError={handleError}
                  />
                )
              })
            ) : (
              <TableRow>
                <TableCell align='center' colSpan={6}>
                  <Typography variant='body2'>There is no users</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SellerVerifyList
