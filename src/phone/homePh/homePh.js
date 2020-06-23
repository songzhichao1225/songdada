import React from 'react';
import './homePh.css';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import { gerVenueName, getVenueIndex,getIsSignOut } from '../../api';

import { NavBar, Popover, PullToRefresh,Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {  notification } from 'antd';
import {EllipsisOutlined,LoadingOutlined} from '@ant-design/icons';

import orderPh from '../orderPh/orderPh';
import sitePh from '../sitePh/sitePh';
import newsPh from '../newsPh/newsPh';
import minePh from '../minePh/minePh';
import orderPhT from '../orderPhT/orderPhT';
const Item = Popover.Item;

const alert = Modal.alert;
function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}


function jo() {
  var ws = new WebSocket("wss://www.venue.zhaoduishou.com/socket");
  ws.onopen = function () {
    ws.send(localStorage.getItem('siteUid'))
  }
  ws.onmessage = function (e) {
    let message_info = JSON.parse(e.data)
    let msg = new SpeechSynthesisUtterance(message_info.percent)
    window.speechSynthesis.speak(msg)
    notification.open({ description: message_info.percent, duration: 5 })
    sessionStorage.setItem('kood', 2)
  }
  ws.onclose = function () {
    jo()
  }
}



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
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],
    visible: false,
    mode: false,
    flag:false,
  };
  async getVenueIndex(data) {
    const res = await getVenueIndex(data, localStorage.getItem('venue_token'))
    if(res.data.code===2000){
      this.setState({ getVenue: res.data.data, spin: false, spinFlag: false })
      sessionStorage.setItem('score', res.data.data.score)
    }
  }
  async gerVenueName(data) {
    const res = await gerVenueName(data, localStorage.getItem('venue_token'))
  


    localStorage.setItem('name', res.data.data.name)
    localStorage.setItem('avatar', "https://app.tiaozhanmeiyitian.com/" + res.data.data.siteimg)
    localStorage.setItem('lyv', res.data.data.rate)
    localStorage.setItem('siteUid', res.data.data.siteuid)
    this.setState({ gerVenueName: res.data.data, refreshing: false })

  }

  monthlyIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh',query:{income:'month'}})
    sessionStorage.setItem('income', 'month')
  }
  dayIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh',query:{income:'day'} })
    sessionStorage.setItem('income', 'day')
  }
  commentPh = () => {
    this.props.history.push('/homePh/commentPh')
  }
  yuYue = () => {
    sessionStorage.setItem('modl',1)
    this.props.history.push({ pathname: '/homePh/orderPhT', query: { time: 1 } })
    this.setState({ title: '今日成功预约' })
  }

  yuYueTwo = () => {
    sessionStorage.setItem('modl',2)
    this.props.history.push({ pathname: '/homePh/orderPhT', query: { time: 2 } })
    this.setState({ title: '本月成功预约' })
  }

  async getIsSignOut(data) {
    const res = await getIsSignOut(data, localStorage.getItem('venue_token'))
    if(res.data.code!==2000){
      this.props.history.push('/login')
    alert('强制下线', <div>{res.data.msg}</div>, [
        { text: '确定', onPress: () =>  console.log(5)},
      ])
    }
  

  }


  componentDidMount() {
     

    sessionStorage.setItem('kood', 1)
    this.getVenueIndex()
    this.gerVenueName()
    if (localStorage.getItem('venue_token')) {
      if (localStorage.getItem('issite') === '0') {
        this.props.history.push('/stadiumInformationPh')
      } else if (localStorage.getItem('isqult') === '0') {
        this.props.history.push('/qualificationPh')
      } else if (localStorage.getItem('islegal') === '0' || localStorage.getItem('islegal') === '2') {
        this.props.history.push('/resultsAuditsPh')
      }
    }
  
   
     
    var timer=setInterval(() => {

      if(this.props.history.location.pathname==='/login'){
        clearInterval(timer)
      }else{
        this.getIsSignOut()
      }
      
     }, 5000);
     

     


    if (this.props.history.location.pathname === '/homePh') {
      this.setState({ title: '首页' })
    } else if (this.props.history.location.pathname === '/homePh/orderPh') {
      this.setState({ title: '预约信息',mode:false })
    } else if (this.props.history.location.pathname === '/homePh/sitePh') {
      this.setState({ title: '场地设置' })
    } else if (this.props.history.location.pathname === '/homePh/newsPh') {
      this.setState({ title: '消息' })
    } else if (this.props.history.location.pathname === '/homePh/minePh') {
      this.setState({ title: '我的' })
    }



    jo()

    setInterval(() => {
      window.addEventListener('storage', sessionStorage.getItem('kood') === '2' ? this.gerVenueName() : this);
    }, 2000)

    setInterval(() => {
      localStorage.clear()
    }, 86400000)

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

    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0);

  }
  reture = () => {
    this.props.history.goBack()
  }
  homePh = () => {
    this.setState({ title: '首页' })
    this.gerVenueName()
  }
  orderPh = () => {
    this.setState({ title: '预约信息', refs: 1 })
    this.gerVenueName()
  }
  sitePh = () => {
    this.setState({ title: '场地设置' })
    this.gerVenueName()
  }
  newsPh = () => {
    this.setState({ title: '消息' })
    this.gerVenueName()
  }
  mine = () => {
    this.setState({ title: '我的' })
    this.gerVenueName()
  }


  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')
      this.setState({ visible: false })
    } else {
      this.close()
    }
  }



  close = () => {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf('Android') > -1) {
        window.JsAndroid.goBack();
      } else if (sUserAgent.indexOf('iPhone') > -1) {
        try {
          window.webkit.messageHandlers.getCall.postMessage('1')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  refResh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.gerVenueName()
      this.getVenueIndex()
    }, 1000)
  }
  setUp=e=>{
    if(e.target.dataset.type==='台球'){
      this.props.history.push({ pathname: '/homePh/orderPh', query: { activityList: false,liIndex:'2',id:'3' } })
    }
    if(e.target.dataset.type==='足球'){
      this.props.history.push({ pathname: '/homePh/orderPh', query: { activityList: false,liIndex:'4',id:'5' } })
    }
    if(e.target.dataset.type==='高尔夫'){
      this.props.history.push({ pathname: '/homePh/orderPh', query: { activityList: false,liIndex:'7',id:'8' } })
    }
    this.setState({mode:false})
  }


  render() {
    return (
      <div className="homePh">
        <div className="headerTitle">
          {/* <span style={{ display: 'block', textAlign: 'center' }}>{this.state.title}</span> */}
          <NavBar
            mode="dark"
            icon={<img style={{ width: '2rem', height: '2rem', display: 'block', marginTop: '-0.3rem' }} src={require('../../assets/logo.png')} alt="logo" />}
            rightContent={<Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              onSelect={this.closeWeb}
              overlay={[
                (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1') === -1 ? '返回官网' : '关闭'}</Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}

            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
              }}
              >
               <EllipsisOutlined />
              </div>
            </Popover>}
          ><span style={{ fontSize: '1rem' }}>{this.state.title}</span></NavBar>

          {/* <Icon type="close" onClick={this.close} style={{ position: 'absolute', right: '5%', top: '35%' }}/> */}
        </div>
        <div className='kog'>
          <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' } : { display: 'none' }} ><LoadingOutlined className='loadingY' style={{ top: this.state.clenTop / 4 }}  /></div>

          <div className={this.props.location.pathname === '/homePh' && this.state.spin === false ? 'homePagePh' : 'none'} onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}  >

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
              <div className="homeScroll" style={{ paddingBottom: '8rem' }}>
                <div onClick={this.yuYue}><span className="title" >今日成功预约</span><div className="content"><span>{this.state.getVenue.today_count}</span><span>单</span></div></div>
                <div onClick={this.yuYueTwo}><span className="title">本月成功预约</span><div className="content"><span>{this.state.getVenue.month_count}</span><span>单</span></div></div>
                <div onClick={this.dayIncomePh}><span className="title" >今日收入</span><div className="content"><span>￥{this.state.getVenue.today_money}</span></div></div>
                <div onClick={this.monthlyIncomePh}><span className="title" >本月收入</span><div className="content"><span>￥{this.state.getVenue.month_money}</span></div></div>
                <div onClick={this.commentPh}><span className="title" >场馆评分  {this.state.getVenue.score}分</span>
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
          <Route path="/homePh/orderPh" component={orderPh} />
          <Route path="/homePh/sitePh" component={sitePh} />
          <Route path="/homePh/newsPh" component={newsPh} />
          <Route path="/homePh/minePh" component={minePh} />
          <Route path="/homePh/orderPhT" component={orderPhT} />


        

        </div>
        <div className="footer">
          <div className="footerSon">
            <div onClick={this.homePh}>
              <Link to="/homePh">
                <i style={this.props.location.pathname === '/homePh' ? { display: 'none' } : { display: 'block' }}>
                  <svg t="1577253616036" className="icon" viewBox="64 64 896 896" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10942" width="23" height="23"><path d="M556.586667 159.36l288.490666 183.914667A64 64 0 0 1 874.666667 397.248v392.746667a64 64 0 0 1-64 64H555.456l0.021333-196.992H490.666667v196.992H234.666667a64 64 0 0 1-64-64v-398.293334a64 64 0 0 1 30.272-54.4l287.530666-178.346666a64 64 0 0 1 68.138667 0.426666zM810.666667 790.016V397.226667L522.197333 213.333333 234.666667 391.68v398.336h192v-197.013333h192.810666v196.992H810.666667z" p-id="10943"></path></svg>
                </i>
                <i style={this.props.location.pathname === '/homePh' ? { display: 'block' } : { display: 'none' }}>
                  <svg t="1577253616036" className="icon" viewBox="64 64 896 896" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10942" width="23" height="23"><path d="M556.586667 159.36l288.490666 183.914667A64 64 0 0 1 874.666667 397.248v392.746667a64 64 0 0 1-64 64H555.456l0.021333-196.992H490.666667v196.992H234.666667a64 64 0 0 1-64-64v-398.293334a64 64 0 0 1 30.272-54.4l287.530666-178.346666a64 64 0 0 1 68.138667 0.426666zM810.666667 790.016V397.226667L522.197333 213.333333 234.666667 391.68v398.336h192v-197.013333h192.810666v196.992H810.666667z" p-id="10943" fill="#D85D27"></path></svg>
                </i>
                {/* <img src={this.props.location.pathname === '/homePh' ? require("../../assets/shouyeTwo.png") : require("../../assets/shouye.png")} alt="首页" /> */}
                <span style={this.props.location.pathname === '/homePh' ? { color: '#D85D27' } : { color: '#000' }}>首页</span>
              </Link>
            </div>
            <div onClick={this.orderPh}>
              <Link to="/homePh/orderPh">
                <i style={this.props.location.pathname === '/homePh/orderPh' ? { display: 'none' } : { display: 'block' }}>
                  <svg t="1577254603655" className="icon" viewBox="64 64 896 896" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15605" width="23" height="23"><path d="M810.666667 640a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64h-149.333334a64 64 0 0 1-64-64v-128a64 64 0 0 1 64-64h149.333334zM298.666667 192h42.666666v63.978667L298.666667 256v533.333333h256v64H298.666667a64 64 0 0 1-64-64V256a64 64 0 0 1 64-64z m512 512h-149.333334v128h149.333334v-128z m-21.333334 32v64h-105.898666v-64H789.333333zM725.333333 192a64 64 0 0 1 64 64v341.333333h-64V256h-42.666666V192h42.666666z m-170.666666 341.333333v64h-192v-64h192z m106.666666-128v64H362.666667v-64h298.666666zM576 128a64 64 0 0 1 64 64v42.666667a64 64 0 0 1-64 64h-128a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64h128z m0 64h-128v42.666667h128V192z" p-id="15606"></path></svg>
                </i>
                <i style={this.props.location.pathname === '/homePh/orderPh' ? { display: 'block' } : { display: 'none' }}>
                  <svg t="1577254603655" className="icon" viewBox="64 64 896 896" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15605" width="23" height="23"><path d="M810.666667 640a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64h-149.333334a64 64 0 0 1-64-64v-128a64 64 0 0 1 64-64h149.333334zM298.666667 192h42.666666v63.978667L298.666667 256v533.333333h256v64H298.666667a64 64 0 0 1-64-64V256a64 64 0 0 1 64-64z m512 512h-149.333334v128h149.333334v-128z m-21.333334 32v64h-105.898666v-64H789.333333zM725.333333 192a64 64 0 0 1 64 64v341.333333h-64V256h-42.666666V192h42.666666z m-170.666666 341.333333v64h-192v-64h192z m106.666666-128v64H362.666667v-64h298.666666zM576 128a64 64 0 0 1 64 64v42.666667a64 64 0 0 1-64 64h-128a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64h128z m0 64h-128v42.666667h128V192z" p-id="15606" fill="#D85D27"></path></svg>
                </i>
                {/* <img src={this.props.location.pathname === '/homePh/orderPh' ? require("../../assets/yuyuexinxiTwo.png") : require("../../assets/yuyuexinxi.png")} alt="预约信息" /> */}
                <span style={this.props.location.pathname === '/homePh/orderPh' ? { color: '#D85D27' } : { color: '#000' }}>预约信息</span>
              </Link>
            </div>
            <div onClick={this.sitePh}>
              <Link to="/homePh/sitePh">
                <i style={this.props.location.pathname === '/homePh/sitePh' ? { display: 'none' } : { display: 'block' }}>
                  <svg t="1577255323824" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8649" width="23" height="23"><path d="M604.032 857.472a401.792 401.792 0 0 1-70.976 20.352l-4.544 0.896a416.576 416.576 0 0 1-45.824 5.44V663.04a187.52 187.52 0 0 0 49.792-13.568l2.176-0.96a232.96 232.96 0 0 0 12.032-5.888l5.504-2.88 2.496-1.344v-0.192l2.56-1.472c1.408-0.896 2.752-1.664 4.032-2.624a22.4 22.4 0 0 0-12.288-40.96 28.16 28.16 0 0 0-4.672 0.512 34.24 34.24 0 0 0-4.736 1.6l-0.448 0.256-1.408 0.32-1.728 1.536-0.384 0.192a143.36 143.36 0 0 1-20.224 10.944l-2.432 0.896a137.6 137.6 0 0 1-30.08 8.448V344.32a128.896 128.896 0 0 1 28.224 7.872L512 352.512A140.928 140.928 0 0 1 585.92 422.4a11.008 11.008 0 0 1 1.088 2.56l0.256 0.448c3.584 8.192 6.528 16.896 8.384 25.6l0.128 0.768a22.4 22.4 0 0 0 26.496 17.088 22.4 22.4 0 0 0 17.088-26.56 51.968 51.968 0 0 1-0.96-4.544l-0.768-2.816 0.256-0.128-2.88-8.768a180.864 180.864 0 0 0-6.976-18.688l-0.256-0.64-1.28-2.752a176.896 176.896 0 0 0-25.408-40.064l-1.088-1.28-1.024-1.152a181.76 181.76 0 0 0-74.624-51.776l-0.896-0.32-2.24-0.832a176.32 176.32 0 0 0-38.208-8.96V78.208a404.352 404.352 0 0 1 188.864 60.16c0.768 0.448 1.344 0.896 2.112 1.216l4.736 3.008 4.48 2.88c0.768 0.576 1.344 1.024 2.24 1.536a405.12 405.12 0 0 1 128.832 143.168H701.12v156.032a24.576 24.576 0 0 0 49.088 0V339.136h86.528a383.232 383.232 0 0 1 17.472 60.416v0.192c5.312 26.304 8.192 53.312 8.192 81.344 0 15.168 12.224 27.328 27.392 27.328s27.392-12.16 27.392-27.328c0-14.08-0.768-28.096-1.92-42.048l0.064-0.064a456.768 456.768 0 0 0-7.36-49.856c-0.128-0.448-0.256-0.768-0.256-1.088l-1.728-7.936a452.48 452.48 0 0 0-40.896-111.36c-0.768-1.344-1.28-2.624-1.984-3.904l-1.856-3.328a456.512 456.512 0 0 0-154.88-166.336c-0.768-0.448-1.344-0.96-2.112-1.28l-4.992-3.136A458.88 458.88 0 0 0 541.056 30.208L539.392 29.888a454.336 454.336 0 0 0-161.92 0.128c-2.816 0.512-5.632 0.96-8.448 1.6a459.008 459.008 0 0 0-141.952 53.952l-4.352 2.56a455.424 455.424 0 0 0-137.408 126.848l-2.176 3.072-2.112 3.136A454.336 454.336 0 0 0 6.4 405.504l-0.32 2.176-0.96 5.504a458.752 458.752 0 0 0 0.256 138.048c0.448 2.88 1.024 5.504 1.344 8.384 9.6 55.744 29.312 108.096 57.088 155.136 0.128 0.256 0.192 0.448 0.448 0.64l3.264 5.504c1.408 2.432 2.88 4.672 4.416 7.04l0.448 0.704a458.24 458.24 0 0 0 120.128 126.144c0.768 0.576 1.28 1.024 2.048 1.408l4.864 3.456c51.072 34.944 109.44 59.968 172.352 72l2.176 0.512 4.864 0.96c54.4 9.6 111.04 9.472 167.232-1.408h0.256l5.504-1.088c10.944-2.24 21.632-4.8 32.384-8v-0.064c13.376-3.84 26.688-8.384 39.872-13.44a27.648 27.648 0 1 0-20.032-51.648zM433.664 617.152a152.256 152.256 0 0 1-26.368-7.872l-2.688-1.152s-1.216-0.512-1.536-0.768c0 0-2.048-1.024-2.496-1.088l-0.384-0.128-0.768-0.384a136.064 136.064 0 0 1-39.232-28.608l-0.448-0.448a141.184 141.184 0 0 1-27.136-40.896l-0.128-0.192-0.96-2.496a169.728 169.728 0 0 1-2.048-5.568 133.12 133.12 0 0 1-7.552-37.248 139.264 139.264 0 0 1 10.24-62.272l0.192-0.448 0.96-2.24 0.576-1.216 0.64-1.408 0.96-1.984 0.192-0.512A136.96 136.96 0 0 1 384 365.184c6.784-4.544 14.016-8.448 21.504-11.712l0.384-0.192 2.304-0.96c0.64-0.192 1.088-0.512 1.728-0.768l0.96-0.448c6.528-2.496 13.184-4.544 19.904-5.952l3.136-0.64-0.256 272.64z m-267.584 5.824H80.448a395.968 395.968 0 0 1-18.368-64.64l-0.256-1.024-1.408-7.552-0.832-4.736-0.64-3.776A406.848 406.848 0 0 1 80.32 339.2h85.76v283.776z m62.72 190.272l-2.176-1.472a156.608 156.608 0 0 1-4.544-3.264l-4.416-3.136c-0.768-0.576-1.408-1.152-2.304-1.6l-6.464-4.864h-0.128a403.84 403.84 0 0 1-90.688-99.84c-1.28-2.048-2.688-4.16-3.904-6.272l-0.96-1.408a349.76 349.76 0 0 1-10.944-19.264h112.448V290.176H165.76v0.064h-63.232c7.232-13.504 15.232-26.688 24-39.232l0.64-0.96c1.28-1.92 2.816-3.904 4.096-5.696 0.832-1.024 1.472-2.176 2.368-3.136 0.832-1.088 1.728-2.304 2.624-3.328l4.096-5.312 0.96-1.216a401.92 401.92 0 0 1 171.264-126.464 403.84 403.84 0 0 1 68.352-19.84c0.448-0.064 0.832-0.192 1.28-0.192 2.368-0.384 4.8-0.96 7.168-1.28l5.376-0.96 3.136-0.512c11.776-1.728 23.68-3.008 35.776-3.776v221.568a172.544 172.544 0 0 0-43.52 11.968l-0.384 0.128a185.088 185.088 0 0 0-56.064 36.544 181.312 181.312 0 0 0-42.048 60.416l-1.088 2.816a180.736 180.736 0 0 0-13.504 78.208l0.192 3.2c1.216 18.432 5.056 36.48 11.776 53.568l0.064 0.32 1.216 3.072c8.448 20.608 20.352 39.424 35.584 55.744l0.384 0.448 1.6 1.6c0.832 0.832 1.472 1.6 2.368 2.368l0.192 0.192a181.376 181.376 0 0 0 60.736 40.384 185.6 185.6 0 0 0 42.624 11.648v221.632a408.768 408.768 0 0 1-204.992-70.912z" p-id="8650"></path><path d="M952.832 708.352l50.496-31.872-19.072-46.08-57.984 13.376a142.72 142.72 0 0 0-30.208-30.656l13.312-58.048-45.632-18.944-31.36 50.496a160.32 160.32 0 0 0-42.496-0.448l-31.04-50.496-46.144 18.624 12.48 58.048a153.6 153.6 0 0 0-30.656 30.144l-57.408-13.76-19.072 45.696 49.6 31.872a142.08 142.08 0 0 0 0 42.944l-50.496 30.976 18.56 46.144 58.112-12.864c8.384 11.52 18.56 21.76 30.144 30.144l-13.76 58.112 45.632 19.008 32.384-50.048c14.144 2.176 28.736 2.176 42.496 0l31.872 50.432 46.08-19.008-13.312-58.048c11.648-8.448 21.312-18.176 30.208-30.208l58.496 13.376 19.072-45.632-51.008-31.936c2.88-12.864 2.88-27.2 0.704-41.344z m-70.976 20.928c0 39.488-31.872 71.232-71.232 71.232a71.104 71.104 0 0 1-71.232-71.232c0-39.488 31.872-71.232 71.232-71.232a70.976 70.976 0 0 1 71.232 71.232z" p-id="8651"></path></svg>
                </i>
                <i style={this.props.location.pathname === '/homePh/sitePh' ? { display: 'block' } : { display: 'none' }}>
                  <svg t="1577255042870" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8389" width="23" height="23">
                    <path d="M604.032 857.472a401.792 401.792 0 0 1-70.976 20.352l-4.544 0.896a416.576 416.576 0 0 1-45.824 5.44V663.04a187.52 187.52 0 0 0 49.792-13.568l2.176-0.96a232.96 232.96 0 0 0 12.032-5.888l5.504-2.88 2.496-1.344v-0.192l2.56-1.472c1.408-0.896 2.752-1.664 4.032-2.624a22.4 22.4 0 0 0-12.288-40.96 28.16 28.16 0 0 0-4.672 0.512 34.24 34.24 0 0 0-4.736 1.6l-0.448 0.256-1.408 0.32-1.728 1.536-0.384 0.192a143.36 143.36 0 0 1-20.224 10.944l-2.432 0.896a137.6 137.6 0 0 1-30.08 8.448V344.32a128.896 128.896 0 0 1 28.224 7.872L512 352.512A140.928 140.928 0 0 1 585.92 422.4a11.008 11.008 0 0 1 1.088 2.56l0.256 0.448c3.584 8.192 6.528 16.896 8.384 25.6l0.128 0.768a22.4 22.4 0 0 0 26.496 17.088 22.4 22.4 0 0 0 17.088-26.56 51.968 51.968 0 0 1-0.96-4.544l-0.768-2.816 0.256-0.128-2.88-8.768a180.864 180.864 0 0 0-6.976-18.688l-0.256-0.64-1.28-2.752a176.896 176.896 0 0 0-25.408-40.064l-1.088-1.28-1.024-1.152a181.76 181.76 0 0 0-74.624-51.776l-0.896-0.32-2.24-0.832a176.32 176.32 0 0 0-38.208-8.96V78.208a404.352 404.352 0 0 1 188.864 60.16c0.768 0.448 1.344 0.896 2.112 1.216l4.736 3.008 4.48 2.88c0.768 0.576 1.344 1.024 2.24 1.536a405.12 405.12 0 0 1 128.832 143.168H701.12v156.032a24.576 24.576 0 0 0 49.088 0V339.136h86.528a383.232 383.232 0 0 1 17.472 60.416v0.192c5.312 26.304 8.192 53.312 8.192 81.344 0 15.168 12.224 27.328 27.392 27.328s27.392-12.16 27.392-27.328c0-14.08-0.768-28.096-1.92-42.048l0.064-0.064a456.768 456.768 0 0 0-7.36-49.856c-0.128-0.448-0.256-0.768-0.256-1.088l-1.728-7.936a452.48 452.48 0 0 0-40.896-111.36c-0.768-1.344-1.28-2.624-1.984-3.904l-1.856-3.328a456.512 456.512 0 0 0-154.88-166.336c-0.768-0.448-1.344-0.96-2.112-1.28l-4.992-3.136A458.88 458.88 0 0 0 541.056 30.208L539.392 29.888a454.336 454.336 0 0 0-161.92 0.128c-2.816 0.512-5.632 0.96-8.448 1.6a459.008 459.008 0 0 0-141.952 53.952l-4.352 2.56a455.424 455.424 0 0 0-137.408 126.848l-2.176 3.072-2.112 3.136A454.336 454.336 0 0 0 6.4 405.504l-0.32 2.176-0.96 5.504a458.752 458.752 0 0 0 0.256 138.048c0.448 2.88 1.024 5.504 1.344 8.384 9.6 55.744 29.312 108.096 57.088 155.136 0.128 0.256 0.192 0.448 0.448 0.64l3.264 5.504c1.408 2.432 2.88 4.672 4.416 7.04l0.448 0.704a458.24 458.24 0 0 0 120.128 126.144c0.768 0.576 1.28 1.024 2.048 1.408l4.864 3.456c51.072 34.944 109.44 59.968 172.352 72l2.176 0.512 4.864 0.96c54.4 9.6 111.04 9.472 167.232-1.408h0.256l5.504-1.088c10.944-2.24 21.632-4.8 32.384-8v-0.064c13.376-3.84 26.688-8.384 39.872-13.44a27.648 27.648 0 1 0-20.032-51.648zM433.664 617.152a152.256 152.256 0 0 1-26.368-7.872l-2.688-1.152s-1.216-0.512-1.536-0.768c0 0-2.048-1.024-2.496-1.088l-0.384-0.128-0.768-0.384a136.064 136.064 0 0 1-39.232-28.608l-0.448-0.448a141.184 141.184 0 0 1-27.136-40.896l-0.128-0.192-0.96-2.496a169.728 169.728 0 0 1-2.048-5.568 133.12 133.12 0 0 1-7.552-37.248 139.264 139.264 0 0 1 10.24-62.272l0.192-0.448 0.96-2.24 0.576-1.216 0.64-1.408 0.96-1.984 0.192-0.512A136.96 136.96 0 0 1 384 365.184c6.784-4.544 14.016-8.448 21.504-11.712l0.384-0.192 2.304-0.96c0.64-0.192 1.088-0.512 1.728-0.768l0.96-0.448c6.528-2.496 13.184-4.544 19.904-5.952l3.136-0.64-0.256 272.64z m-267.584 5.824H80.448a395.968 395.968 0 0 1-18.368-64.64l-0.256-1.024-1.408-7.552-0.832-4.736-0.64-3.776A406.848 406.848 0 0 1 80.32 339.2h85.76v283.776z m62.72 190.272l-2.176-1.472a156.608 156.608 0 0 1-4.544-3.264l-4.416-3.136c-0.768-0.576-1.408-1.152-2.304-1.6l-6.464-4.864h-0.128a403.84 403.84 0 0 1-90.688-99.84c-1.28-2.048-2.688-4.16-3.904-6.272l-0.96-1.408a349.76 349.76 0 0 1-10.944-19.264h112.448V290.176H165.76v0.064h-63.232c7.232-13.504 15.232-26.688 24-39.232l0.64-0.96c1.28-1.92 2.816-3.904 4.096-5.696 0.832-1.024 1.472-2.176 2.368-3.136 0.832-1.088 1.728-2.304 2.624-3.328l4.096-5.312 0.96-1.216a401.92 401.92 0 0 1 171.264-126.464 403.84 403.84 0 0 1 68.352-19.84c0.448-0.064 0.832-0.192 1.28-0.192 2.368-0.384 4.8-0.96 7.168-1.28l5.376-0.96 3.136-0.512c11.776-1.728 23.68-3.008 35.776-3.776v221.568a172.544 172.544 0 0 0-43.52 11.968l-0.384 0.128a185.088 185.088 0 0 0-56.064 36.544 181.312 181.312 0 0 0-42.048 60.416l-1.088 2.816a180.736 180.736 0 0 0-13.504 78.208l0.192 3.2c1.216 18.432 5.056 36.48 11.776 53.568l0.064 0.32 1.216 3.072c8.448 20.608 20.352 39.424 35.584 55.744l0.384 0.448 1.6 1.6c0.832 0.832 1.472 1.6 2.368 2.368l0.192 0.192a181.376 181.376 0 0 0 60.736 40.384 185.6 185.6 0 0 0 42.624 11.648v221.632a408.768 408.768 0 0 1-204.992-70.912z" p-id="8390" fill='#D85D27'></path><path d="M952.832 708.352l50.496-31.872-19.072-46.08-57.984 13.376a142.72 142.72 0 0 0-30.208-30.656l13.312-58.048-45.632-18.944-31.36 50.496a160.32 160.32 0 0 0-42.496-0.448l-31.04-50.496-46.144 18.624 12.48 58.048a153.6 153.6 0 0 0-30.656 30.144l-57.408-13.76-19.072 45.696 49.6 31.872a142.08 142.08 0 0 0 0 42.944l-50.496 30.976 18.56 46.144 58.112-12.864c8.384 11.52 18.56 21.76 30.144 30.144l-13.76 58.112 45.632 19.008 32.384-50.048c14.144 2.176 28.736 2.176 42.496 0l31.872 50.432 46.08-19.008-13.312-58.048c11.648-8.448 21.312-18.176 30.208-30.208l58.496 13.376 19.072-45.632-51.008-31.936c2.88-12.864 2.88-27.2 0.704-41.344z m-70.976 20.928c0 39.488-31.872 71.232-71.232 71.232a71.104 71.104 0 0 1-71.232-71.232c0-39.488 31.872-71.232 71.232-71.232a70.976 70.976 0 0 1 71.232 71.232z" p-id="8391" fill='#D85D27'></path></svg>
                </i>
                {/* <img src={this.props.location.pathname === '/homePh/sitePh' ? require("../../assets/changdishezhiTwo.png") : require("../../assets/changdishezhi.png")} alt="场地设置" /> */}
                <span style={this.props.location.pathname === '/homePh/sitePh' ? { color: '#D85D27' } : { color: '#000' }}>场地设置</span>
              </Link>
            </div>
            <div onClick={this.newsPh}>
              <Link to="/homePh/newsPh">
                <i style={this.props.location.pathname === '/homePh/newsPh' ? { display: 'none' } : { display: 'block' }}>
                  <svg t="1577255589968" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5601" width="23" height="23"><path d="M546.4 269.8c0 13.8-11.2 25-25 25-67.5 0-122.3 54.9-122.3 122.3 0 13.8-11.2 25-25 25s-25-11.2-25-25c0-95 77.3-172.3 172.3-172.3 13.9 0 25 11.2 25 25z m350.5 520.7c-8.7 20.2-29.2 33.2-52.2 33.2H643c-2.2 68.1-62.9 122.9-137.2 122.9s-135-54.8-137.2-122.9H166.7c-23 0-43.5-13-52.2-33.2-8.2-19.1-4.3-40.4 10.2-55.8l68.2-72.1c44.2-46.7 68.5-106.2 68.5-167.4v-122c0-60.2 25.7-116.6 72.4-158.9 14.1-12.8 29.7-23.8 46.4-33 1.9-62.5 57.4-112.7 125.4-112.7S629.1 118.9 631 181.3c16.6 9.1 32.2 20.2 46.4 33 46.7 42.3 72.4 98.7 72.4 158.9v122c0 61.2 24.3 120.7 68.5 167.4l68.2 72.1c14.6 15.3 18.6 36.7 10.4 55.8z m-304 34H418.6c2.7 40.1 40.8 72.1 87.1 72.1s84.4-31.9 87.2-72.1zM473 151.7c10.8-1.3 21.7-2 32.8-2 11 0 22 0.7 32.8 2 11.3 0.8 22.9 2.1 35 3.8-12.3-21.8-38-36.9-67.7-36.9-29.7 0-55.4 15.1-67.7 36.9 11.9-1.7 23.5-2.9 34.8-3.8zM850.3 769l-68.2-72c-53-56-82.2-127.7-82.2-201.8v-122c0-87.3-72.5-159.7-166.5-171.8-9.5-0.7-18.7-1-27.7-1-9.1 0-18.2 0.3-27.7 1-94 12.1-166.5 84.5-166.5 171.8v122c0 74.1-29.2 145.7-82.2 201.8l-68.2 72c-0.9 1-0.8 1.2-0.6 1.6 0.6 1.4 2.6 3 6.2 3h678c3.6 0 5.6-1.6 6.2-3 0.2-0.4 0.3-0.6-0.6-1.6z" p-id="5602"></path></svg>
                </i>
                <i style={this.props.location.pathname === '/homePh/newsPh' ? { display: 'block' } : { display: 'none' }}>
                  <svg t="1577255589968" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5601" width="23" height="23"><path d="M546.4 269.8c0 13.8-11.2 25-25 25-67.5 0-122.3 54.9-122.3 122.3 0 13.8-11.2 25-25 25s-25-11.2-25-25c0-95 77.3-172.3 172.3-172.3 13.9 0 25 11.2 25 25z m350.5 520.7c-8.7 20.2-29.2 33.2-52.2 33.2H643c-2.2 68.1-62.9 122.9-137.2 122.9s-135-54.8-137.2-122.9H166.7c-23 0-43.5-13-52.2-33.2-8.2-19.1-4.3-40.4 10.2-55.8l68.2-72.1c44.2-46.7 68.5-106.2 68.5-167.4v-122c0-60.2 25.7-116.6 72.4-158.9 14.1-12.8 29.7-23.8 46.4-33 1.9-62.5 57.4-112.7 125.4-112.7S629.1 118.9 631 181.3c16.6 9.1 32.2 20.2 46.4 33 46.7 42.3 72.4 98.7 72.4 158.9v122c0 61.2 24.3 120.7 68.5 167.4l68.2 72.1c14.6 15.3 18.6 36.7 10.4 55.8z m-304 34H418.6c2.7 40.1 40.8 72.1 87.1 72.1s84.4-31.9 87.2-72.1zM473 151.7c10.8-1.3 21.7-2 32.8-2 11 0 22 0.7 32.8 2 11.3 0.8 22.9 2.1 35 3.8-12.3-21.8-38-36.9-67.7-36.9-29.7 0-55.4 15.1-67.7 36.9 11.9-1.7 23.5-2.9 34.8-3.8zM850.3 769l-68.2-72c-53-56-82.2-127.7-82.2-201.8v-122c0-87.3-72.5-159.7-166.5-171.8-9.5-0.7-18.7-1-27.7-1-9.1 0-18.2 0.3-27.7 1-94 12.1-166.5 84.5-166.5 171.8v122c0 74.1-29.2 145.7-82.2 201.8l-68.2 72c-0.9 1-0.8 1.2-0.6 1.6 0.6 1.4 2.6 3 6.2 3h678c3.6 0 5.6-1.6 6.2-3 0.2-0.4 0.3-0.6-0.6-1.6z" p-id="5602" fill='#D85D27'></path></svg>
                </i>
                {/* <img src={this.props.location.pathname === '/homePh/newsPh' ? require("../../assets/xiaoxiTwo.png") : require("../../assets/xiaoxi.png")} alt="消息" /> */}
                <span style={this.props.location.pathname === '/homePh/newsPh' ? { color: '#D85D27' } : { color: '#000' }}>消息</span>
              </Link>
            </div>
            <div onClick={this.mine}>
              <Link to="/homePh/minePh">
                <i style={this.props.location.pathname === '/homePh/minePh' ? { display: 'none' } : { display: 'block' }}>
                  <svg t="1577255867170" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9532" width="23" height="23"><path d="M875.507 936.258H124.998c-19.418 0-38.836-9.709-51.458-24.272l-0.97-0.97c-12.623-17.478-16.506-37.867-11.652-56.313 39.808-201.95 206.803-355.351 405.838-371.857 4.854-0.97 8.738-1.941 12.622-1.941h36.895l-4.856 48.545H492c-7.767 0-11.651 0-17.476 1.94h-2.912C291.993 544.015 141.504 681.884 106.55 865.384c-0.97 4.854-0.97 11.651 3.883 16.506l0.97 1.94c2.914 3.885 7.769 5.827 13.594 5.827h751.479c5.825 0 10.68-1.941 13.592-5.826 4.855-5.825 5.826-11.65 4.855-18.447-22.33-120.393-95.149-222.336-198.064-280.591l-0.97-0.97c-7.768-4.856-17.477-9.71-26.215-14.565-2.913-1.941-5.826-2.912-8.738-4.853l-13.593-5.826 19.418-43.691 13.592 5.825c9.709 3.884 19.419 9.709 28.157 13.592l11.65 5.827c116.51 66.02 197.093 180.587 223.308 314.573 4.855 19.417 0 39.807-14.563 57.283-13.593 15.534-33.982 24.272-53.4 24.272z" p-id="9533"></path><path d="M505.593 514.886c-122.334 0-223.308-100.974-223.308-223.308S383.259 68.271 505.593 68.271s223.308 100.974 223.308 223.307-101.945 223.309-223.307 223.309z m0-411.663c-104.858 0-188.355 84.468-188.355 188.355s84.47 188.355 188.355 188.355 188.355-84.47 188.355-188.355-84.47-188.355-188.355-188.355z" p-id="9534"></path><path d="M505.593 519.741c-126.218 0-228.162-101.945-228.162-228.162S379.375 63.416 505.593 63.416s228.162 101.946 228.162 228.163S630.84 519.74 505.593 519.74z m0-446.615c-120.391 0-218.453 98.06-218.453 218.453s98.062 218.453 218.453 218.453 218.453-98.062 218.453-218.453-98.06-218.453-218.453-218.453z m0 411.663c-106.799 0-193.21-86.41-193.21-193.21s86.41-193.211 193.21-193.211c106.8 0 193.21 86.41 193.21 193.211s-87.381 193.21-193.21 193.21z m0-376.71c-100.974 0-183.501 82.527-183.501 183.501s82.527 183.501 183.501 183.501 183.501-82.528 183.501-183.501c0-100.974-82.527-183.501-183.501-183.501zM207.525 775.088c-1.941 0-4.854-0.97-6.797-1.941-6.796-3.884-9.709-12.622-5.825-19.419 85.44-166.025 270.882-197.093 278.65-198.064 7.768-0.97 15.534 3.884 16.506 11.651 0.97 7.768-3.884 15.534-11.651 16.506-1.942 0-178.646 30.097-257.29 182.529-2.912 5.826-7.768 8.738-13.593 8.738z m-33.011 84.47c-7.767 0-14.563-6.798-14.563-14.565 0-28.156 18.447-58.254 21.36-61.167 3.882-6.796 13.592-8.738 20.389-4.853 6.796 3.882 8.738 13.591 4.853 20.388-4.853 6.796-16.504 29.128-16.504 45.632-0.97 7.768-6.797 14.564-15.535 14.564z" p-id="9535"></path></svg>
                </i>

                <i style={this.props.location.pathname === '/homePh/minePh' ? { display: 'block' } : { display: 'none' }}>
                  <svg t="1577255867170" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9532" width="23" height="23"><path d="M875.507 936.258H124.998c-19.418 0-38.836-9.709-51.458-24.272l-0.97-0.97c-12.623-17.478-16.506-37.867-11.652-56.313 39.808-201.95 206.803-355.351 405.838-371.857 4.854-0.97 8.738-1.941 12.622-1.941h36.895l-4.856 48.545H492c-7.767 0-11.651 0-17.476 1.94h-2.912C291.993 544.015 141.504 681.884 106.55 865.384c-0.97 4.854-0.97 11.651 3.883 16.506l0.97 1.94c2.914 3.885 7.769 5.827 13.594 5.827h751.479c5.825 0 10.68-1.941 13.592-5.826 4.855-5.825 5.826-11.65 4.855-18.447-22.33-120.393-95.149-222.336-198.064-280.591l-0.97-0.97c-7.768-4.856-17.477-9.71-26.215-14.565-2.913-1.941-5.826-2.912-8.738-4.853l-13.593-5.826 19.418-43.691 13.592 5.825c9.709 3.884 19.419 9.709 28.157 13.592l11.65 5.827c116.51 66.02 197.093 180.587 223.308 314.573 4.855 19.417 0 39.807-14.563 57.283-13.593 15.534-33.982 24.272-53.4 24.272z" p-id="9533" fill='#D85D27'></path><path d="M505.593 514.886c-122.334 0-223.308-100.974-223.308-223.308S383.259 68.271 505.593 68.271s223.308 100.974 223.308 223.307-101.945 223.309-223.307 223.309z m0-411.663c-104.858 0-188.355 84.468-188.355 188.355s84.47 188.355 188.355 188.355 188.355-84.47 188.355-188.355-84.47-188.355-188.355-188.355z" p-id="9534" fill='#D85D27'></path><path d="M505.593 519.741c-126.218 0-228.162-101.945-228.162-228.162S379.375 63.416 505.593 63.416s228.162 101.946 228.162 228.163S630.84 519.74 505.593 519.74z m0-446.615c-120.391 0-218.453 98.06-218.453 218.453s98.062 218.453 218.453 218.453 218.453-98.062 218.453-218.453-98.06-218.453-218.453-218.453z m0 411.663c-106.799 0-193.21-86.41-193.21-193.21s86.41-193.211 193.21-193.211c106.8 0 193.21 86.41 193.21 193.211s-87.381 193.21-193.21 193.21z m0-376.71c-100.974 0-183.501 82.527-183.501 183.501s82.527 183.501 183.501 183.501 183.501-82.528 183.501-183.501c0-100.974-82.527-183.501-183.501-183.501zM207.525 775.088c-1.941 0-4.854-0.97-6.797-1.941-6.796-3.884-9.709-12.622-5.825-19.419 85.44-166.025 270.882-197.093 278.65-198.064 7.768-0.97 15.534 3.884 16.506 11.651 0.97 7.768-3.884 15.534-11.651 16.506-1.942 0-178.646 30.097-257.29 182.529-2.912 5.826-7.768 8.738-13.593 8.738z m-33.011 84.47c-7.767 0-14.563-6.798-14.563-14.565 0-28.156 18.447-58.254 21.36-61.167 3.882-6.796 13.592-8.738 20.389-4.853 6.796 3.882 8.738 13.591 4.853 20.388-4.853 6.796-16.504 29.128-16.504 45.632-0.97 7.768-6.797 14.564-15.535 14.564z" p-id="9535" fill='#D85D27'></path></svg>
                </i>


                {/* <img src={this.props.location.pathname === '/homePh/minePh' ? require("../../assets/wodTwo.png") : require("../../assets/wod.png")} alt="我的" /> */}
                <span style={this.props.location.pathname === '/homePh/minePh' ? { color: '#D85D27' } : { color: '#000' }}>我的</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default homePh;