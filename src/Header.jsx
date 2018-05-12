import style from './Header.module.css';
import {withRouter} from 'react-router-dom';
import {injectState} from "./lib/state";

export default withRouter(injectState(({history, state, effects}) => (
  <div>
    <div className={style.Header}>
      <div className={style['Header__link']}>
        User: {state.user.username}
      </div>
      <div className={style['Header__link']} onClick={() => history.push('/about')}>
        About This Site
      </div>
      <div className={`${style['Header__link']} ${style['Header__link--home']}`}  onClick={() => history.push('/')}>
        Home
      </div>
    </div>
    <a href="https://github.com/bingomanatee/freactal-seed-demo"
       target="_blank"><img className={style.GithubRibbon}
                            src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"
                            alt="Fork me on GitHub"/></a>
  </div>
)));