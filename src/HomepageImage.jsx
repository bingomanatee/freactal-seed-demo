import style from './Homepage.module.css';
import {withRouter} from 'react-router-dom';

export default withRouter(({image, history}) => (
  <div className={style.imageThumb} onClick={() => history.push(`/detail/${image.id}`)}>
  <h2>{image.title || '(untitiled)'}</h2>
  <img src={image.small_thumb.url}/>
    <button className={style['imageThumb__view-button']}>
      View
    </button>
</div>));