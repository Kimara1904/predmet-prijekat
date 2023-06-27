import { useEffect, useState } from 'react'

import { Alert, AlertTitle, Button } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import ArticleForm from '../../ArticleForm/ArticleForm'
import ArticleList from '../../ArticleList/ArticleList'
import { getSellersArticle } from '../../../services/ArticleService'
import { Article } from '../../../models/ArticleModels'
import styles from './ArticleContent.module.css'
import alertStyle from '../../../App.module.css'
import { ErrorData } from '../../../models/ErrorModels'

const ArticleContent = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [articleList, setArticleList] = useState<Article[]>([])
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  const getSellersArticles = () => {
    getSellersArticle()
      .then((response) => {
        setArticleList(response.data)
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
    getSellersArticles()
  }, [])

  const handleClickButton = () => {
    setIsFormVisible((pervState) => !pervState)
  }

  return (
    <div className={styles.article_content}>
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
      <Button
        className={styles.article_content_button}
        variant='contained'
        onClick={handleClickButton}
      >
        {isFormVisible ? '-' : '+'}
      </Button>
      {isFormVisible && <ArticleForm />}
      <ArticleList articles={articleList} />
    </div>
  )
}
export default ArticleContent
