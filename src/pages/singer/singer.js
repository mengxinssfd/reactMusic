import React from 'react';
import Page from '../../components/page/alive-page';
import {getSingerList} from '../../api/singer';
import {Singer} from '../../common/js/singer';
import Item from './item';
import {eventBus, eventType} from '../../common/js/evenBus';

export default class PGSinger extends Page {
  data = {
    isLoadAll: false,
    sum: 0,
    page: 1,
  };

  constructor(prop) {
    super(prop);
    this.state = {
      singers: [],
      isLoading: false,
    };
  }

  componentWillMount() {
    super.componentWillMount();
    console.log(this.data);
    if (this.data.sum) return;
    eventBus.on(eventType.scrollEnd, this.onScrollEnd);
    this.getSinger();
  }

  componentWillUnmount() {
    eventBus.off(eventType.scrollEnd, this.onScrollEnd);
    super.componentWillUnmount();
  }

  onScrollEnd = () => {
    console.log('singer end......');
    if (this.state.isLoading || !this.state.singers.length) return;
    this.data.page++;
    this.getSinger();
  };

  singerTranslate(list) {
    return list.map(item => new Singer(
      item.Fsinger_id,
      item.Fsinger_mid,
      item.Fsinger_name));
  }

  async getSinger() {
    this.setState({
      isLoading: true,
    });
    let data = (await getSingerList(this.data.page)).data;
    this.setState({
      isLoading: false,
    });
    let list = this.state.singers;
    let has = list.length > 0 && -1 < data.list.findIndex(item => {
      return item.Fsinger_id === list[list.length - 1].id;
    });
    console.log('has', has);
    if (has) return;
    this.setState({
      singers: list.concat(this.singerTranslate(data.list)),
    });
    this.data.sum = data.total;
    this.data.isLoadAll = list.length === data.total;
    console.log(data);
  }

  render() {
    return (<div className="pg-singer">
      <ul>
        {
          this.state.singers.map(singer => (
            <Item key={singer.id} singer={singer}/>
          ))
        }
      </ul>
    </div>);
  }
}