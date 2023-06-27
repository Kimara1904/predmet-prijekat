import { ChangeEvent, createRef, useState } from 'react'

import { Alert, AlertTitle, Button, TextField } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { ProfileFormProperties } from '../../models/Properties'
import { EditProfile, User } from '../../models/UserModels'
import styles from './ProfileForm.module.css'
import alertStyle from '../../App.module.css'
import userDefault from '../../images/default_user_picture.jpg'
import { editMyProfile } from '../../services/UserService'
import { base64ToBlob } from '../../helpers/PictureHelper'
import { ErrorData } from '../../models/ErrorModels'

const ProfileForm = (props: ProfileFormProperties) => {
  const [userInfo, setUserInfo] = useState<User>(props.user)
  const [passwords, setPasswords] = useState({
    old: '',
    new: ''
  })
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('New password is required')
  const [isPasswordChanging, setIsPasswordChanging] = useState(false)
  const [errors, setErrors] = useState({
    isUsernameError: false,
    isOldPasswordError: false,
    isNewPasswordError: false,
    isFirstNameError: false,
    isLastNameError: false,
    isBirthDateError: false,
    isAddressError: false
  })
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  const fileInputRef = createRef<HTMLInputElement>()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }))
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPasswords((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }))
  }

  const handleClickChangePassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setIsPasswordChanging((pervState) => !pervState)
  }

  const handleBlurUsername = () => {
    if (userInfo.username.trim().length < 6 || userInfo.username.trim().length > 15) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isUsernameError: true
      }))
    }
  }

  const handleBlurOldPassword = () => {
    if (isPasswordChanging && passwords.old.trim().length === 0) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isOldPasswordError: true
      }))
    }
  }

  const handleBlurNewPassword = () => {
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/
    if (isPasswordChanging) {
      if (passwords.new.trim().length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          isNewPasswordError: true
        }))
        setNewPasswordErrorMessage('Password is required')
      } else if (!pattern.test(passwords.new)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          isNewPasswordError: true
        }))
        setNewPasswordErrorMessage(
          'Password must contain at least one uppercase, \nlowercase letter, digit, special character \nand must have between 8 and 18 characters'
        )
      }
    }
  }

  const handleBlurFirstName = () => {
    if (userInfo.firstName.trim().length > 30) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isFirstNameError: true
      }))
    }
  }

  const handleBlurLastName = () => {
    if (userInfo.lastName.trim().length > 30) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isLastNameError: true
      }))
    }
  }

  const handleBlurBirthDate = () => {
    const enteredDate = userInfo.birthDate
    const selectedDate = new Date(enteredDate)
    const currentDate = new Date()
    const minAgeDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    )
    if (selectedDate > minAgeDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isBirthDateError: true
      }))
    }
  }

  const handleBlurAddress = () => {
    if (userInfo.address.trim().length > 40) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isAddressError: true
      }))
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        const rawData = base64String.split(';base64,')[1]
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          image: rawData
        }))
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (userInfo.username.trim().length < 6 || userInfo.username.trim().length > 15) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isUsernameError: true
      }))
      return
    }
    if (isPasswordChanging) {
      if (passwords.old.trim().length === 0) {
        setErrors((pervErrors) => ({
          ...pervErrors,
          isOldPasswordError: true
        }))
        return
      }
      const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/
      if (passwords.new.trim().length === 0 || !pattern.test(passwords.new)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          isNewPasswordError: true
        }))
        return
      }
    }
    if (userInfo.firstName.trim().length > 30) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isFirstNameError: true
      }))
      return
    }
    if (userInfo.lastName.trim().length > 30) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isLastNameError: true
      }))
      return
    }
    const enteredDate = userInfo.birthDate
    const selectedDate = new Date(enteredDate)
    const currentDate = new Date()
    const minAgeDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    )
    if (selectedDate > minAgeDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isBirthDateError: true
      }))
      return
    }
    if (userInfo.address.trim().length > 40) {
      setErrors((pervErrors) => ({
        ...pervErrors,
        isAddressError: true
      }))
      return
    }

    const request: EditProfile = {
      username: userInfo.username,
      email: userInfo.email,
      oldPassword: passwords.old,
      newPassword: passwords.new,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      birthDate: userInfo.birthDate,
      address: userInfo.address,
      fileImage: userInfo.image
    }

    const formData = new FormData()
    Object.entries(request).forEach(([key, value]) => {
      if (value && key !== 'fileImage') {
        formData.append(key, value as string)
      }
    })

    if (request.fileImage) {
      formData.append('fileImage', base64ToBlob(request.fileImage))
    }

    editMyProfile(formData)
      .then((response) => {
        props.onChangeValue(response.data)
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
    <div className={styles.div_profile_form}>
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
      <form className={styles.profile_form} onSubmit={handleSubmit}>
        <div className={styles.profile_img_button}>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Button
            variant='text'
            color='primary'
            startIcon={
              <img
                src={userInfo.image ? `data:image/png;base64,${userInfo.image}` : userDefault}
                alt='article'
              />
            }
            onClick={handleButtonClick}
            style={{
              backgroundSize: 'cover'
            }}
          />
        </div>
        <div className={styles.profile_input}>
          <TextField
            id='ProfileUsername'
            name='username'
            type='text'
            label='Username'
            variant='outlined'
            error={errors.isUsernameError}
            helperText={errors.isUsernameError && 'Username must have between 6 and 15 characters'}
            value={userInfo.username}
            onBlur={handleBlurUsername}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                isUsernameError: false
              }))
            }
            className={styles.text_field}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            id='ProfileEmail'
            name='email'
            type='email'
            label='Email'
            variant='outlined'
            value={userInfo.email}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                isEmailError: false
              }))
            }
            className={styles.text_field}
            style={{ marginBottom: '16px' }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleClickChangePassword}
            style={{ marginBottom: '16px', width: '100px' }}
          >
            {isPasswordChanging ? 'Cancel change password' : 'Change password'}
          </Button>
          {isPasswordChanging && (
            <div className={styles.profile_password}>
              <TextField
                id='ProfileOldPassword'
                name='old'
                type='password'
                label='Old password'
                variant='outlined'
                error={errors.isOldPasswordError}
                helperText={errors.isOldPasswordError && 'Old password is required'}
                value={passwords.old}
                onBlur={handleBlurOldPassword}
                onChange={handleChangePassword}
                onFocus={() =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    isOldPasswordError: false
                  }))
                }
                FormHelperTextProps={{
                  className: styles.helper_text
                }}
                className={styles.text_field}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                id='ProfileNewPassword'
                name='new'
                type='password'
                label='New password'
                variant='outlined'
                error={errors.isNewPasswordError}
                helperText={errors.isNewPasswordError && newPasswordErrorMessage}
                value={passwords.new}
                onBlur={handleBlurNewPassword}
                onChange={handleChange}
                onFocus={() =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    isNewPasswordError: false
                  }))
                }
                FormHelperTextProps={{
                  className: styles.helper_text
                }}
                className={styles.text_field}
                style={{ marginBottom: '16px' }}
              />
            </div>
          )}
          <TextField
            id='ProfileFirstName'
            name='firstName'
            type='text'
            label='First name'
            variant='outlined'
            error={errors.isFirstNameError}
            helperText={errors.isFirstNameError && 'First name must have max 30 characters'}
            value={userInfo.firstName}
            onBlur={handleBlurFirstName}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                isFirstNameError: false
              }))
            }
            className={styles.text_field}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            id='ProfileLastName'
            name='lastName'
            type='text'
            label='Last name'
            variant='outlined'
            error={errors.isLastNameError}
            helperText={errors.isLastNameError && 'Last name must have max 30 characters'}
            value={userInfo.lastName}
            onBlur={handleBlurLastName}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                isLastNameError: false
              }))
            }
            className={styles.text_field}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            id='ProfileBirthDate'
            name='birthDate'
            type='date'
            label='Birth date'
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
            error={errors.isBirthDateError}
            helperText={errors.isBirthDateError && 'You must be at least 18 years old'}
            value={userInfo.birthDate.split('T')[0]}
            onBlur={handleBlurBirthDate}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                isBirthDateError: false
              }))
            }
            className={styles.text_field}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            id='ProfileAddress'
            name='address'
            type='text'
            label='Address'
            variant='outlined'
            error={errors.isAddressError}
            helperText={errors.isAddressError && 'Address must have max 40 characters'}
            value={userInfo.address}
            onBlur={handleBlurAddress}
            onChange={handleChange}
            onFocus={() =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                isAddressError: false
              }))
            }
            className={styles.text_field}
            style={{ marginBottom: '16px' }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: '16px', width: '100px' }}
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
