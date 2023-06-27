import { ChangeEvent, createRef, useEffect, useState } from 'react'

import { Alert, AlertTitle, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'

import articleDefault from '../../images/default_article_pictures.png'
import styles from './ArticleForm.module.css'
import alertStyle from '../../App.module.css'
import { CreateArticle, EditArticle } from '../../models/ArticleModels'
import { modifyArticle, createArticle } from '../../services/ArticleService'
import { ArticleFormProperties } from '../../models/Properties'
import { base64ToBlob } from '../../helpers/PictureHelper'
import { ErrorData } from '../../models/ErrorModels'

const ArticleForm = (props: ArticleFormProperties) => {
  const [errorNameMessages, setErrorNameMessages] = useState('Name is required')
  const [errors, setErrors] = useState({
    isNameError: false,
    isPriceError: false,
    isAmountError: false,
    isDescriptionError: false
  })
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0')
  const [amount, setAmount] = useState('0')
  const [description, setDescription] = useState('')
  const [filePreview, setFilePreview] = useState<string>()
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  const fileInputRef = createRef<HTMLInputElement>()

  const navigate = useNavigate()

  useEffect(() => {
    if (props.article) {
      setName(props.article.name)
      setPrice(props.article.price.toString())
      setAmount(props.article.amount.toString())
      setDescription(props.article.description)
      setFilePreview(props.article.image)
    }
  }, [props.article])

  const handleBlurName = () => {
    const nameLength = name.trim().length
    if (nameLength === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isNameError: true
      }))
      setErrorNameMessages('Name is required')
    } else if (nameLength > 20) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isNameError: true
      }))
      setErrorNameMessages('Name must have less than 20 characters')
    }
  }

  const handleBlurPrice = () => {
    if (parseFloat(price) <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isPriceError: true
      }))
    }
  }

  const handleBlurAmount = () => {
    if (parseInt(amount) <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isAmountError: true
      }))
    }
  }

  const handleBlurDescription = () => {
    if (description.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isDescriptionError: true
      }))
    }
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.trim()

    if (newValue === '') {
      newValue = '0'
    } else if (newValue.startsWith('0') && newValue.length > 1 && !newValue.includes('.')) {
      newValue = newValue.substring(1)
    }

    if (parseFloat(newValue) > 0) {
      setPrice(newValue)
    } else {
      setPrice('0')
    }
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.trim()

    if (newValue === '') {
      newValue = '0'
    } else if (newValue.startsWith('0') && newValue.length > 1) {
      newValue = newValue.substring(1)
    }

    if (parseInt(newValue) > 0) {
      setAmount(newValue)
    } else {
      setAmount('0')
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '.') {
      event.preventDefault()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        const rawData = base64String.split(';base64,')[1]
        setFilePreview(rawData)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const enteredName = name.trim()
    const enteredPrice = parseFloat(price)
    const enteredAmount = parseInt(amount)
    const enteredDescription = description.trim()
    const enteredImage = filePreview

    if (enteredName.length === 0 || enteredName.length > 20) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isNameError: true
      }))
      return
    }

    if (enteredPrice <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isPriceError: true
      }))
      return
    }

    if (enteredAmount <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isAmountError: true
      }))
    }

    if (enteredDescription.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isDescriptionError: true
      }))
      return
    }

    const request: CreateArticle | EditArticle = {
      name: enteredName,
      price: enteredPrice,
      amount: enteredAmount,
      description: enteredDescription,
      imageFile: enteredImage
    }

    const formData = new FormData()
    formData.append('name', request.name as string)
    formData.append('price', request.price.toString())
    formData.append('amount', request.amount.toString())
    formData.append('description', request.description as string)
    if (request.imageFile) {
      formData.append('imageFile', base64ToBlob(request.imageFile))
    }

    if (props.article) {
      modifyArticle(props.article.id, formData)
        .then((response) => {
          if (props.afterSucc === 'navigate') {
            navigate('/article_detail', { state: { article: response.data } })
          } else {
            if (props.onChangeValue) {
              props.onChangeValue(response.data)
            }
          }
        })
        .catch((error: AxiosError<ErrorData>) => {
          if (isAxiosError(error)) {
            setAlertError({
              isError: true,
              message: error.response?.data.Exception as string
            })
          }
        })
    } else {
      createArticle(formData)
        .then((response) => {
          navigate('/article_detail', { state: { article: response.data } })
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
  }
  return (
    <div className={styles.article_div_form}>
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
      {props.article && <Typography variant='h4'>Add new article</Typography>}
      <form onSubmit={handleSubmit}>
        <div className={styles.article_form}>
          <div className={styles.article_file}>
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
                  src={filePreview ? `data:image/png;base64,${filePreview}` : articleDefault}
                  alt='article'
                />
              }
              onClick={handleButtonClick}
              style={{
                backgroundSize: 'cover'
              }}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ marginTop: '16px', width: '100px' }}
            >
              {props.article ? 'Modify' : 'Create'}
            </Button>
          </div>
          <div className={styles.article_inputs}>
            <TextField
              id='ArticleName'
              type='text'
              label='Name'
              variant='outlined'
              error={errors.isNameError}
              helperText={errors.isNameError && errorNameMessages}
              value={name}
              onBlur={handleBlurName}
              onChange={handleChangeName}
              onFocus={() =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  isNameError: false
                }))
              }
              style={{ marginBottom: '16px' }}
            />
            <TextField
              id='ArticlePrice'
              type='number'
              label='Price'
              variant='outlined'
              error={errors.isPriceError}
              helperText={errors.isPriceError && 'Price must be bigger than 0'}
              value={price}
              onBlur={handleBlurPrice}
              onChange={handlePriceChange}
              onFocus={() =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  isPriceError: false
                }))
              }
              inputProps={{ inputMode: 'decimal', step: '0.01', min: '0.00' }}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              id='ArticleAmount'
              type='number'
              label='Amount'
              variant='outlined'
              error={errors.isAmountError}
              helperText={errors.isAmountError && 'Amount must be bigger than 0'}
              value={amount}
              onBlur={handleBlurAmount}
              onChange={handleAmountChange}
              onFocus={() =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  isAmountError: false
                }))
              }
              onKeyDown={handleKeyPress}
              inputProps={{ inputMode: 'numeric', min: '0', step: '1' }}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              id='ArticleDescription'
              multiline
              rows={4}
              type='text'
              label='Description'
              variant='outlined'
              error={errors.isDescriptionError}
              helperText={errors.isDescriptionError && 'Descriptor is required'}
              value={description}
              onBlur={handleBlurDescription}
              onChange={handleChangeDescription}
              onFocus={() =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  isDescriptionError: false
                }))
              }
              style={{ marginBottom: '16px' }}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
export default ArticleForm
