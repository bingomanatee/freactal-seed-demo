import style from './Header.module.css';
import {withRouter} from 'react-router-dom';
import {injectState} from "./lib/state";

export default withRouter(injectState(({history, state, effects}) => (
  <div className={style.Header}>
    <div className={style['Header__link']}>
      User: {state.user.username}
    </div>
    <div className={style['Header__link']} onClick={() => history.push('/about')}>
      About This Site
    </div>
    <div className={style['Header__link']} style={({flexGrow: 100})} onClick={() => history.push('/')}>
      Home
    </div>
  </div>
)));