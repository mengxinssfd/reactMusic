import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import './tabbar.sass';

export default class Name extends Component {
  render() {
    console.log(this.props);
    return (
      <Fragment>
        <div className="tabbar">
          <NavLink className="tab-item" to="/recommend"><span>推荐</span></NavLink>
          <NavLink className="tab-item" to="/singer"><span>歌手</span></NavLink>
          <NavLink className="tab-item" to="/rank"><span>排行</span></NavLink>
          <NavLink className="tab-item" to="/search"><span>搜索</span></NavLink>
        </div>
      </Fragment>
    );
  }
}