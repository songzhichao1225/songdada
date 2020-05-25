import React from 'react';
import { Route, Link } from 'react-router-dom';
import './home.css';
import 'antd/dist/antd.css';
import { getVenueIndex, gerVenueName } from '../../api';
import { Layout, Menu, message, notification } from 'antd';
import {HomeOutlined,SettingOutlined} from '@ant-design/icons';
import homePage from '../homePage/homePage';
import information from '../information/information';
import siteSettings from '../siteSettings/siteSettings';
import preferentialTwo from '../preferentialTwo/preferentialTwo';
import stadiums from '../stadiums/stadiums';
import systemSettings from '../systemSettings/systemSettings';
import myWallet from '../myWallet/myWallet';
import comment from '../comment/comment';
import news from '../news/news';
import closeYu from '../closeYu/closeYu';
import appointmentList from '../appointmentList/appointmentList';
import special from '../special/special';


const { Header, Sider, Content, Footer } = Layout;

function jo(){
  var ws = new WebSocket("wss://www.venue.zhaoduishou.com/socket");
  ws.onopen = function () {
    ws.send(sessionStorage.getItem('siteuid'))
  }
  ws.onmessage = function (e) {
    let message_info = JSON.parse(e.data)
    let msg = new SpeechSynthesisUtterance(message_info.percent)
    window.speechSynthesis.speak(msg)
    notification.open({ description: message_info.percent,duration:5 })
    sessionStorage.setItem('kood',2)
   
  }
  ws.onclose=function(){
    jo()
   }
}

class home extends React.Component {


  state = {
    collapsed: false,
    year: '',
    mount: '',
    date: '',
    getDay: '',
    hours: '',
    minutes: '',
    minheight: '',
    keyIng: '1',
    getVenue: '',
    gerVenueName: '',
    nookod: '',
  };



  componentDidMount() {
    sessionStorage.setItem('kood',1)
    sessionStorage.setItem('loodSo','0')
    this.setState({ minheight: document.body.scrollHeight, path: this.props.history.location.pathname })
    this.getVenueIndex()
    this.gerVenueName()
    setInterval(() => {
      this.timer()
    }, 1000)

    if (this.props.history.location.pathname === '/home') {
      sessionStorage.setItem('path', '1');
    } else if (this.props.history.location.pathname === '/home/news') {
      sessionStorage.setItem('path', '1');
    } else if (this.props.history.location.pathname === '/home/appointmentList') {
      sessionStorage.setItem('path', '2');
    } else if (this.props.history.location.pathname === '/home/siteSettings') {
      sessionStorage.setItem('path', '3');
    } else if (this.props.history.location.pathname === '/home/preferential') {
      sessionStorage.setItem('path', '4');
    } else if (this.props.history.location.pathname === '/home/stadiums') {
      sessionStorage.setItem('path', '5');
    } else if (this.props.history.location.pathname === '/home/systemSettings') {
      sessionStorage.setItem('path', '6');
    } else if (this.props.history.location.pathname === '/home/myWallet') {
      sessionStorage.setItem('path', '7');
    } else if (this.props.history.location.pathname === '/home/closeYu') {
      sessionStorage.setItem('path', '6');
    } else if (this.props.history.location.pathname === '/home/special') {
      sessionStorage.setItem('path', '8');
    }
    jo()
   
    
    
   
   
  }



