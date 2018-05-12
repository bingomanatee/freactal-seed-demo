import {Component} from 'react';
import {injectState, wrapComponentWithState} from './lib/state';
import Homepage from './Homepage';
import Detail from './Detail';
import Cart from './Cart';
import style from './App.module.css';
import {Route} from 'react-router-dom'
import Header from './Header';
import About from './About'

export default wrapComponentWithState(() => (
  <div className={style.App}>
    <Header/>
    <div className="App">
      <h1>Welcome to Freactal Seed Demo!</h1>
      <div className={style.mainFrame}>
        <div className={style.mainFrame__content}>
          <Route path="/" exact component={Homepage}/>
          <Route path="/detail/:id" component={Detail}/>
          <Route path="/about" component={About}/>
        </div>
        <div className={style.mainFrame__sidebar}>
          <Cart/>
        </div>
      </div>
    </div>
  </div>
));