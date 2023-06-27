import { ChangeEvent, createRef, useState } from 'react'

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
import { Link } from 'react-router-dom'

import styles from './RegisterForm.module.css'
import alertStyle from '../../App.module.css'
import { RegisterRequest } from '../../models/AuthenticationModels'
import { register } from '../../services/AuthenticationService'
import { ErrorData } from '../../models/ErrorModels'

const RegisterForm = () => {
  const [errors, setErrors] = useState({
    isUsernameError: false,
    isEmailError: false,
    isPasswordError: false,
    isFirstNameError: false,
    isLastNameError: false,
    isBirthDateError: false,
    isAddressError: false
  })

  const [alert, setAlert] = useState({
    message: '',
    severity: 'success'
  })

  const [errorMessages, setErrorMessages] = useState({
    usernameErrorMessage: 'Username is required',
    passwordErrorMessage: 'Password is required',
    firstNameErrorMessage: 'First name is required',
    lastNameErrorMessage: 'Last name is required',
    birthDateErrorMessage: 'Birth date is required',
    addressErrorMessage: 'Address is required'
  })

  const [role, setRole] = useState('Customer')

  const usernameRef = createRef<HTMLInputElement>()
  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()
  const firstNameRef = createRef<HTMLInputElement>()
  const lastNameRef = createRef<HTMLInputElement>()
  const birthDateRef = createRef<HTMLInputElement>()
  const addressRef = createRef<HTMLInputElement>()

  const handleBlurUsername = () => {
    const usernameLength = usernameRef.current?.value.trim().length as number
    if (usernameLength === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isUsernameError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        usernameErrorMessage: 'Username is required'
      }))
    } else if (usernameLength < 6 || usernameLength > 15) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isUsernameError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        usernameErrorMessage: 'Username must have between 6 and 15 characters'
      }))
    }
  }

  const handleBlurEmail = () => {
    if (emailRef.current?.value.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isEmailError: true
      }))
    }
  }

  const handleBlurPassword = () => {
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/
    const enteredPassword = passwordRef.current?.value.trim() as string
    if (enteredPassword.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isPasswordError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        passwordErrorMessage: 'Password is required'
      }))
    } else if (!pattern.test(enteredPassword)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isPasswordError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        passwordErrorMessage:
          'Password must contain at least one uppercase, \nlowercase letter, digit, special character \nand must have between 8 and 18 characters'
      }))
    }
  }

  const handleBlurFirstName = () => {
    const firstNameLength = firstNameRef.current?.value.trim().length as number
    if (firstNameLength === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isFirstNameError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        firstNameErrorMessage: 'First name is required'
      }))
    } else if (firstNameLength > 30) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isFirstNameError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        firstNameErrorMessage: 'First name must have max 30 characters'
      }))
    }
  }

  const handleBlurLastName = () => {
    const lastNameLength = lastNameRef.current?.value.trim().length as number
    if (lastNameLength === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isLastNameError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        lastNameErrorMessage: 'Last name is required'
      }))
    } else if (lastNameLength > 30) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isLastNameError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        lastNameErrorMessage: 'Last name must have max 30 characters'
      }))
    }
  }

  const handleBlurAddress = () => {
    const addressLength = addressRef.current?.value.trim().length as number
    if (addressLength === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isAddressError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        addressErrorMessage: 'Address is required'
      }))
    } else if (addressLength > 40) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isAddressError: true
      }))
      setErrorMessages((pervErrorMessage) => ({
        ...pervErrorMessage,
        addressErrorMessage: 'Address must have max 40 characters'
      }))
    }
  }

  const handleBlurBirthDate = () => {
    const enteredDate = birthDateRef.current?.value as string
    const selectedDate = new Date(enteredDate)
    const currentDate = new Date()
    const minAgeDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    )

    if (enteredDate.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isBirthDateError: true
      }))
      setErrorMessages((prevErrorMessage) => ({
        ...prevErrorMessage,
        birthDateErrorMessage: 'Birth date is required'
      }))
    } else if (selectedDate > minAgeDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isBirthDateError: true
      }))
      setErrorMessages((prevErrorMessage) => ({
        ...prevErrorMessage,
        birthDateErrorMessage: 'You must be at least 18 years old'
      }))
    }
  }

  const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredData: RegisterRequest = {
      username: usernameRef.current?.value.trim() as string,
      email: emailRef.current?.value.trim() as string,
      password: passwordRef.current?.value.trim() as string,
      firstName: firstNameRef.current?.value.trim() as string,
      lastName: lastNameRef.current?.value.trim() as string,
      birthDate: new Date(birthDateRef.current?.value as string),
      address: addressRef.current?.value.trim() as string,
      role: role
    }

    if (
      enteredData.username.length === 0 ||
      enteredData.username.length < 6 ||
      enteredData.username.length > 15
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isUsernameError: true
      }))
      return
    }

    if (enteredData.email.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isEmailError: true
      }))
      return
    }

    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/
    if (enteredData.password.length === 0 || !pattern.test(enteredData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isPasswordError: true
      }))
      return
    }

    if (enteredData.firstName.length === 0 || enteredData.firstName.length > 30) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isFirstNameError: true
      }))
      return
    }

    if (enteredData.lastName.length === 0 || enteredData.lastName.length > 30) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isLastNameError: true
      }))
      return
    }

    if (enteredData.address.length === 0 || enteredData.address.length > 30) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isAddressError: true
      }))
      return
    }

    const currentDate = new Date()
    const minAgeDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    )

    if (
      (birthDateRef.current?.value as string).length === 0 ||
      enteredData.birthDate > minAgeDate
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isBirthDateError: true
      }))
      return
    }

    register(enteredData)
      .then((response) => {
        setAlert({
          message: response.data,
          severity: 'success'
        })
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setAlert({
            message: error.response?.data.Exception as string,
            severity: 'error'
          })
        }
      })
  }

  return (
    <div className={styles.div_register_form}>
      {alert.message !== '' && (
        <Alert
          className={alertStyle.alert}
          severity={alert.severity as AlertColor}
          onClose={() => setAlert({ message: '', severity: 'success' })}
        >
          <AlertTitle>
            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
          </AlertTitle>
          {alert.message}
        </Alert>
      )}
      <form className={styles.register_form} onSubmit={handleSubmit}>
        <Typography variant='h4' style={{ marginBottom: '16px' }}>
          Register
        </Typography>
        <TextField
          id='RegisterUsername'
          type='text'
          label='Username'
          variant='outlined'
          error={errors.isUsernameError}
          helperText={errors.isUsernameError && errorMessages.usernameErrorMessage}
          inputRef={usernameRef}
          onBlur={handleBlurUsername}
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
          id='RegisterEmail'
          type='email'
          label='Email'
          variant='outlined'
          error={errors.isEmailError}
          helperText={errors.isEmailError && 'Email is required'}
          inputRef={emailRef}
          onBlur={handleBlurEmail}
          onFocus={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              isEmailError: false
            }))
          }
          className={styles.text_field}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='RegisterPassword'
          type='password'
          label='Password'
          variant='outlined'
          error={errors.isPasswordError}
          helperText={errors.isPasswordError && errorMessages.passwordErrorMessage}
          inputRef={passwordRef}
          onBlur={handleBlurPassword}
          onFocus={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              isPasswordError: false
            }))
          }
          FormHelperTextProps={{
            className: styles.helper_text
          }}
          className={styles.text_field}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='RegisterFirstName'
          type='text'
          label='First name'
          variant='outlined'
          error={errors.isFirstNameError}
          helperText={errors.isFirstNameError && errorMessages.firstNameErrorMessage}
          inputRef={firstNameRef}
          onBlur={handleBlurFirstName}
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
          id='RegisterLastName'
          type='text'
          label='Last name'
          variant='outlined'
          error={errors.isLastNameError}
          helperText={errors.isLastNameError && errorMessages.lastNameErrorMessage}
          inputRef={lastNameRef}
          onBlur={handleBlurLastName}
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
          id='RegisterBirthDate'
          type='date'
          label='Birth date'
          InputLabelProps={{
            shrink: true
          }}
          variant='outlined'
          error={errors.isBirthDateError}
          helperText={errors.isBirthDateError && errorMessages.birthDateErrorMessage}
          inputRef={birthDateRef}
          onBlur={handleBlurBirthDate}
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
          id='RegisterAddress'
          type='text'
          label='Address'
          variant='outlined'
          error={errors.isAddressError}
          helperText={errors.isAddressError && 'Email is required'}
          inputRef={addressRef}
          onBlur={handleBlurAddress}
          onFocus={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              isAddressError: false
            }))
          }
          className={styles.text_field}
          style={{ marginBottom: '16px' }}
        />
        <FormLabel id='RoleLabel'>Role</FormLabel>
        <RadioGroup
          aria-labelledby='RoleLabel'
          id='RegisterRole'
          row
          defaultValue='Customer'
          value={role}
          onChange={handleChangeRole}
        >
          <FormControlLabel value='Customer' control={<Radio />} label='Customer' />
          <FormControlLabel value='Seller' control={<Radio />} label='Seller' />
        </RadioGroup>
        <div className={styles.register_buttons}>
          <Link to='/login'>Login</Link>
          <Button type='submit' variant='contained' color='primary'>
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
