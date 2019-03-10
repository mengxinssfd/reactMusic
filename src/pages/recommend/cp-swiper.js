import React, {Component} from 'react';
import Swiper from 'swiper';
import '../../../node_modules/swiper/dist/css/swiper.min.css';
import './cp-swiper.sass';

export default class Name extends Component {
  constructor(prop) {
    super(prop);
    this.swiperContainer = null;
    this.dots = null;
  }

  refHandler(name) {
    return (el) => {
      this[name] = el;
    };
  }

  componentDidMount() {
    this.swiper = new Swiper(this.swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: this.dots,
        // dynamicBullets: true,
        clickable: true,
      },
    });
  }

  render() {
    return (
      <div className="cp-swiper">
        <div
          ref={this.refHandler('swiperContainer')}
          className="swiper-container">
          <div className="swiper-wrapper">
            {this.props.slider.map(item => {
              return (<div className="swiper-slide" key={item.id}>
                <img src={item.picUrl} alt="slider"/>
              </div>);
            })}
          </div>
        </div>
        <div className="dots" ref={this.refHandler('dots')}/>
      </div>
    );
  }
}