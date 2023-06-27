import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import { Alert, AlertTitle } from '@mui/material'

import SellerVerifyList from '../../SellerVerifyList/SellerVerifyList'
import { User } from '../../../models/UserModels'
import { getUnverifiedSeller } from '../../../services/UserService'
import { ErrorData } from '../../../models/ErrorModels'
import alertStyle from '../../../App.module.css'

const UnverifiedSellerContent = () => {
  const [unverifiedSellers, setUnverifiedSellers] = useState<User[]>([])
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  const getUnverifiedSellers = () => {
    getUnverifiedSeller()
      .then((response) => {
        setUnverifiedSellers(response.data)
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

  useEffect(() => {
    getUnverifiedSellers()
  }, [])

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
      <SellerVerifyList
        sellers={unverifiedSellers}
        verified={false}
        onVerify={getUnverifiedSellers}
      />
    </>
  )
}

export default UnverifiedSellerContent
