import { useContext, useEffect, useState } from 'react'

import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Modal,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'

import { ArticleItemProperties } from '../../models/Properties'
import articleDefault from '../../images/default_article_pictures.png'
import styles from './ArticleList.module.css'
import alertStyle from '../../App.module.css'
import { isCustomer, isSellerVerified } from '../../helpers/AuthHelper'
import CartContext from '../../store/cart-context'
import { PickedItemInfo } from '../../models/OrderItemModels'
import ArticleForm from '../ArticleForm/ArticleForm'
import { deleteArticle } from '../../services/ArticleService'
import { ErrorData } from '../../models/ErrorModels'

const ArticleItem = (prop: ArticleItemProperties) => {
  const cartContext = useContext(CartContext)
  const [picked, setPicked] = useState(
    cartContext.items.some((item) => item.articleId === prop.article.id)
  )
  const [isShownEditForm, setIsShownEditForm] = useState(false)
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setPicked(cartContext.items.some((item) => item.articleId === prop.article.id))
  }, [cartContext.items, prop.article.id])

  const handleRemoveItemFromCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    cartContext.onRemove(prop.article.id)
    setPicked(false)
  }

  const handleAddItemInCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    const item: PickedItemInfo = {
      articleId: prop.article.id,
      name: prop.article.name,
      price: prop.article.price,
      amount: 1,
      capacity: prop.article.amount
    }
    cartContext.onAdd(item)
    setPicked(true)
  }

  const handleClickArticle = () => {
    navigate('/article_detail', { state: { article: prop.article } })
  }

  const handleClickEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setIsShownEditForm(true)
  }

  const handleCloseForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setIsShownEditForm(false)
  }

  const handleDeleteArticle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    deleteArticle(prop.article?.id)
      .then(() => {
        window.location.reload()
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

  const handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
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

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`Are you sure you want to delete artikle: ${prop.article.id}. ${prop.article.name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteArticle}>Yes</Button>
          <Button onClick={handleCloseDialog}>No</Button>
        </DialogActions>
      </Dialog>

      <div
        className={styles.article_item}
        onClick={handleClickArticle}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClickArticle()
          }
        }}
      >
        <img
          src={prop.article.image ? `data:image/png;base64,${prop.article.image}` : articleDefault}
          alt='article'
        />
        <Typography>{prop.article.name}</Typography>
        <Typography>{`${prop.article.price} RSD`}</Typography>
        <Typography>{`Amount: ${prop.article.amount}`}</Typography>
        {isCustomer() &&
          (picked ? (
            <IconButton aria-label='delete' color='primary' onClick={handleRemoveItemFromCart}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              color='primary'
              aria-label='add to shopping cart'
              disabled={prop.article.amount <= 0}
              onClick={handleAddItemInCart}
            >
              <AddShoppingCartIcon />
            </IconButton>
          ))}
        {isSellerVerified() && (
          <div>
            <IconButton aria-label='edit' onClick={handleClickEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label='delete' onClick={handleOpenDialog}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>
      <Modal
        open={isShownEditForm}
        onClose={handleCloseForm}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <ArticleForm article={prop.article} afterSucc='navigate' />
        </div>
      </Modal>
    </div>
  )
}

export default ArticleItem
