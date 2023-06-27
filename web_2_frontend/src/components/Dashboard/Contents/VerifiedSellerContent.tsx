import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import { Alert, AlertTitle } from '@mui/material'

import SellerVerifyList from '../../SellerVerifyList/SellerVerifyList'
import { User } from '../../../models/UserModels'
import { getVerifiedSeller } from '../../../services/UserService'
import { ErrorData } from '../../../models/ErrorModels'
import alertStyle from '../../../App.module.css'

const VerifyContent = () => {
  const [verifiedSellers, setVerifiedSellers] = useState<User[]>([])
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  useEffect(() => {
    getVerifiedSeller()
      .then((response) => {
        setVerifiedSellers(response.data)
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
      <SellerVerifyList sellers={verifiedSellers} verified={true} />
    </>
  )
}

export default VerifyContent
