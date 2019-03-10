import React, {Component} from 'react';
import './search-box.sass';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.input = null;
    this.placeholder = '搜索歌曲、歌手';
  }

  refHandler(name) {
    return (el) => {
      this[name] = el;
    };
  }

  setInputGetFocus() {
    this.input.focus();
  }

  onInputChange(e) {
    this.props.onInput(e.target.value);
  }

  clickClearBtn() {
    this.props.onInput('');
  }

  render() {
    return (
      <div className="search-box" onClick={this.setInputGetFocus.bind(this)}>
        <div className="icon-search">
          ⌕
        </div>
        <div className="input">
          <input
            ref={this.refHandler('input')}
            type="text"
            onChange={this.onInputChange.bind(this)}
            value={this.props.value}
            placeholder={this.placeholder} title=""/>
        </div>
        {
          this.props.value && <div className="clear">
            <div
              className="btn icon-cross"
              onClick={this.clickClearBtn.bind(this)}
            >
              ✖
            </div>
          </div>}
      </div>
    );
  }
}