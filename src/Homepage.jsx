import style from './Homepage.module.css';
import {injectState} from './lib/state';
import {history} from 'react-router-dom';
import {Component} from 'react';
import HomepageImage from './HomepageImage';
/*

 */
export default injectState(class Homepage extends Component {
  render () {
    const {state, effects, history} = this.props;
    return (
      <div className={style.imageList}>
        {(!state.images) ? ' -- loading -- ' : state.images.map((image, index) => (<HomepageImage key={`${index}__${image.id}`} image={image}/>))}
      </div>);
  }

  componentDidMount () {
    if (!(this.props.state.images && (this.props.state.images.length > 0))) {
      this.props.effects.loadImages();
    }
  }

});



