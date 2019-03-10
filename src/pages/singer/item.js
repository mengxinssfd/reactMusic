import React, {Component} from 'react';
import './item.sass';

export default class Name extends Component {
  render() {
    let singer = this.props.singer;
    return (
      <li className="singer-item">
        <img src={singer.avatar} width="28" alt=""/>
        <span className="name">{singer.name}</span>
      </li>
    );
  }
}