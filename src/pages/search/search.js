import React from 'react';
import SearchBox from './search-box';
import Page from '../../components/page/alive-page';
import HotKey from './hotkey';
import {getHotKey, getSearch} from '../../api/search';
import History from './history';
import './search.sass';
import {debounce} from '../../common/js/util';
import SearchList from './search-list';
import {createSongFromSearch} from '../../common/js/song';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeStyle} from '../../store/actions';

// import Store from '../../store/store';

class Search extends Page {
  data = {
    lastSearchValue: '',
    page: 1,
  };

  constructor(prop) {
    super(prop);
    console.log('');
    this.state = {
      searchValue: '',
      hotKey: [],
      songs: [],
    };
    this.historyRef = React.createRef();
  }

  componentWillMount() {
    this.props.actions.changeStyle({themeColor: 'gray'});
    // Store.dispatch({type: 'change', themeColor: 'gray'});
    this.searchDebounce = debounce((value) => {
      console.log('ssssssssss');
      this.getSearch(value);
    }, 100);
    super.componentWillMount();
    if (this.hasData) return;
    this.getHotKey();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  async getSearch(value) {
    console.log(value, this.data.lastSearchValue);
    if (!value || value === this.data.lastSearchValue) return;
    this.historyRef.current.saveHistory(value);
    let data = (await getSearch(value, 1, 1)).data;
    console.log(data);
    this.setState({
      songs: data.song.list.map(song => createSongFromSearch(song)),
    });

  }

  async getHotKey() {
    let data = (await getHotKey()).data;
    console.log(data);
    this.setState({
      hotKey: data.hotkey.map(item => {
        item.k = item.k.trim();
        return item;
      }),
    });
  }

  onInput(value) {
    this.data.lastSearchValue = this.state.searchValue;
    this.setState({
      searchValue: value,
    });
    this.searchDebounce(value);
  }

  render() {
    return (
      <div className={'pg-search'} style={{background: this.props.color}}>
        <SearchBox
          value={this.state.searchValue}
          onInput={this.onInput.bind(this)}
        />
        <div hidden={this.state.searchValue.length > 0}>
          <HotKey
            onInput={this.onInput.bind(this)}
            hotKey={this.state.hotKey}
          />
          <History onInput={this.onInput.bind(this)} ref={this.historyRef}/>
        </div>
        <div hidden={this.state.searchValue.length === 0}>
          <SearchList searchSongs={this.state.songs}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({color: state.style.themeColor});
const mapDisptchToProps = dispatch => ({
  actions: bindActionCreators({changeStyle}, dispatch),
});

export default connect(mapStateToProps, mapDisptchToProps)(Search);