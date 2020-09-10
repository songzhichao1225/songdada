import React from 'react';
import './homePh.css';
import 'antd/dist/antd.css';
import {getVenueIndex } from '../../api';

import { PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { LoadingOutlined } from '@ant-design/icons';









class homePh extends React.Component {

  state = {
    getVenue: '',
    title: '首页',
    spin: true,
    clenTop: 0,
    clickY: 0,
    moveY: 0,
    spinFlag: false,
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],
    visible: false,
    mode: false,
    flag: false,
    flagK: false
  };
  async getVenueIndex(data) {
    const res = await getVenueIndex(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ getVenue: res.data.data, spin: false, spinFlag: false })
      sessionStorage.setItem('score', res.data.data.score)
    }
  }








  commentPh = () => {
    this.props.history.push('/homePh/commentPh')
  }
  yuYue = () => {
    sessionStorage.setItem('modl', 1)
    this.props.history.push({ pathname: '/homePh/orderPhT', query: { time: 1 } })
    this.setState({ title: '今日成功预约' })
  }

  yuYueTwo = () => {
    sessionStorage.setItem('modl', 2)
    this.props.history.push({ pathname: '/homePh/orderPhT', query: { time: 2 } })
    this.setState({ title: '本月成功预约' })
  }

  monthlyIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh', query: { income: 'month' } })
    sessionStorage.setItem('income', 'month')
  }
  dayIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh', query: { income: 'day' } })
    sessionStorage.setItem('income', 'day')
  }




  componentDidMount() {
    sessionStorage.setItem('kood', 1)
    this.getVenueIndex()
  }

  reture = () => {
    this.props.history.goBack()
  }
  homePh = () => {
    this.setState({ title: '首页' })
  }
  orderPh = () => {
    this.setState({ title: '预约信息', refs: 1 })
  }
  sitePh = () => {
    this.setState({ title: '场地设置' })
  }
  newsPh = () => {
    this.setState({ title: '消息' })
  }
  mine = () => {
    this.setState({ title: '我的' })
  }




  refResh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.getVenueIndex()
    }, 1000)
  }


  render() {
    return (
      <div className="homePh">
        <div className="headerTitle">
        </div>
        <div className='kog'>
          <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' } : { display: 'none' }} ><LoadingOutlined className='loadingY' style={{ top: this.state.clenTop / 4 }} /></div>
          <div className={this.props.location.pathname === '/homePh/homePh' && this.state.spin === false ? 'homePagePh' : 'none'} onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}  >
            <PullToRefresh
              damping={60}
              ref={el => this.ptr = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
              direction={this.state.down ? 'down' : 'up'}
              refreshing={this.state.refreshing}
              onRefresh={this.refResh}
            >
              <div className="homeScroll" >
                <div onTouchStart={this.yuYue}><span className="title" >今日成功预约</span><div className="content"><span>{this.state.getVenue.today_count}</span><span>单</span></div></div>
                <div onTouchStart={this.yuYueTwo}><span className="title">本月成功预约</span><div className="content"><span>{this.state.getVenue.month_count}</span><span>单</span></div></div>
                <div onTouchStart={this.dayIncomePh}><span className="title" >今日收入</span><div className="content"><span>￥{this.state.getVenue.today_money}</span></div></div>
                <div onTouchStart={this.monthlyIncomePh}><span className="title" >本月收入</span><div className="content"><span>￥{this.state.getVenue.month_money}</span></div></div>
                <div onTouchStart={this.commentPh}><span className="title" >场馆评分  {this.state.getVenue.score}分</span>
                  <div className="content">
                    <div className="img">
                      <img src={this.state.getVenue.score >= 1 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 1 && this.state.getVenue.score > 0 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 2 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 2 && this.state.getVenue.score > 1 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 3 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 3 && this.state.getVenue.score > 2 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 4 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 4 && this.state.getVenue.score > 3 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 5 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 5 && this.state.getVenue.score > 4 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                  </div>
                </div>
              </div>
            </PullToRefresh>
          </div>
        </div>
      </div>
    )
  }
}

export default homePh;