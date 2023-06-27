import { useEffect, useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { Article } from '../../models/ArticleModels'
import articleDefault from '../../images/default_article_pictures.png'
import styles from './ArticleDetail.module.css'
import alertStyle from '../../App.module.css'
import ArticleForm from '../ArticleForm/ArticleForm'
import { deleteArticle } from '../../services/ArticleService'
import { ErrorData } from '../../models/ErrorModels'

const ArticleDetail = () => {
  const [article, setArticle] = useState<Article>()
  const [isShownEditForm, setIsShownEditForm] = useState(false)
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const location = useLocation().state as { article: Article }

  const navigate = useNavigate()

  useEffect(() => {
    const storedArticleData = sessionStorage.getItem('article')
    if (storedArticleData) {
      const parsedArticle = JSON.parse(storedArticleData) as Article
      setArticle(parsedArticle)
    } else if (location.article) {
      setArticle(location.article)
    }
  }, [location.article])

  const handleEditClick = () => {
    setIsShownEditForm(true)
  }

  const handleCloseForm = () => {
    setIsShownEditForm(false)
  }

  const handleChangeArticleValue = (newArticle: Article) => {
    setArticle(newArticle)
    sessionStorage.setItem('article', JSON.stringify(newArticle))
    setIsShownEditForm(false)
  }

  const handleDeleteLocalArticle = () => {
    sessionStorage.removeItem('article')
  }

  const handleDeleteArticle = () => {
    deleteArticle(article?.id as number)
      .then(() => {
        navigate('/dashboard')
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setAlertError({
            isError: true,
            message: error.response?.data.Exception as string
          })
        }
      })

    setIsDialogOpen(false)
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <div>
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
      {article && (
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {`Are you sure you want to delete artikle: ${article.id}. ${article.name}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteArticle}>Yes</Button>
            <Button onClick={handleCloseDialog}>No</Button>
          </DialogActions>
        </Dialog>
      )}
      <div className={styles.article_detail_link_back}>
        <Link to='/dashboard' onClick={handleDeleteLocalArticle}>
          Back to Dashboard
        </Link>
      </div>
      <div className={styles.article_detail}>
        <div className={styles.article_detail_img_button}>
          <img
            src={article?.image ? `data:image/png;base64,${article.image}` : articleDefault}
            alt='article'
          />
          <div className={styles.article_detail_buttons}>
            <Button
              variant='contained'
              onClick={handleEditClick}
              style={{ marginTop: '16px', width: '100px' }}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={handleOpenDialog}
              style={{ marginTop: '16px', width: '100px' }}
            >
              Delete
            </Button>
          </div>
        </div>
        <div className={styles.article_info}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Name:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.name || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Price:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.price || ''} RSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Amount:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.amount || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Description:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.description || ''}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
        <div>
          <ArticleForm
            article={article}
            afterSucc='changeValue'
            onChangeValue={handleChangeArticleValue}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ArticleDetail
