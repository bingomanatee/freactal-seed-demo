import {withRouter} from 'react-router-dom';
import {Component} from 'react';
import {injectState} from './lib/state';
import style from './Detail.module.css';

export default injectState(withRouter(class Detail extends Component {
  render () {
    const {history, effects, state} = this.props;
    return (<article className={style.Detail}>
      <h2>{state.image ? state.image.title || '(untitled)' : '...loading...'}</h2>
      <p>{state.image ? state.image.description || '-- no details--' : '...loading...'}</p>
      <div className={style.imageFrame}>
        {state.image ? (<img src={state.image.preview.url}/>) : <p>Loading...</p>}
      </div>
      <div className={style.buttonBar}>
        <button className={"primary"} type="button" onClick={(event) => {
          event.preventDefault();
          return effects.addImageToCart()
                        .then(() => history.push('/'));
        }}>Add To Cart
        </button>
        <button type="button" onClick={() => history.push('/')}> Go Home</button>
      </div>
    </article>);
  }

  componentDidMount () {
    const id = this.props.match.params.id;
    console.log('id = ', id);
    this.props.effects.loadImage(id);
  }
}));