import React, {Component} from 'react';
import './item.sass';

export default class Item extends Component {
  constructor(prop) {
    super(prop);
    console.log('');
  }

  render() {
    let item = this.props.itemData;
    return (<li className="disc-item" onClick={this.clickDisc}>
      <div className="left">
        <img className="avatar" alt={item.dissname} src={item.imgurl} width="60"/>
      </div>
      <div className="right">
        <h2 className="title">{item.dissname}</h2>
        <span className="name">{item.creator.name}</span>
      </div>
    </li>);
  }
}