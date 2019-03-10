import {Component} from 'react';

const stores = {};
export default class AlivePage extends Component {
  hasData = false;
  componentWillMount() {
    let location = window.location;
    let url = location.pathname + location.search;
    this.path = location.pathname;
    this.url = url;
    let store = stores[this.path];
    if (store && store.url && store.url === url) {
      let state = store.state;
      // 正在loading的时候跳转的话，会一直loading
      if (state.isLoading) state.isLoading = false;
      this.setState(state);
      this.data = store.data;
      this.hasData = true;
      setTimeout(function () {
        document.body.scrollTop = store.bdScrollTop;
        document.documentElement.scrollTop = store.deScrollTop;
      }, 10);
    }
  }

  componentWillUnmount() {
    // console.log('ddddddddddd', window.location);
    console.log('componentWillUnmount', this.url);
    stores[this.path] = {
      url: this.url,
      data: this.data,
      state: this.state,
      bdScrollTop: document.body.scrollTop,
      deScrollTop: document.documentElement.scrollTop,
    };
  }

}