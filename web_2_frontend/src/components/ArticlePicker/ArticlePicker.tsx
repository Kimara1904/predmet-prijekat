import { Carousel, CarouselProps } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ArticleListProperties } from '../../models/Properties'
import ArticleItem from '../ArticleList/ArticleItem'
import styles from './ArticlePicker.module.css'

const ArticlePicker = (props: ArticleListProperties) => {
  const settings: Partial<CarouselProps> = {
    showArrows: true,
    infiniteLoop: true,
    transitionTime: 500,
    showThumbs: false,
    showStatus: true,
    showIndicators: true,
    autoPlay: true,
    stopOnHover: true,
    dynamicHeight: false,
    axis: 'horizontal',
    width: 250
  }
  return (
    <div className={styles.picker}>
      <Carousel {...settings}>
        {props.articles.map((article) => {
          return (
            <div key={article.id} className={styles.presenter}>
              <ArticleItem key={article.id} article={article} />
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default ArticlePicker
