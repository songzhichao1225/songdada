import React from 'react';
import './homePh.css';
import 'antd/dist/antd.css';
import { Route, Link } from 'react-router-dom';
import { gerVenueName, getVenueIndex } from '../../api';
import { message, Icon } from 'antd';
import orderPh from '../orderPh/orderPh';
import sitePh from '../sitePh/sitePh';
import newsPh from '../newsPh/newsPh';
import minePh from '../minePh/minePh';


class homePh extends React.Component {

  state = {
    getVenue: '',
    gerVenueName: '',
    title: '首页',
    spin: true,
    clenTop: 0,
    clickY: 0,
    moveY: 0,
    spinFlag: false,
  };
  async getVenueIndex(data) {
    const res = await getVenueIndex(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      this.setState({ getVenue: res.data.data, spin: false, spinFlag: false })
      sessionStorage.setItem('score', res.data.data.score)
    }
  }
  async gerVenueName(data) {
    const res = await gerVenueName(data, localStorage.getItem('venue_token'))

    localStorage.setItem('name', res.data.data.name)
    localStorage.setItem('avatar', "https://app.tiaozhanmeiyitian.com/" + res.data.data.siteimg)
    localStorage.setItem('lyv', res.data.data.rate)
    this.setState({ gerVenueName: res.data.data })

  }

  monthlyIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh' })
    sessionStorage.setItem('income','month')
  }
  dayIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh'})
    sessionStorage.setItem('income','day')
  }
  commentPh = () => {
    this.props.history.push('/homePh/commentPh')
  }
  yuYue = () => {
    this.props.history.push({pathname:'/homePh/orderPh',query:{time:1}})
  }

  yuYueTwo=()=>{
    this.props.history.push({pathname:'/homePh/orderPh',query:{time:2}})
  }



  componentDidMount() {
    this.getVenueIndex()
    this.gerVenueName()
    

   
      if (localStorage.getItem('venue_token')) {
        if (localStorage.getItem('issite') === '0') {
          this.props.history.push('/stadiumInformationPh')
        } else if (localStorage.getItem('isqult') === '0') {
          this.props.history.push('/qualificationPh')
        } else if (localStorage.getItem('islegal') === '0' || localStorage.getItem('islegal')=== '2') {
          this.props.history.push('/resultsAuditsPh')
        }
      }

   

    if (this.props.history.location.pathname === '/homePh') {
      this.setState({ title: '首页' })
    } else if (this.props.history.location.pathname === '/homePh/orderPh') {
      this.setState({ title: '预约信息' })
    } else if (this.props.history.location.pathname === '/homePh/sitePh') {
      this.setState({ title: '场地设置' })
    } else if (this.props.history.location.pathname === '/homePh/newsPh') {
      this.setState({ title: '消息' })
    } else if (this.props.history.location.pathname === '/homePh/minePh') {
      this.setState({ title: '我的' })
    }
  }

  componentWillReceiveProps() {
    if (this.props.history.location.pathname === '/homePh') {
      this.setState({ title: '首页' })
    } else if (this.props.history.location.pathname === '/homePh/orderPh') {
      this.setState({ title: '预约信息' })
    } else if (this.props.history.location.pathname === '/homePh/sitePh') {
      this.setState({ title: '场地设置' })
    } else if (this.props.history.location.pathname === '/homePh/newsPh') {
      this.setState({ title: '消息' })
    } else if (this.props.history.location.pathname === '/homePh/minePh') {
      this.setState({ title: '我的' })
    }
  }
  reture = () => {
    this.props.history.goBack()
  }
  homePh = () => {
    this.setState({ title: '首页' })
  }
  orderPh = () => {
    this.setState({ title: '预约信息' })
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




  close = () => {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf('Android') > -1) {
        window.JsAndroid.goBack();
      } else if (sUserAgent.indexOf('iPhone') > -1) {
        try {
          window.webkit.messageHandlers.getCall.postMessage('1');
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  touClick = (e) => {
    this.setState({ clickY: e.targetTouches[0].clientY })
  }
  touMove = (e) => {
    if (this.state.clickY < e.targetTouches[0].clientY&&this.state.clickY<200) {
      this.setState({ moveY: e.targetTouches[0].clientY })
      if (e.targetTouches[0].clientY - this.state.clickY < 80) {
        this.setState({ spinFlag: true })
        this.setState({ clenTop: e.targetTouches[0].clientY - this.state.clickY })
      }
    }
  }
  touEnd = () => {
    if (this.state.moveY > this.state.clickY+10) {
      this.getVenueIndex()
      if (this.state.spinFlag === false) {
          this.setState({ clenTop: 0 })
      }
    }
  }

  render() {
    return (
      <div className="homePh">
        <div className="headerTitle">
          <span style={{ display: 'block', textAlign: 'center' }}>{this.state.title}</span>
          <Icon type="close" onClick={this.close} style={{ position: 'absolute', right: '5%', top: '35%' }}/>
        </div>
        <div className='kog'>
        <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block',height:this.state.clenTop,transition: '0.3s',position:'relative' } : { display: 'none' }} ><Icon type="loading" className='loadingY' style={{top:this.state.clenTop/4}} /></div>

        <div className={this.props.location.pathname === '/homePh' && this.state.spin === false ? 'homePagePh' : 'none'} onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}  >
          <div className="homeScroll" >
            <div><span className="title" onClick={this.yuYue}>今日成功预约</span><div className="content"><span>{this.state.getVenue.today_count}</span><span>单</span></div></div>
            <div><span className="title" onClick={this.yuYueTwo}>本月成功预约</span><div className="content"><span>{this.state.getVenue.month_count}</span><span>单</span></div></div>
            <div><span className="title" onClick={this.dayIncomePh}>今日收入</span><div className="content"><span>￥{this.state.getVenue.today_money}</span></div></div>
            <div><span className="title" onClick={this.monthlyIncomePh}>本月收入</span><div className="content"><span>￥{this.state.getVenue.month_money}</span></div></div>
            <div><span className="title" onClick={this.commentPh}>场馆评分  {this.state.getVenue.score}分</span  >
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
        </div>
        <Route path="/homePh/orderPh" component={orderPh} />
        <Route path="/homePh/sitePh" component={sitePh} />
        <Route path="/homePh/newsPh" component={newsPh} />
        <Route path="/homePh/minePh" component={minePh} />
        </div>
        <div className="footer">
          <div className="footerSon">
            <div onClick={this.homePh}>
              <Link to="/homePh">
                <img src={this.props.location.pathname === '/homePh' ? require("../../assets/shouyeTwo.png") : require("../../assets/shouye.png")} alt="首页" />
                <span style={this.props.location.pathname === '/homePh' ? { color: '#D85D27' } : { color: '#000' }}>首页</span>
              </Link>
            </div>
            <div onClick={this.orderPh}>
              <Link to="/homePh/orderPh">
                <img src={this.props.location.pathname === '/homePh/orderPh' ? require("../../assets/yuyuexinxiTwo.png") : require("../../assets/yuyuexinxi.png")} alt="预约信息" />
                <span style={this.props.location.pathname === '/homePh/orderPh' ? { color: '#D85D27' } : { color: '#000' }}>预约信息</span>
              </Link>
            </div>
            <div onClick={this.sitePh}>
              <Link to="/homePh/sitePh">
                <img src={this.props.location.pathname === '/homePh/sitePh' ? require("../../assets/changdishezhiTwo.png") : require("../../assets/changdishezhi.png")} alt="场地设置" />
                <span style={this.props.location.pathname === '/homePh/sitePh' ? { color: '#D85D27' } : { color: '#000' }}>场地设置</span>
              </Link>
            </div>
            <div onClick={this.newsPh}>
              <Link to="/homePh/newsPh">
                <img src={this.props.location.pathname === '/homePh/newsPh' ? require("../../assets/xiaoxiTwo.png") : require("../../assets/xiaoxi.png")} alt="消息" />
                <span style={this.props.location.pathname === '/homePh/newsPh' ? { color: '#D85D27' } : { color: '#000' }}>消息</span>
              </Link>
            </div>
            <div onClick={this.mine}>
              <Link to="/homePh/minePh">
                <img src={this.props.location.pathname === '/homePh/minePh' ? require("../../assets/wodTwo.png") : require("../../assets/wod.png")} alt="我的" />
                <span style={this.props.location.pathname === '/homePh/minePh' ? { color: '#D85D27' } : { color: '#000' }}>我的</span>
              </Link>
            </div>
          </div>

        </div>








      </div>
    );
  }
}

export default homePh;