import React from 'react';
import ReactDOM from 'react-dom';
import './common/style/index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import {eventBus, eventType} from './common/js/evenBus';

let last = 0;

function scrollHandler() {
  let bodyHeight = document.body.offsetHeight;
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  let screenHeight = document.documentElement.clientHeight || window.innerHeight;

  if (last > 0 && scrollTop === 0) {
    console.log('scroll start');
    eventBus.emit(eventType.scrollStart);
  }
  console.log(Math.abs(bodyHeight - scrollTop - screenHeight));
  if (Math.abs(bodyHeight - scrollTop - screenHeight) < 1) {
    console.log('scroll end');
    eventBus.emit(eventType.scrollEnd);
  }
  last = scrollTop;
}

scrollHandler();
window.addEventListener('scroll', scrollHandler);
ReactDOM.render(<App/>, document.getElementById('root'));

// ReactDOM.render(<Router routes={routers}/>, document.body);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