  componentWillReceiveProps() {
    this.setState({ path: this.props.history.location.pathname })
    this.getVenueIndex()
    this.gerVenueName()
    if (this.props.history.location.pathname === '/home') {
      sessionStorage.setItem('path', '1');
    } else if (this.props.history.location.pathname === '/homenews') {
      sessionStorage.setItem('path', '1');
    } else if (this.props.history.location.pathname === '/home/appointmentList') {
      sessionStorage.setItem('path', '2');
    } else if (this.props.history.location.pathname === '/home/siteSettings') {
      sessionStorage.setItem('path', '3');
    } else if (this.props.history.location.pathname === '/home/preferential') {
      sessionStorage.setItem('path', '4');
    } else if (this.props.history.location.pathname === '/home/stadiums') {
      sessionStorage.setItem('path', '5');
    } else if (this.props.history.location.pathname === '/home/systemSettings') {
      sessionStorage.setItem('path', '6');
    } else if (this.props.history.location.pathname === '/home/myWallet') {
      sessionStorage.setItem('path', '7');
    } else if (this.props.history.location.pathname === '/home/closeYu') {
      sessionStorage.setItem('path', '6');
    } else if (this.props.history.location.pathname === '/home/special') {
      sessionStorage.setItem('path', '8');
    }

    if (sessionStorage.getItem('islegal') === 0) {
      this.props.history.push('/')
      message.error('未通过审核!')
    }
  }

  lppd = () => {
    this.props.history.push('home/comment')
    this.setState({ path: this.props.history.location.pathname })
  }

