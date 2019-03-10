import React, {Component} from 'react';
import './song-item.sass';

export default class Name extends Component {
  constructor(prop) {
    super(prop);
    console.log('');
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let song = this.props.song || {};
    let index = this.props.index;
    return (
        <li className={'cp-song-item ' + (song.payplay ? 'need-pay' : '')}
        >
          <div className="order">
            <div><span className="number">{index + 1}</span></div>
          </div>
          <div className="content">
            <h1 className="title">
              <span className="has-mv">mv</span>
              <span>{song.name}</span>
            </h1>
            <div className="desc">
              {song.singer} -《{song.album.name}》
            </div>
          </div>
        </li>
    );
  }
}