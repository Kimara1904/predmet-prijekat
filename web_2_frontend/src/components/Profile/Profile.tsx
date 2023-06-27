import { useEffect, useState } from 'react'

import {
  Alert,
  AlertTitle,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { User } from '../../models/UserModels'
import profileDefault from '../../images/default_user_picture.jpg'
import styles from './Profile.module.css'
import alertStyle from '../../App.module.css'
import { getMyProfile } from '../../services/UserService'
import { isSeller } from '../../helpers/AuthHelper'
import ProfileForm from '../ProfileForm/ProfileForm'
import { ErrorData } from '../../models/ErrorModels'

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User>()
  const [isShownEditForm, setIsShownEditForm] = useState(false)
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  useEffect(() => {
    getProfileInfo()
  }, [])

  const getProfileInfo = () => {
    getMyProfile()
      .then((response) => {
        setUserInfo(response.data)
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

  const handleClickEdit = () => {
    setIsShownEditForm(true)
  }

  const handleCloseForm = () => {
    setIsShownEditForm(false)
  }

  const handleChangeArticleValue = (user: User) => {
    setUserInfo(user)
    setIsShownEditForm(false)
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  return (
    <div className={styles.profile_detail}>
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
      <img
        src={userInfo?.image ? `data:image/png;base64,${userInfo?.image}` : profileDefault}
        alt='article'
      />
      <div className={styles.profile_info}>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Username:</Typography>
                </TableCell>
                <TableCell align='right'>{userInfo?.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Email:</Typography>
                </TableCell>
                <TableCell align='right'>{userInfo?.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Name:</Typography>
                </TableCell>
                <TableCell align='right'>
                  {(userInfo?.firstName as string) + ' ' + (userInfo?.lastName as string)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Birth date:</Typography>
                </TableCell>
                <TableCell align='right'>{formatDate(userInfo?.birthDate as string)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Address:</Typography>
                </TableCell>
                <TableCell align='right'>{userInfo?.address}</TableCell>
              </TableRow>
              {isSeller() && (
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Verify status:</Typography>
                  </TableCell>
                  <TableCell align='right'>{sessionStorage.getItem('verified')}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant='contained'
          onClick={handleClickEdit}
          style={{ marginTop: '16px', width: '100px' }}
        >
          Edit
        </Button>
      </div>
      <Modal
        open={isShownEditForm}
        onClose={handleCloseForm}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className={styles.profile_modal}>
          <ProfileForm user={userInfo as User} onChangeValue={handleChangeArticleValue} />
        </div>
      </Modal>
    </div>
  )
}

export default Profile
