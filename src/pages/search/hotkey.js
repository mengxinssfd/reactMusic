import React, {Component} from 'react';
import './hotkey.sass';

export default class HotKey extends Component {
  clickHotKey(hotKey) {
    this.props.onInput(hotKey);
  }

  render() {
    let hotKey = this.props.hotKey;
    return (
      <div className={'cp-hot-key'}>
        <h1 className="key-title">热门搜索</h1>
        <ul>
          {
            hotKey.map(item => {
              return (
                <li
                  className="hot-key-item"
                  key={item.n}
                  onClick={this.clickHotKey.bind(this, item.k)}
                >{item.k}</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}