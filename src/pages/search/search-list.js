import React, {Component} from 'react';
import "./search-list.sass"
import SongItem from '../../components/song-item/song-item';

export default class Name extends Component {
  constructor(prop) {
    super(prop);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let list = this.props.searchSongs || [];
    return (
      <ul className="cp-search-list">
        {
          list.map((song, index) => (
            <SongItem key={song.id} song={song} index={index}/>
          ))
        }
      </ul>
    );
  }
}