  timer = () => {
    let myDate = new Date();
    let day = ''
    switch (myDate.getDay()) {
      case 0:
        day = "星期天";
        break;
      case 1:
        day = "星期一";
        break;
      case 2:
        day = "星期二";
        break;
      case 3:
        day = "星期三";
        break;
      case 4:
        day = "星期四";
        break;
      case 5:
        day = "星期五";
        break;
      case 6:
        day = "星期六";
        break;
      default:
        day = "";
    }
    let month = ""
    if (myDate.getMonth() + 1 < 10) {
      month = '0' + (myDate.getMonth() + 1)
    } else {
      month = myDate.getMonth() + 1
    }
    let Tdate = ""
    if (myDate.getDate() < 10) {
      Tdate = '0' + myDate.getDate()
    } else {
      Tdate = myDate.getDate()
    }
    let Thours = ""
    if (myDate.getHours() < 10) {
      Thours = "0" + myDate.getHours()
    } else {
      Thours = myDate.getHours()
    }
    let Tminutes = ""
    if (myDate.getMinutes() < 10) {
      Tminutes = '0' + myDate.getMinutes()
    } else {
      Tminutes = myDate.getMinutes()
    }
    this.setState({
      year: myDate.getFullYear() + '    /', mount: month + '    /', date: Tdate, getDay: day, hours: Thours + ':', minutes: Tminutes
    })
    if (Thours < 12) {
      this.setState({ nookod: '上午好' })
    } else if (Thours > 12) {
      this.setState({ nookod: '下午好' })
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  kood = (e) => {
    this.setState({ keyIng: e.key })
    sessionStorage.setItem('path', e.key);
    this.setState({ path: this.props.history.location.pathname })
  }

  async getVenueIndex(data) {
    const res = await getVenueIndex(data, sessionStorage.getItem('venue_token'))
    this.setState({ getVenue: res.data.data })
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ gerVenueName: res.data.data })
      sessionStorage.setItem('mess',res.data.data.mess)
    }
  }


  income = () => {
    this.props.history.push({ pathname: '/home/myWallet', query: { time: 1 } })
  }
  daysIncome = () => {
    this.props.history.push({ pathname: '/home/myWallet', query: { time: 2 } })
  }

  mounthOrder = () => {
    this.props.history.push({ pathname: '/home/information', query: { time: 1 } })
  }

  mounthOrderTwo = () => {
    this.props.history.push({ pathname: '/home/information', query: { time: 2 } })
  }
  news = () => {
    this.gerVenueName()
    this.props.history.push("/home/news")
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={150} className="sider">
          <div className="logo">
            <img style={{ height: 40, margin: '0 auto', marginTop: 10,display:'block' }}
              src={require("../../assets/tiaozhanicon.png")} alt="logo" />
          </div>
          <Menu theme="dark"  selectedKeys={[sessionStorage.getItem('path')]} onSelect={this.kood}>
            <Menu.Item key="1">
              <Link to="/home">
                <HomeOutlined />
                <span>首</span>
                <span style={{paddingLeft:35}}>页</span>
              </Link>
            </Menu.Item>

              <Menu.Item key="4">
              <Link to="/home/preferential">
              <i className="anticon anticon-gift">
                  <svg t="1571136349374" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" p-i='true' d="1831" width="1em" height="1em"><path d="M424.9 142.4c0.1 0.1 0.3 0.2 0.3 0.3V878c-0.1 0.1-0.2 0.3-0.3 0.3H145.6c-0.1-0.1-0.3-0.2-0.3-0.3V142.7c0.1-0.1 0.2-0.3 0.3-0.3h279.3m0-80H145.5c-44.2 0-80.3 36.1-80.3 80.3v735.4c0 44.2 36.1 80.3 80.3 80.3h279.4c44.2 0 80.3-36.1 80.3-80.3V142.7c0-44.1-36.1-80.3-80.3-80.3z" p-id="2437"></path><path d="M879.8 142.9c0.1 0.1 0.3 0.2 0.3 0.3v341c-0.1 0.1-0.2 0.3-0.3 0.3H631.4c-0.1-0.1-0.3-0.2-0.3-0.3v-341c0.1-0.1 0.2-0.3 0.3-0.3h248.4m0-80H631.3c-44.2 0-80.3 36.1-80.3 80.3v341c0 44.2 36.1 80.3 80.3 80.3h248.5c44.2 0 80.3-36.1 80.3-80.3v-341c0-44.1-36.1-80.3-80.3-80.3z" p-id="2438"></path><path d="M880.2 688.1c0.1 0.1 0.3 0.2 0.3 0.3v189.7c-0.1 0.1-0.2 0.3-0.3 0.3H631.8c-0.1-0.1-0.3-0.2-0.3-0.3V688.4c0.1-0.1 0.2-0.3 0.3-0.3h248.4m0-80H631.7c-44.2 0-80.3 36.1-80.3 80.3v189.8c0 44.2 36.1 80.3 80.3 80.3h248.5c44.2 0 80.3-36.1 80.3-80.3V688.4c0-44.2-36.1-80.3-80.3-80.3z" p-id="2439"></path></svg>
                </i>
                <span>场地占用</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/home/appointmentList">
                <i className="anticon anticon-gift">
                  <svg t="1571136412563" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" p-id="1831" width="1em" height="1em"><path d="M827 869.6H196.7c-44-0.1-79.6-35.7-79.6-79.6V438.6h789.5V790c0 43.9-35.7 79.6-79.6 79.6zM196.7 223.4h87.7v53.5c0 11 8.9 19.9 19.9 19.9 11 0 19.9-8.9 19.9-19.9v-53.5h367.5v53.5c0 11 8.9 19.9 19.9 19.9 11 0 19.9-8.9 19.9-19.9v-53.5H827c44 0.1 79.6 35.7 79.6 79.6v95.8H117.1V303c0-44 35.6-79.6 79.6-79.6zM827 170.3h-95.5v-50.6c0-11-8.9-19.9-19.9-19.9-11 0-19.9 8.9-19.9 19.9v50.6H324.2v-50.6c0-11-8.9-19.9-19.9-19.9-11 0-19.9 8.9-19.9 19.9v50.6h-87.7C123.4 170.4 64.1 229.7 64 303v487c0.1 73.3 59.4 132.6 132.7 132.7H827c73.3-0.1 132.6-59.4 132.7-132.7V303c-0.1-73.3-59.5-132.6-132.7-132.7z" p-id="2590"></path><path d="M657.6 529.4l-183.1 183-99.1-99.1c-9.2-9.2-24.2-9.2-33.4 0s-9.2 24.2 0 33.4l115.9 115.9c9.2 9.2 24.2 9.2 33.4 0L691 562.9c9.2-9.2 9.2-24.2 0-33.4-9.2-9.3-24.2-9.3-33.4-0.1z" p-id="2591"></path></svg>
                </i>
                <span>活动列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/home/siteSettings">
                <i className="anticon anticon-gift">
                  <svg t="1571136349374" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" p-i='true' d="1831" width="1em" height="1em"><path d="M424.9 142.4c0.1 0.1 0.3 0.2 0.3 0.3V878c-0.1 0.1-0.2 0.3-0.3 0.3H145.6c-0.1-0.1-0.3-0.2-0.3-0.3V142.7c0.1-0.1 0.2-0.3 0.3-0.3h279.3m0-80H145.5c-44.2 0-80.3 36.1-80.3 80.3v735.4c0 44.2 36.1 80.3 80.3 80.3h279.4c44.2 0 80.3-36.1 80.3-80.3V142.7c0-44.1-36.1-80.3-80.3-80.3z" p-id="2437"></path><path d="M879.8 142.9c0.1 0.1 0.3 0.2 0.3 0.3v341c-0.1 0.1-0.2 0.3-0.3 0.3H631.4c-0.1-0.1-0.3-0.2-0.3-0.3v-341c0.1-0.1 0.2-0.3 0.3-0.3h248.4m0-80H631.3c-44.2 0-80.3 36.1-80.3 80.3v341c0 44.2 36.1 80.3 80.3 80.3h248.5c44.2 0 80.3-36.1 80.3-80.3v-341c0-44.1-36.1-80.3-80.3-80.3z" p-id="2438"></path><path d="M880.2 688.1c0.1 0.1 0.3 0.2 0.3 0.3v189.7c-0.1 0.1-0.2 0.3-0.3 0.3H631.8c-0.1-0.1-0.3-0.2-0.3-0.3V688.4c0.1-0.1 0.2-0.3 0.3-0.3h248.4m0-80H631.7c-44.2 0-80.3 36.1-80.3 80.3v189.8c0 44.2 36.1 80.3 80.3 80.3h248.5c44.2 0 80.3-36.1 80.3-80.3V688.4c0-44.2-36.1-80.3-80.3-80.3z" p-id="2439"></path></svg>
                </i>
                <span>场地设置</span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="8">
              <Link to="/home/special">
                <i className="anticon anticon-gift">
                  <svg t="1575597370225" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" width="1rem" height="1rem"><path d="M351.962 128.277l128.1-0.154 0.077 64-128.1 0.154zM255.804 64.339l64-0.077 0.192 159.9-64 0.077zM512.004 64.038l64-0.076 0.192 159.9-64 0.076z" p-id="1703"></path><path d="M160.9 896c-17.7 0-32-14.3-32-31.9l-0.8-639.6c0-17.7 14.3-32 32-32l64.1-0.1-0.1-64-64.1 0.1c-53.1 0.1-96 43.1-96 96.1l0.8 639.6c0.1 53 43.1 95.9 96.2 95.8l511.7-0.6-0.1-64-511.7 0.6z" p-id="1704"></path><path d="M513.1 702.7l-287.8 0.3c-17.7 0-32 14.3-32 32s14.3 32 32 31.9l287.8-0.3c17.7 0 32-14.3 32-32 0-17.6-14.3-31.9-32-31.9zM225.1 511.2c-17.7 0-32 14.3-32 32s14.3 32 32 31.9l383.8-0.5c17.7 0 32-14.3 32-32s-14.3-32-32-31.9l-383.8 0.5zM224.9 319.3c-17.7 0-32 14.3-32 32s14.3 32 32 31.9l383.8-0.5c17.7 0 32-14.3 32-32s-14.3-32-32-31.9l-383.8 0.5zM768.1 223.7c-0.1-53-43.1-95.9-96.1-95.8l-64 0.1 0.1 64 64-0.1c17.7 0 32 14.3 32 31.9l0.4 352.2h64l-0.4-352.3zM950.6 790.6L816.1 925c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.7 0-45.2l79.8-79.7L608 800c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L700 630.7c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-60 60H928c12.9 0 24.6 7.8 29.6 19.8 4.9 11.9 2.2 25.7-7 34.8z" p-id="1705"></path></svg>
                </i>
                <span>特殊场地</span>
              </Link>
            </Menu.Item> */}
          
          
            <Menu.Item key="5">
              <Link to={{ pathname: '/home/stadiums', query: { name: 'sunny' } }}>
                <i className="anticon anticon-gift" >
                  <svg t="1571135424567" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" p-id="1831" width="1em" height="1em"><path d="M25.6 414.72C223.744 249.9584 412.928 176.6912 593.0496 195.072v823.9616H25.6V414.72z m216.1664 24.7296v192.256h135.168V439.4496h-135.168z m0 274.6368v192.256h135.168v-192.256h-135.168zM998.4 222.464C944.3328 57.7024 827.2384-15.5648 647.1168 2.7648v1016.2176H998.4V222.464z" p-id="1832"></path></svg>
                </i>
                <span>场馆信息</span>
              </Link>
            </Menu.Item>


            <Menu.Item key="6">
              <Link to="/home/systemSettings">
              <SettingOutlined />
                <span>系统设置</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/home/myWallet">
                <i className="anticon anticon-gift" >
                  <svg t="1571136536735" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" p-id="1831" width="1em" height="1em"><path d="M840.343655 349.106026l-27.863604 0 0-100.252285c0-30.971385-25.197892-56.169277-56.171324-56.169277L605.645308 192.684464l-19.203364-30.931476c-9.496282-15.275915-27.768437-20.521383-41.597397-11.938913l-69.061912 42.871413-262.416642 0c-1.456165 0-2.867304 0.182149-4.227278 0.497327-21.928429 0.335644-42.249243 10.832719-57.32152 29.659507-14.343683 17.916045-22.242584 41.49302-22.242584 66.389036 0 12.885472 2.131547 25.408693 6.161327 36.985356-0.394996 1.514493-0.627287 3.095501-0.627287 4.733814l0 511.199775c0 30.972409 25.197892 56.170301 56.169277 56.170301l649.066749 0c30.972409 0 56.169277-25.197892 56.169277-56.170301L896.513956 405.276327C896.512932 374.303918 871.316064 349.106026 840.343655 349.106026zM859.066065 649.071865l-74.087369 0c-21.157879 0-38.370913-17.207917-38.370913-38.359656 0-21.148669 17.213034-38.353516 38.370913-38.353516l74.087369 0L859.066065 649.071865zM756.308727 230.131331c10.32516 0 18.724457 8.399297 18.724457 18.72241l0 100.252285-72.281233 0-73.861218-118.974695L756.308727 230.131331zM557.456796 186.05958l101.219309 163.046447-344.526731 0c-2.077312-0.795109-4.324492-1.249457-6.681166-1.249457l-10.658757 0L557.456796 186.05958zM181.048961 246.24431c8.070816-10.080589 18.430768-15.632025 29.17139-15.632025l97.248881 0c1.433652 0 2.824325-0.176009 4.16588-0.480954l103.823624 0L227.114113 347.046111c-0.407276 0.252757-0.788969 0.532119-1.169639 0.810459l-15.725146 0c-10.741645 0-21.100574-5.551436-29.170366-15.632025-9.046027-11.30037-14.028505-26.569122-14.028505-42.993187C167.020456 272.810363 172.001911 257.543657 181.048961 246.24431zM840.343655 860.872712 191.276906 860.872712c-10.323113 0-18.72241-8.399297-18.72241-18.723434L172.554496 385.993145c1.459235 0.36532 2.986007 0.558725 4.558829 0.558725l663.23033 0c10.324136 0 18.72241 8.399297 18.72241 18.723434l0 129.635499-74.087369 0c-41.806151 0-75.81778 34.003442-75.81778 75.800383 0 41.800012 34.011628 75.806523 75.81778 75.806523l74.087369 0 0 155.630546C859.066065 852.473415 850.667791 860.872712 840.343655 860.872712z" p-id="4157"></path><path d="M798.753421 628.39801c10.042727 0 18.185174-8.147564 18.185174-18.198477 0-10.057053-8.141424-18.204617-18.185174-18.204617-10.070356 0-18.21178 8.147564-18.21178 18.204617C780.542664 620.250446 788.684088 628.39801 798.753421 628.39801z" p-id="4158"></path></svg>
                </i>
                <span>我的钱包</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="headerTor">
            <div className="Gname">
              <img src={require("../../assets/icon_logo_Gname.png")} alt="logo" />
              <span>{this.state.gerVenueName.name}</span>
            </div>
            <div className="time">
            
              <div className="new">
                <div onClick={this.news}>
                  <img src={require("../../assets/icon_pc_new.png")} alt="message" />
                  <div className="number"><span>{Number(sessionStorage.getItem('mess'))>=999?'...':sessionStorage.getItem('mess')}</span></div>
                </div>
              </div>
              <div className="lvyue">场地履约率：{this.state.gerVenueName.rate}%</div>
            </div>
          </Header>
          <div style={{ height: 8, background: '#F5F5F5', width: '100%' }}></div>
          <Content style={{
            background: '#fff',
           
          }}>
            <div className={this.state.path !== '/home' ? 'homePageT' : 'homePage'} >
              <span className="title" style={this.state.nookod !== '' ? { opacity: '1' } : { opacity: '0' }}>{this.state.nookod}! 欢迎使用找对手场馆端</span>
              <div style={{ height: 8, background: '#F5F5F5', width: '100%' }}></div>
              <div className="divContent">
                <div onClick={this.income}>
                  <div className="left"><span>本月收入</span><span>￥{this.state.getVenue.month_money}</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_money.png")} alt="icon" /></div>
                </div>
                <div onClick={this.daysIncome}>
                  <div className="left"><span>今日收入</span><span>￥{this.state.getVenue.today_money}</span></div>
                  <div className="right" ><img src={require("../../assets/icon_pc_money.png")} alt="icon" /></div>
                </div>
                <div onClick={this.mounthOrderTwo}>
                  <div className="left"><span>本月预约</span><span>{this.state.getVenue.month_count}单</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_biji.png")} alt="icon" /></div>
                </div>
                <div onClick={this.mounthOrder}>
                  <div className="left"><span>今日预约</span><span>{this.state.getVenue.today_count}单</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_biji.png")} alt="icon" /></div>
                </div>
                <div onClick={this.lppd}>
                  <div className="left"><span style={{ marginTop: '20%' }}>场馆评分{this.state.getVenue.score}分</span>
                    <div className="xing">
                      <img src={this.state.getVenue.score >= 1 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenue.score < 1 && this.state.getVenue.score > 0 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenue.score >= 2 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenue.score < 2 && this.state.getVenue.score > 1 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenue.score >= 3 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenue.score < 3 && this.state.getVenue.score > 2 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenue.score >= 4 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenue.score < 4 && this.state.getVenue.score > 3 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenue.score >= 5 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenue.score < 5 && this.state.getVenue.score > 4 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                    </div>
                  </div>
                  <div className="right"><img src={require("../../assets/icon_pc_xingxin.png")} alt="icon" /></div>
                </div>
              </div>
            </div>
            <Route path="/home/homePage" component={homePage} />
            <Route path="/home/information" component={information} />
            <Route path="/home/siteSettings" component={siteSettings} />
            <Route path="/home/preferential" component={preferentialTwo} />
            <Route path="/home/stadiums" component={stadiums} />
            <Route path="/home/systemSettings" component={systemSettings} />
            <Route path="/home/myWallet" component={myWallet} />
            <Route path="/home/comment" component={comment} />
            <Route path="/home/news" component={news} />
            <Route path="/home/closeYu" component={closeYu} />
            <Route path="/home/appointmentList" component={appointmentList} />
            <Route path="/home/special" component={special} />

          </Content>
          <Footer>Copyright ©2019 北京甲乙电子商务有限公司</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default home;