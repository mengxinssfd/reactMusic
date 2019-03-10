import React, {Component} from 'react';
import './history.sass';

export default class History extends Component {
  constructor(prop) {
    super(prop);
    console.log('');
    this.state = {
      history: [],
    };
  }

  componentWillMount() {
    let history = this.getHistory();
    this.setState({
      history,
    });
  }

  getHistory() {
    let history = localStorage.getItem('history');
    if (history) {
      history = JSON.parse(history);
    }
    return history || [];
  }

  saveHistory(value) {
    let history = this.getHistory();
    history.unshift(value);
    history = [...new Set(history)].slice(0, 20);
    this.setState({
      history,
    });
    localStorage.setItem('history', JSON.stringify(history));
  }

  clickHistory(value) {
    this.props.onInput(value);
  }

  clearHistory() {
    this.setState({
      history: [],
    });
    localStorage.setItem('history', '[]');
  }

  deleteHistory(index, e) {
    let history = this.state.history;
    history.splice(index, 1);
    this.setState({
      history,
    });
    localStorage.setItem('history', JSON.stringify(history));
    e.stopPropagation();
  }

  render() {
    return (
      <div className="cp-search-history">
        <h1 className="his-title">
          搜索历史
          <span className="clear" onClick={this.clearHistory.bind(this)}>清空</span>
        </h1>
        <ul>
          {
            this.state.history.map((item, index) => (
              <li
                className="history-item"
                key={index}
                onClick={this.clickHistory.bind(this, item)}
              >
                {item}
                <span
                  className="delete"
                  onClick={this.deleteHistory.bind(this, index)}
                >✖</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}