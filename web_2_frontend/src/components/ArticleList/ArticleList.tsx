import { Typography } from '@mui/material'

import { ArticleListProperties } from '../../models/Properties'
import ArticleItem from './ArticleItem'
import styles from './ArticleList.module.css'

const ArticleList = (prop: ArticleListProperties) => {
  return (
    <div className={styles.article_list}>
      {prop.articles.length === 0 ? (
        <Typography variant='body2'>Nema artikala</Typography>
      ) : (
        prop.articles.map((article) => {
          return <ArticleItem key={article.id} article={article} />
        })
      )}
    </div>
  )
}

export default ArticleList
