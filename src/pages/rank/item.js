import React, {Component} from 'react';
import './item.sass';

export default class Item extends Component {
  isMV(list) {
    return /MV/.test(list.ListName);
  }

  render() {
    let rank = this.props.rank;
    if (this.isMV(rank)) return '';
    return (
      <li className="rank-item">
        <div className="left">
          <img
            className="cover"
            width="100%"
            height="100%"
            src={rank.pic_v12}
            alt=""/>
        </div>
        <div className="right">
          <div style={{display: 'none'}}>{rank.ListName}</div>
          <ul>
            {
              rank.songlist.length > 0 && rank.songlist.map((song, index) => (
                <li key={song.songid} className="song-item">
                  <span>{index + 1}</span><
                  span>{song.singername}</span>- <
                  span>{song.songname}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </li>
    );
  }
}