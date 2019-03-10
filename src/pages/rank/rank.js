import React from 'react';
import Page from '../../components/page/alive-page';
import Item from './item';
import {getRank} from '../../api/rank';
import './rank.sass';

export default class Rank extends Page {
  data = {
    sum: 0,
  };

  constructor(prop) {
    super(prop);
    this.state = {
      rank: [],
      isLoading: false,
    };
  }

  componentWillMount() {
    super.componentWillMount();
    if (this.data.sum) return;
    this.getRank();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  async getRank() {
    this.setState({
      isLoading: true,
    });
    let data = await getRank();
    let list = data.map(item => item.List).reduce((arr, item) => {
      return arr.concat(item);
    }, []);

    this.setState({
      rank: list,
      isLoading: false,
    });
    this.data.sum = list.length;
  }

  render() {
    return (
      <div className="pg-rank">
        <ul>
          {
            this.state.rank.length > 0 && this.state.rank.map((rank, index) => (
              <Item key={rank.topID} rank={rank}/>
            ))
          }
        </ul>
      </div>);
  }
}