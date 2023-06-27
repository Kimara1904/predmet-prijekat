import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import { Alert, AlertTitle } from '@mui/material'

import { getAllArticles } from '../../../services/ArticleService'
import ArticlePicker from '../../ArticlePicker/ArticlePicker'
import { Article } from '../../../models/ArticleModels'
import styles from './PlaceOrderContent.module.css'
import alertStyle from '../../../App.module.css'
import OrderForm from '../../OrderForm/OrderForm'
import { ErrorData } from '../../../models/ErrorModels'

const PlaceOrderContent = () => {
  const [articleList, setArticleList] = useState<Article[]>([])
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  useEffect(() => {
    getArticles()
  }, [])

  function getArticles() {
    getAllArticles()
      .then((response) => setArticleList(response.data))
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
    <div className={styles.place_order_div}>
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
      <ArticlePicker articles={articleList} />
      <OrderForm />
    </div>
  )
}

export default PlaceOrderContent
