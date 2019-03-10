import React from 'react';
import AlivePage from '../../components/page/alive-page';
import './recommend.sass';
import {getRecommend, getDiscList} from '../../api/recommend';
import Swiper from './cp-swiper';
import {eventBus, eventType} from '../../common/js/evenBus';
import Item from './item';

const getDiscLen = 20; // 每次获取歌单列表的长度
export default class Recommend extends AlivePage {
  data = {
    isLoadAll: false,
    sum: 0,
    discStart: 0,// 每次获取歌单列表的开始位置
  };

  constructor(prop) {
    super(prop);
    this.state = {
      slider: [],
      discList: [],
      isLoading: false,
    };
  }

  componentWillMount() {
    super.componentWillMount();
    console.log(this.data);
    if (this.data.sum) return;
    this.getRecomend();
    this.getDiscList();
  }

  componentDidMount() {
    eventBus.on(eventType.scrollEnd, this.onScrollEnd);
    // console.log(this.onUnmount());
  }

  componentWillUnmount() {
    eventBus.off(eventType.scrollEnd, this.onScrollEnd);
    super.componentWillUnmount();
  }

  componentWillUpdate() {
  }

  onScrollEnd = () => {
    console.log('recommend end......');
    if (this.state.isLoading) return;
    this.getDiscList();
  };

  async getRecomend() {
    let data = (await getRecommend()).data;
    this.setState({
      slider: data.slider,
    });
  }

  async getDiscList() {
    let end = this.data.discStart + getDiscLen - 1;
    this.setState({
      isLoading: true,
    });
    let data = (await getDiscList(this.data.discStart, end)).data;

    let list = this.state.discList;
    this.data.isLoadAll = data.sum === list.length;
    this.data.discStart = end + 1;
    this.data.sum = data.sum;
    console.log(list.length);

    if (!list.length) {
      this.setState({
        isLoading: false,
        discList: data.list,
      });
    } else {
      let last = list[list.length - 1];
      let has = data.list.findIndex(item => {
        return item.dissid === last.dissid;
      });
      console.log('bbbbbbbbb', has);
      if (has > -1) return;
      this.setState({
        isLoading: false,
        discList: list.concat(data.list),
      });
    }

  }

  clickDisc = () => {

  };

  refHandler(name) {
    return (el) => {
      this[name] = el;
    };
  }

  render() {
    return (<div className="pg-recommend">
      {this.state.slider.length > 0 && <Swiper slider={this.state.slider}/>}
      <div className="disc">
        <h1 className="list-title">热门歌单推荐</h1>
        <ul>
          {this.state.discList.map(item => {
            return (
              <Item  key={item.dissid} itemData={item}/>
            );
          })}
        </ul>
        <div className="load-all">
          {this.state.isLoading ? '正在加载中...' : '我是有底线的'}
        </div>
      </div>
    </div>);
  }
}