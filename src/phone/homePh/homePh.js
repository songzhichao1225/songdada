import React from 'react';
import './homePh.css';
import 'antd/dist/antd.css';
import { Route } from 'react-router-dom';
import { gerVenueName } from '../../api';
import { message } from 'antd';
import homePagePh from '../homePagePh/homePagePh';
import monthlyIncomePh from '../monthlyIncomePh/monthlyIncomePh';


class homePh extends React.Component {

  state = {
    getVenue: '',
    gerVenueName: '',
  };



  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      this.setState({ gerVenueName: res.data.data })
    }
  }


  componentDidMount() {
    this.gerVenueName()
  }





  render() {
    return (
      <div className="homePh">
        <div className="headerTitle">{this.state.gerVenueName.name}</div>

        <Route path="/homePh" component={homePagePh} />
        <Route path="/homePh/monthlyIncomePh" component={monthlyIncomePh} />
        

        <div className="footer">
          <div className="footerSon">
            <div>
              <img src={this.props.location.pathname==='/homePh'?require("../../assets/shouyeTwo.png"):require("../../assets/shouye.png")} alt="首页" />
              <span style={this.props.location.pathname==='/homePh'?{color:'#D85D27'}:''}>首页</span>
              </div>
            <div><img src={require("../../assets/yuyuexinxi.png")} alt="预约信息" /><span>预约信息</span></div>
            <div><img src={require("../../assets/changdishezhi.png")} alt="场地设置" /><span>场地设置</span></div>
            <div><img src={require("../../assets/xiaoxi.png")} alt="消息" /><span>消息</span></div>
            <div><img src={require("../../assets/wod.png")} alt="我的" /><span>我的</span></div>
          </div>

        </div>
      </div>
    );
  }
}

export default homePh;