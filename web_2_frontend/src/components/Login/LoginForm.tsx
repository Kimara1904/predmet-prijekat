import React, { createRef, useState } from 'react'

import jwtDecode from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'
import { Button, TextField, Typography } from '@mui/material'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'

import { googleAuth, login } from '../../services/AuthenticationService'
import { Jwt, roleKey } from '../../models/TokenModel'
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const [isEmailError, setIsEmailError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isLoginError, setIsLoginError] = useState(false)

  const navigate = useNavigate()

  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()

  const handleBlurEmail = () => {
    if (emailRef.current?.value.trim().length === 0) {
      setIsEmailError(true)
    }
  }

  const handleBlurPassword = () => {
    if (passwordRef.current?.value.trim().length === 0) {
      setIsPasswordError(true)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredEmail = emailRef.current?.value as string
    const enteredPassword = passwordRef.current?.value as string

    if (enteredEmail.trim().length === 0) {
      setIsEmailError(true)
      return
    }

    if (enteredPassword.trim().length === 0) {
      setIsPasswordError(true)
      return
    }

    login({ email: enteredEmail, password: enteredPassword })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('role', jwtDecode<Jwt>(response.data.token)[roleKey])
        sessionStorage.setItem('verified', jwtDecode<Jwt>(response.data.token).Verified)
        navigate('/')
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          setIsLoginError(true)
        }
      })
  }

  const handleSuccess = (request: CredentialResponse) => {
    googleAuth({ token: request.credential as string })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('role', jwtDecode<Jwt>(response.data.token)[roleKey])
        sessionStorage.setItem('verified', jwtDecode<Jwt>(response.data.token).Verified)
        navigate('/')
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          setIsLoginError(true)
        }
      })
  }
  return (
    <div className={styles.div_login_form}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <TextField
          id='LoginEmail'
          type='email'
          label='Email'
          variant='outlined'
          error={isEmailError}
          helperText={isEmailError && 'Email is required'}
          inputRef={emailRef}
          onBlur={handleBlurEmail}
          onFocus={() => setIsEmailError(false)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='LoginPassword'
          type='password'
          label='Password'
          variant='outlined'
          error={isPasswordError}
          helperText={isPasswordError && 'Password is required'}
          inputRef={passwordRef}
          onBlur={handleBlurPassword}
          onFocus={() => setIsPasswordError(false)}
          style={{ marginBottom: '16px' }}
        />
        {isLoginError && (
          <Typography variant='body2' color='error' style={{ marginBottom: '16px' }}>
            Wrong credentials
          </Typography>
        )}
        <div className={styles.login_buttons}>
          <Link to='/register'>Register</Link>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginBottom: '16px' }}
          >
            Login
          </Button>
        </div>
        <GoogleLogin onSuccess={handleSuccess} />
      </form>
    </div>
  )
}

export default LoginForm
