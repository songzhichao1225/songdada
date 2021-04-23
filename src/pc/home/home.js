import React from 'react';
import { Route, Link } from 'react-router-dom';
import './home.css';
import 'antd/dist/antd.css';
import { getVenueIndex, gerVenueName, VenueEvaluationOfOperation, _login, VenueEvaluationSave, getsiteTels, getMobilePhoneBindingVenues, getAudio, getsiteTel } from '../../api';
import { Layout, Menu, message, notification, Modal, Rate, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import homePage from '../homePage/homePage';
// import information from '../information/information';
// import siteSettings from '../siteSettings/siteSettings';
// import preferentialTwo from '../preferentialTwo/preferentialTwo';
// import stadiums from '../stadiums/stadiums';
// import systemSettings from '../systemSettings/systemSettings';
import myWallet from '../myWallet/myWallet';
// import comment from '../comment/comment';
// import news from '../news/news';
// import closeYu from '../closeYu/closeYu';
// import appointmentList from '../appointmentList/appointmentList';
// import special from '../special/special';

import lazyLoad from '../../lazyLoad';


const homePage = lazyLoad(() => import('../homePage/homePage'));
const information = lazyLoad(() => import('../information/information'));
const siteSettings = lazyLoad(() => import('../siteSettings/siteSettings'));
const preferentialTwo = lazyLoad(() => import('../preferentialTwo/preferentialTwo'));
const stadiums = lazyLoad(() => import('../stadiums/stadiums'));
const systemSettings = lazyLoad(() => import('../systemSettings/systemSettings'));
// const myWallet = lazyLoad(() => import('../myWallet/myWallet'));
const comment = lazyLoad(() => import('../comment/comment'));
const news = lazyLoad(() => import('../news/news'));
const closeYu = lazyLoad(() => import('../closeYu/closeYu'));
const command = lazyLoad(() => import('../command/command'));
const appointmentList = lazyLoad(() => import('../appointmentList/appointmentList'));
const special = lazyLoad(() => import('../special/special'));
const VipAgement = lazyLoad(() => import('../VipAgement/VipAgement'));
const siteSettingsTwo = lazyLoad(() => import('../siteSettingsTwo/siteSettingsTwo'));
const Koloko = lazyLoad(() => import('../koloko/koloko'));


const { Header, Sider, Content } = Layout;
const { Option } = Select;



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
    gerVenueNameName: '',
    gerVenueNameRate: '',
    getVenueMonth_money: '',
    getVenueToday_money: '',
    getVenueMonth_count: '',
    getVenueToday_count: '',
    getVenueScore: '',
    ishaverecharge: 0,
    month_member_money: '',
    today_member_money: '',
    isModalVisible: false,
    detail: [],
    Selabel: [],
    SelabelTwo: [],
    rate: 5,
    labelId: [],
    isevaluate: 0,
    selectEd: [],
    defaultValue: '',
    phone: '',
    flagHidden: 0,
    at: '',
    sid: '',
    arrPhp: [],
    moName: [],
  };


  async VenueEvaluationOfOperation(data) {
    const res = await VenueEvaluationOfOperation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let object = res.data.data.label
      var arr = []
      for (let i in object) {
        arr.push(object[i])
      }

      this.setState({ detail: res.data.data, Selabel: arr, SelabelTwo: arr[4], isModalVisible: true })
    }
  }


  async getMobilePhoneBindingVenues(data) {
    const res = await getMobilePhoneBindingVenues(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let data = res.data.data
      for (let i in data) {
        if (data[i].venueuuid === sessionStorage.getItem('uuid')) {
          this.setState({ defaultValue: data[i].name })
        }
      }
      this.setState({ selectEd: res.data.data, phone: res.data.other.phone })
    }
  }



  async getVenueIndexTwo(data) {
    const res = await getVenueIndex(data, '')
    if (res.data.code === 2000) {
      if (res.data.data.isevaluate === 0) {
        this.VenueEvaluationOfOperation()
      }
      this.setState({
        isevaluate: res.data.data.dataisevaluate,
        getVenueMonth_money: res.data.data.month_money, getVenueToday_money: res.data.data.today_money, getVenueMonth_count: res.data.data.month_count,
        month_member_money: res.data.data.month_member_money, today_member_money: res.data.data.today_member_money,
        getVenueToday_count: res.data.data.today_count, getVenueScore: res.data.data.score
      })
      sessionStorage.setItem('score', res.data.data.score)
    }
  }

  async gerVenueNameTwo(data) {
    const res = await gerVenueName(data, '')
    if (res.data.code === 4001) {
      message.error('登录超时!')
    } else {
      this.setState({ defaultValue: res.data.data.name, gerVenueNameRate: res.data.data.rate, ishaverecharge: res.data.data.ishaverecharge })
      sessionStorage.setItem('mess', res.data.data.mess)
      sessionStorage.setItem('siteuid', res.data.data.siteuid)
      sessionStorage.setItem('ishaverecharge', res.data.data.ishaverecharge)
      sessionStorage.setItem('siteName', res.data.data.name)




    }
  }

  async getAudio(data) {
    const res = await getAudio(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let url = res.data.data.path;
      let audio = new Audio(url);
      audio.src = url;
      audio.preload = 'load'
      audio.play();
      document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
      }, false);
      document.addEventListener('YixinJSBridgeReady', function () {
        audio.play();
      }, false);
      document.addEventListener("touchstart", audio.play(), false);
      this.setState({ koFlag: 0 })
    }
  }


  jo = () => {
    let wsFn = new WebSocket("wss://socket.tiaozhanmeiyitian.com/socket")
    wsFn.onopen = function () {
      wsFn.send(sessionStorage.getItem('siteuid'))
    }
    let that = this
    wsFn.onmessage = function (e) {
      let message_info = JSON.parse(e.data)
      that.getAudio({ txt: message_info.percent })
      notification.open({ description: message_info.percent, duration: 5 })
      sessionStorage.setItem('kood', 2)
    }
    wsFn.onclose = function () {
      that.jo()
    }
  }


  componentDidMount() {
    sessionStorage.setItem('kood', 1)
    sessionStorage.setItem('loodSo', '0')
    sessionStorage.setItem('sitew', true)
    sessionStorage.setItem('wallet', true)
    this.setState({ minheight: document.body.scrollHeight, path: this.props.history.location.pathname })

    setInterval(() => {
      this.timer()
    }, 1000)
    if (this.props.history.location.search.indexOf('getTheiD') !== -1 && this.props.history.location.search.indexOf('identification') !== -1) {
      let url = this.props.location.search
      this.setState({ at: url.split('&')[1].slice(15, url.split('&')[1].length), sid: url.split('&')[0].slice(10, url.split('&')[0].length) })
      this.getVenueIndexTwo({ at: url.split('&')[1].slice(15, url.split('&')[1].length), sid: url.split('&')[0].slice(10, url.split('&')[0].length) })
      this.gerVenueNameTwo({ at: url.split('&')[1].slice(15, url.split('&')[1].length), sid: url.split('&')[0].slice(10, url.split('&')[0].length) })
      this.setState({ flagHidden: 1 })
      sessionStorage.setItem('path', '1');
    } else {

      setTimeout(() => {
        this.jo()
      }, 1000)
      this.getMobilePhoneBindingVenues()
      this.getVenueIndex()
      this.gerVenueName()
    }

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
    } else if (this.props.history.location.pathname === '/home/command') {
      sessionStorage.setItem('path', '6');
    } else if (this.props.history.location.pathname === '/home/special') {
      sessionStorage.setItem('path', '8');
    } else if (this.props.history.location.pathname === '/home/VipAgement') {
      sessionStorage.setItem('path', '9');
    }

    if (sessionStorage.getItem('islegal') === '0' || sessionStorage.getItem('islegal') === '2') {
      this.props.history.push('/statusAudits')
    }
    if (sessionStorage.getItem('issite') === '0') {
      this.props.history.push('/perfect')
    }
    if (sessionStorage.getItem('isqult') === '0') {
      this.props.history.push('/qualification')
    }
  }




  componentWillReceiveProps() {
    this.setState({ path: this.props.history.location.pathname })
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
    } else if (this.props.history.location.pathname === '/home/command') {
      sessionStorage.setItem('path', '6');
    } else if (this.props.history.location.pathname === '/home/special') {
      sessionStorage.setItem('path', '8');
    } else if (this.props.history.location.pathname === '/home/VipAgement') {
      sessionStorage.setItem('path', '9');
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
    })
  }

  kood = (e) => {
    this.setState({ keyIng: e.key })
    sessionStorage.setItem('path', e.key);
    this.setState({ path: this.props.history.location.pathname })
  }

  async getVenueIndex(data) {
    const res = await getVenueIndex(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (res.data.data.isevaluate === 0) {
        this.VenueEvaluationOfOperation()
      }
      this.setState({
        isevaluate: res.data.data.dataisevaluate,
        getVenueMonth_money: res.data.data.month_money, getVenueToday_money: res.data.data.today_money, getVenueMonth_count: res.data.data.month_count,
        month_member_money: res.data.data.month_member_money, today_member_money: res.data.data.today_member_money,
        getVenueToday_count: res.data.data.today_count, getVenueScore: res.data.data.score
      })
      sessionStorage.setItem('score', res.data.data.score)
    }
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ gerVenueNameName: res.data.data.name, gerVenueNameRate: res.data.data.rate, ishaverecharge: res.data.data.ishaverecharge })
      sessionStorage.setItem('mess', res.data.data.mess)
      sessionStorage.setItem('siteuid', res.data.data.siteuid)
      sessionStorage.setItem('ishaverecharge', res.data.data.ishaverecharge)
      sessionStorage.setItem('siteName', res.data.data.name)

      let linkMan = res.data.data.linkMan.split('|')
      let telephone = res.data.data.telephone.split('|')
      let arr = []
      for (let i in linkMan) {
        let obj = {}
        obj.name = linkMan[i]
        arr.push(obj)
      }
      for (let j in telephone) {
        arr[j].telephone = telephone[j]
      }
      this.setState({ arrPhp: arr })

      this.getsiteTels()


      if (res.data.data.ishaverecharge === 1 || res.data.data.ishaverecharge === 2) {
        this.props.history.push({ pathname: '/home/myWallet', query: { time: 2 } })
        sessionStorage.setItem('incomtime', 2)
      }
    }
  }

  async getsiteTels(data) {
    const res = await getsiteTels(data, sessionStorage.getItem('venue_token'))
    this.setState({ moName: res.data.data.telephone.split('|') })
  }



  income = () => {
    this.props.history.push({ pathname: '/home/myWallet', query: { time: 1 } })
    sessionStorage.setItem('incomtime', 1)
  }
  daysIncome = () => {
    this.props.history.push({ pathname: '/home/myWallet', query: { time: 2 } })
    sessionStorage.setItem('incomtime', 2)
  }
  mounthOrder = () => {
    this.props.history.push({ pathname: '/home/information', query: { time: 1 } })
    sessionStorage.setItem('iconmInfor', 1)
  }
  mounthOrderTwo = () => {
    this.props.history.push({ pathname: '/home/information', query: { time: 2 } })
    sessionStorage.setItem('iconmInfor', 2)
  }
  news = () => {
    this.gerVenueName()
    this.props.history.push("/home/news")
  }
  sitew = () => {
    sessionStorage.setItem('sitew', false)
  }
  wallet = () => {
    sessionStorage.setItem('wallet', false)
    sessionStorage.setItem('incomtime', null)
    this.props.history.push('/home/myWallet')
  }

  rate = (e) => {
    this.setState({ rate: e, SelabelTwo: this.state.Selabel[e - 1], labelId: [] })
  }
  select = (e) => {
    if (this.state.labelId.indexOf(Number(e.currentTarget.dataset.id)) !== -1) {
      let pop = this.state.labelId
      pop.splice(this.state.labelId.indexOf(Number(e.currentTarget.dataset.id)), 1);
      this.setState({ labelId: pop })
    } else {
      this.setState({ labelId: [...this.state.labelId, Number(e.currentTarget.dataset.id)] })
    }
  }

  async VenueEvaluationSave(data) {
    const res = await VenueEvaluationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (data.star !== '') {
        message.success('提交成功')
      }
      this.setState({ isModalVisible: false })
    } else {
      message.warning(res.data.msg)
    }
  }

  handleOk = () => {
    this.VenueEvaluationSave({ star: this.state.rate, label: this.state.labelId.join(',') })
  }
  handleCancel = () => {
    this.VenueEvaluationSave({ star: '', label: '' })
  }


  async login(data) {
    const res = await _login(data)
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      sessionStorage.setItem('uuid', res.data.data.uuid);
      sessionStorage.setItem('name', res.data.data.name);
      sessionStorage.setItem('islegal', res.data.data.islegal);
      sessionStorage.setItem('venue_token', res.data.data.venue_token);
      sessionStorage.setItem('issite', res.data.data.issite);
      sessionStorage.setItem('isqult', res.data.data.isqult);
      sessionStorage.setItem('ismethod', res.data.data.ismethod);
      sessionStorage.setItem('issecondaudit', res.data.data.issecondaudit);
      sessionStorage.setItem('legalphone', res.data.data.legalphone);
      sessionStorage.setItem('phone', res.data.data.phone);
      localStorage.setItem('nickName', res.data.data.name)
      sessionStorage.removeItem('qualifData')
      sessionStorage.setItem('headerData', 1)
      window.location.reload()
    }
  }

  selectEd = e => {
    if (this.state.selectEd.length !== 1) {
      let data = {
        username: this.state.phone, usercode: '', userpass: '', type: 5, Logintype: 'pc', venueloginuuid: e
      }
      this.login(data)
    }
  }
  VipAgement = () => {
    this.props.history.push("/home/VipAgement")
  }

  async getsiteTel(data) {
    const res = await getsiteTel(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success('编辑成功')
      this.getsiteTels()
    } else {
      message.warning(res.data.msg)
    }
  }

  handleChange = (e, v) => {
    this.setState({ moName: e })
    let arrt = []
    let arrg = []
    for (let i in v) {
      arrt.push(v[i].children)
      arrg.push(v[i].value)
    }
  this.getsiteTel({sitetel:arrg.join('|'),sitename:arrt.join('|')})
  }





  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={170} className="sider">
          <div className="logo" >
            <Link to="/home">
              <img style={{ height: 40, margin: '0 auto', marginTop: 8, display: 'block', cursor: 'pointer' }}
                src={require("../../assets/tiaozhanicon.png")} alt="logo" />
            </Link>
          </div>
          <Menu theme="dark" selectedKeys={[sessionStorage.getItem('path')]} onSelect={this.kood} style={this.state.flagHidden === 0 ? { marginTop: '-5px' } : { display: 'none' }}>
            <Menu.Item key="1">
              <Link to="/home">
                <i className="anticon anticon-gift">
                  <svg t="1591090181546" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="12894" width="1.5em" height="1.5em"><path d="M512 64 0 512l128 0 0 448 768 0L896 512l128 0L512 64zM633.984 929.984 384 929.984 384 720l249.984 0L633.984 929.984zM864 480l0 449.984-200 0 0-238.016L352 691.968l0 238.016-192 0L160 480 81.984 480 512 108.032 947.968 480 864 480z" p-id="12895"></path></svg>
                </i>
                <span>首</span>
                <span style={{ paddingLeft: 35 }}>页</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/home/preferential">
                <i className="anticon anticon-gift">
                  <svg t="1591082920625" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="10414" width="1.5em" height="1.5em"><path d="M490.3 241.7c-1.3-12-11.5-21.4-23.4-21.4h-245c-11.4 0-21.4 8.4-23.4 19.6L98.1 817.3c-0.9 6.3 0.7 12.9 4.5 18 3.7 5 9.1 8.2 15.9 9.2l402.5 0.4c13.2 0 23.9-10.7 23.9-23.9 0-3-0.5-5.5-1.7-8.3l-52.9-571z m4 555.9H149.8L242 267.3h203l49.3 530.3z m364-284.5c12.9 0 23.4-10.5 23.4-23.4 0-1.6 0-3.7-0.8-5.7l-53.5-245c-2.6-11-12.2-18.8-23.2-18.8h-241c-6 0-11.7 2.3-16.9 6.9-4.5 4.6-6.9 10.4-6.9 16.9 0 1.1 0 3 0.7 4.8l35.1 243.8 0.2 1.9c2.5 10.8 12.1 18.3 23.3 18.3h259.6v0.3z m-239.4-47.2l-27.1-198.2h193.8l43.1 198.2H618.9z m328.7 351.7c-0.2-0.7-0.3-1.3-0.4-1.9l-53.6-245.2c-2.6-11.1-12.2-18.8-23.3-18.8H610.5c-12.7 0-23.2 10.1-23.9 23.4 0 1.6 0 3.4 0.6 4.6l35.2 244.5 0.2 1.9c2.6 10.9 12.3 18.8 23.3 18.8h277.6c12.4 0 22.7-9.6 23.8-22.2l1.3-0.3-1-4.8z m-52.7-20H666.2L639 599.4h212.3l43.6 198.2z" fill="" p-id="10415"></path></svg>
                </i>
                <span>场地占用</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/home/appointmentList">
                <i className="anticon anticon-gift">
                  <svg t="1571136412563" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" p-id="1831" width="1.5em" height="1.5em"><path d="M827 869.6H196.7c-44-0.1-79.6-35.7-79.6-79.6V438.6h789.5V790c0 43.9-35.7 79.6-79.6 79.6zM196.7 223.4h87.7v53.5c0 11 8.9 19.9 19.9 19.9 11 0 19.9-8.9 19.9-19.9v-53.5h367.5v53.5c0 11 8.9 19.9 19.9 19.9 11 0 19.9-8.9 19.9-19.9v-53.5H827c44 0.1 79.6 35.7 79.6 79.6v95.8H117.1V303c0-44 35.6-79.6 79.6-79.6zM827 170.3h-95.5v-50.6c0-11-8.9-19.9-19.9-19.9-11 0-19.9 8.9-19.9 19.9v50.6H324.2v-50.6c0-11-8.9-19.9-19.9-19.9-11 0-19.9 8.9-19.9 19.9v50.6h-87.7C123.4 170.4 64.1 229.7 64 303v487c0.1 73.3 59.4 132.6 132.7 132.7H827c73.3-0.1 132.6-59.4 132.7-132.7V303c-0.1-73.3-59.5-132.6-132.7-132.7z" p-id="2590"></path><path d="M657.6 529.4l-183.1 183-99.1-99.1c-9.2-9.2-24.2-9.2-33.4 0s-9.2 24.2 0 33.4l115.9 115.9c9.2 9.2 24.2 9.2 33.4 0L691 562.9c9.2-9.2 9.2-24.2 0-33.4-9.2-9.3-24.2-9.3-33.4-0.1z" p-id="2591"></path></svg>
                </i>
                <span>活动列表</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/home/siteSettings">
                <i className="anticon anticon-gift">
                  <svg viewBox="0 0 22 18" fill="currentColor" width="1.5em" height="1.5em" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M13.235761,18.3071554 C12.7321306,18.5032287 12.2115159,18.6525123 11.68051,18.7531155 L11.5809402,18.772749 C11.2486959,18.8310054 10.9134779,18.8708008 10.5768287,18.8919522 L10.5768287,14.0466932 C10.9524793,13.998349 11.3196421,13.8982995 11.6678884,13.7493865 L11.7155697,13.7283506 C11.8046714,13.6878801 11.8925909,13.6448556 11.9792191,13.5993307 L12.0998247,13.5362231 L12.1545179,13.5067729 L12.1545179,13.5025657 L12.2106135,13.4703108 C12.2414661,13.4506773 12.2709163,13.4338486 12.2989641,13.4128127 C12.4768906,13.2926132 12.5560349,13.0707146 12.4943348,12.8650478 C12.4326348,12.6593809 12.2444141,12.5176918 12.0297052,12.5152829 C11.9953273,12.5161633 11.9610833,12.5199161 11.9273307,12.526502 C11.8919303,12.5356444 11.8572456,12.5473622 11.8235538,12.5615618 L11.8137371,12.5671713 L11.7828845,12.5741833 L11.7450199,12.6078406 L11.7366056,12.6120478 C11.5955467,12.7037214 11.4473517,12.7839156 11.2934502,12.8518566 L11.2401594,12.87149 C11.0281923,12.9580197 10.8070593,13.0201251 10.5810359,13.0566056 L10.5810359,7.06278884 C10.7930737,7.09659212 11.0005654,7.15446396 11.19949,7.23528287 L11.2191235,7.24229482 C11.9308778,7.53329654 12.5084598,8.0793741 12.8388845,8.77370518 C12.8491713,8.79132041 12.8571822,8.81016939 12.8627251,8.8298008 L12.8683347,8.83961753 C12.9468685,9.01912351 13.0113785,9.20984861 13.0520478,9.40057371 L13.0548526,9.41740239 C13.1129117,9.68034081 13.3719669,9.84741267 13.6354422,9.79184064 C13.8990475,9.73379835 14.0663229,9.47380107 14.0098805,9.20984861 C14.0013882,9.17698876 13.9943693,9.14376569 13.9888446,9.11027888 L13.9720159,9.04857371 L13.9776255,9.04576892 L13.9145179,8.85364143 C13.8711362,8.71443405 13.8201051,8.57772685 13.7616574,8.44414343 L13.7560478,8.43011952 L13.728,8.36981673 C13.5826771,8.05351355 13.3954104,7.75822654 13.171251,7.49192032 L13.1474104,7.46387251 L13.1249721,7.43862948 C12.6847043,6.92816518 12.1220759,6.53779953 11.4897849,6.30409562 L11.4701514,6.29708367 L11.4210677,6.27885259 C11.1501674,6.18245712 10.8693528,6.11660444 10.5838406,6.08251793 L10.5838406,1.2316494 C12.0513299,1.32091015 13.473544,1.77393665 14.7222948,2.54989641 C14.7391235,2.55971315 14.751745,2.56952988 14.7685737,2.57654183 L14.8723506,2.64245418 L14.9705179,2.70556175 C14.9873466,2.71818327 14.9999681,2.728 15.0196016,2.73921912 C16.199112,3.54279434 17.1674803,4.61891949 17.8426135,5.87636653 L15.3631873,5.87636653 L15.3631873,9.29539442 C15.377815,9.58175894 15.6142661,9.80644017 15.901004,9.80644017 C16.1877419,9.80644017 16.424193,9.58175894 16.4388207,9.29539442 L16.4388207,6.94919522 L18.3348526,6.94919522 C18.4985251,7.37924619 18.6265737,7.82202231 18.7177052,8.27305179 L18.7177052,8.27725896 C18.8341036,8.85364143 18.8972112,9.4454502 18.8972112,10.0596972 C18.8972112,10.3920637 19.1650677,10.6585179 19.4974343,10.6585179 C19.8298008,10.6585179 20.0976574,10.3920637 20.0976574,10.0596972 C20.0976574,9.75117131 20.0808287,9.44404781 20.0555857,9.13832669 L20.056988,9.1369243 C20.023375,8.77007983 19.9695348,8.40537082 19.8957131,8.04446215 C19.8929084,8.03464542 19.8901036,8.02763347 19.8901036,8.02062151 L19.852239,7.8467251 C19.6619139,6.99753576 19.3606158,6.17709966 18.9561116,5.40656574 C18.9392829,5.37711554 18.9280637,5.34906773 18.9126375,5.32101992 L18.8719681,5.24809562 C18.0660661,3.76647868 16.8986248,2.51268532 15.4781833,1.60328287 C15.4613546,1.59346614 15.4487331,1.58224701 15.4319044,1.57523506 L15.3225179,1.50651793 C14.2592925,0.852990118 13.0836959,0.403105652 11.8558088,0.179856574 L11.8193466,0.172844622 C10.6460366,-0.0386752075 9.4442729,-0.0377251967 8.2712988,0.175649402 C8.20959363,0.186868526 8.14788845,0.196685259 8.08618327,0.210709163 C6.99090113,0.429343731 5.93968364,0.828882209 4.97568127,1.3929243 L4.88031873,1.44901992 C3.69520964,2.15728073 2.66995469,3.10374338 1.86938645,4.22855777 L1.82170518,4.29587251 L1.77542629,4.36458964 C0.938814006,5.5736233 0.380377678,6.95295146 0.140239044,8.4034741 L0.133227092,8.45115538 L0.112191235,8.57176096 C-0.0385303837,9.57459043 -0.0366391215,10.5944536 0.117800797,11.5967171 C0.12761753,11.6598247 0.140239044,11.7173227 0.147250996,11.7804303 C0.357609562,13.0019124 0.789545817,14.1490677 1.39818327,15.1798247 C1.40098805,15.1854343 1.40239044,15.1896414 1.408,15.1938486 L1.47952191,15.3144542 C1.5103745,15.367745 1.54262948,15.4168287 1.57628685,15.4687171 L1.58610359,15.4841434 C2.27872881,16.5653432 3.17229942,17.5036637 4.21839044,18.248255 C4.23521912,18.2608765 4.24643825,18.2706932 4.26326693,18.2791076 L4.36984861,18.3548367 C5.48895618,19.1205418 6.76793625,19.6688765 8.14648606,19.9325259 L8.19416733,19.943745 L8.300749,19.9647809 C9.49278088,20.1751394 10.7338964,20.1723347 11.9651952,19.9339283 L11.9708048,19.9339283 L12.0914104,19.9100876 C12.3312191,19.861004 12.5654183,19.8049084 12.8010199,19.7347888 L12.8010199,19.7333865 C13.0941195,19.649243 13.3858167,19.5496733 13.6747092,19.4388845 C13.8768731,19.3604739 14.0218488,19.1801664 14.0550252,18.965882 C14.0882017,18.7515977 14.0045386,18.5358913 13.8355511,18.4000175 C13.6665636,18.2641437 13.4379249,18.2287448 13.235761,18.3071554 L13.235761,18.3071554 Z M9.50259761,13.0411793 C9.30519086,13.0012391 9.11180629,12.9435054 8.92481275,12.8686853 L8.86591235,12.8434422 C8.86591235,12.8434422 8.83926693,12.8322231 8.83225498,12.8266135 C8.83225498,12.8266135 8.78737849,12.8041753 8.77756175,12.8027729 L8.76914741,12.7999681 L8.75231873,12.7915538 C8.43049651,12.6358302 8.13930594,12.4234939 7.89265339,12.1646853 L7.88283665,12.1548685 C7.63383369,11.8931655 7.43258901,11.5898746 7.28822311,11.258741 L7.28541833,11.2545339 L7.26438247,11.1998406 C7.24871395,11.1594359 7.23375283,11.1187603 7.21950598,11.0778327 C7.12559209,10.815084 7.06986358,10.5402196 7.0540239,10.2616414 C7.02341772,9.79562194 7.10018268,9.32879507 7.27840637,8.89711554 L7.28261355,8.8872988 L7.3036494,8.83821514 L7.31627092,8.81156972 L7.33029482,8.78071713 L7.35133068,8.73724303 L7.35553785,8.7260239 C7.5924436,8.23534187 7.95846679,7.81841479 8.41434263,7.51996813 C8.56299602,7.42039841 8.72146614,7.33485259 8.88554582,7.26333068 L8.89396016,7.25912351 L8.94444622,7.23808765 C8.95847012,7.23388048 8.96828685,7.22686853 8.98231076,7.22125896 L9.00334661,7.21144223 C9.14639044,7.156749 9.29223904,7.11187251 9.43949004,7.08101992 L9.50820717,7.06699602 L9.50259761,13.0411793 L9.50259761,13.0411793 Z M3.63920319,13.1687968 L1.76280478,13.1687968 C1.58874988,12.7089164 1.45410312,12.2350724 1.36031873,11.7523825 L1.35470916,11.7299442 L1.32385657,11.5644622 L1.3056255,11.4606853 L1.29160159,11.3779442 C1.07079674,9.88629823 1.2319547,8.36301777 1.76,6.95059761 L3.63920319,6.95059761 L3.63920319,13.1687968 L3.63920319,13.1687968 Z M5.01354582,17.3381036 L4.96586454,17.3058486 C4.9322514,17.2826028 4.8990562,17.2587583 4.86629482,17.2343267 L4.76952988,17.1656096 C4.7527012,17.152988 4.73867729,17.1403665 4.71904382,17.1305498 L4.57740239,17.0239681 L4.57459761,17.0239681 C3.7942441,16.4112808 3.12248099,15.671725 2.58741036,14.836239 C2.55936255,14.7913625 2.52850996,14.7450837 2.50186454,14.6988048 L2.48082869,14.6679522 C2.39645482,14.5298134 2.31647845,14.3890363 2.24101992,14.2458327 L4.70501992,14.2458327 L4.70501992,5.87636653 L3.63219124,5.87636653 L3.63219124,5.87776892 L2.24662948,5.87776892 C2.4050996,5.58186454 2.58039841,5.29297211 2.7725259,5.01810359 L2.7865498,4.99706773 C2.81459761,4.95499602 2.84825498,4.91152191 2.87630279,4.87225498 C2.89453386,4.84981673 2.90855777,4.82457371 2.92819124,4.80353785 C2.94642231,4.77969721 2.96605578,4.75305179 2.98568924,4.73061355 L3.07544223,4.61421514 L3.09647809,4.58756972 C4.07557924,3.34332438 5.37199422,2.38603141 6.8492749,1.81644622 C7.33475816,1.62773496 7.83595512,1.48225644 8.34702789,1.38170518 C8.35684462,1.38030279 8.36525896,1.37749801 8.3750757,1.37749801 C8.42696414,1.36908367 8.48025498,1.35646215 8.53214343,1.3494502 L8.64994422,1.32841434 L8.71866135,1.31719522 C8.9767012,1.27933068 9.23754582,1.25128287 9.50259761,1.23445418 L9.50259761,6.08952988 C9.17461088,6.13481279 8.85399322,6.22298264 8.54897211,6.35177689 L8.54055777,6.35458167 C8.085805,6.54463947 7.66950342,6.81599587 7.31206375,7.15534661 C6.91765339,7.52899254 6.60406876,7.97956163 6.39069323,8.47920319 L6.36685259,8.54090837 C6.14246461,9.08316927 6.04139327,9.66852082 6.07094821,10.2546295 L6.07515538,10.324749 C6.1018008,10.7286375 6.18594422,11.1241116 6.33319522,11.4985498 L6.33459761,11.5055618 L6.36124303,11.5728765 C6.54635857,12.0244462 6.80720319,12.436749 7.14097211,12.7943586 L7.14938645,12.8041753 L7.18444622,12.8392351 C7.20267729,12.8574661 7.2167012,12.8742948 7.23633466,12.8911235 L7.24054183,12.8953307 C7.61966846,13.277374 8.07244441,13.5784295 8.57141036,13.780239 C8.87146657,13.9022062 9.1850188,13.9878917 9.50540239,14.0354741 L9.50540239,18.8919522 C7.89550679,18.7879661 6.34357896,18.2511144 5.01354582,17.3381036 L5.01354582,17.3381036 Z" id="Shape"></path>
                    <path d="M20.8787888,15.0395857 L21.9852749,14.3411952 L21.5673625,13.3314741 L20.2967968,13.6245737 C20.1113785,13.3684863 19.8881987,13.1419967 19.6348685,12.9528287 L19.9265657,11.6808606 L18.9266614,11.265753 L18.23949,12.372239 C17.9309052,12.3276584 17.6177588,12.3243572 17.3083028,12.3624223 L16.6281434,11.2559363 L15.6170199,11.6640319 L15.8904861,12.936 C15.6367118,13.1235939 15.4105821,13.3459468 15.218741,13.5965259 L13.9607968,13.295012 L13.5428845,14.2963187 L14.6297371,14.9947092 C14.5820598,15.3065654 14.5820598,15.6238569 14.6297371,15.9357131 L13.523251,16.6144701 L13.9299442,17.6255936 L15.2033147,17.3437131 C15.3870279,17.5961434 15.610008,17.8205259 15.8638406,18.004239 L15.5623267,19.2776096 L16.5622311,19.6941195 L17.2718406,18.5974502 C17.5817689,18.6451315 17.9015139,18.6451315 18.2030279,18.5974502 L18.9014183,19.7025339 L19.9111394,19.2860239 L19.6194422,18.0140558 C19.8746773,17.8289402 20.0864382,17.6157769 20.2813705,17.3521275 L21.5631554,17.6452271 L21.9810677,16.6453227 L20.8633625,15.9455299 C20.9264701,15.6636494 20.9264701,15.3495139 20.8787888,15.0395857 L20.8787888,15.0395857 Z M19.323548,15.4981673 C19.323548,16.3634422 18.6251474,17.0590304 17.7626773,17.0590304 C17.348483,17.0597742 16.9510382,16.8955665 16.6581582,16.6026864 C16.3652781,16.3098064 16.2010704,15.9123616 16.2018142,15.4981673 C16.2018142,14.6328924 16.9002072,13.9372966 17.7626773,13.9372966 C18.1771005,13.9358093 18.5749822,14.0997757 18.8680255,14.3928191 C19.1610689,14.6858625 19.3250353,15.0837441 19.323548,15.4981673 Z" id="Shape"></path>
                  </svg>
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

            <Menu.Item key="7" onClick={this.wallet}>
              <Link to="/home/myWallet">
                <i className="anticon anticon-gift" >
                  <svg width="1.3em" height="1.3em" viewBox="0 0 22 22" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <path d="M19.4056638,0.00192437358 L2.59433622,0.00192437358 C1.15233895,0.00192437358 0.0233731207,1.03852027 0.0233731207,2.36248929 L0.0233731207,19.2815818 C0.0233731207,20.6055508 1.15233895,21.6421467 2.59433622,21.6421467 L19.4107954,21.6421467 C20.8527927,21.6421467 21.9817585,20.6055508 21.9817585,19.2815818 L21.9817585,2.31117267 C21.9766269,1.01799362 20.847661,0.00192437358 19.4056638,0.00192437358 Z M20.2934415,19.2251335 C20.2934415,19.6356665 19.8469868,19.8460647 19.4107954,19.8460647 L2.59433622,19.8460647 C2.10682825,19.8460647 1.71169021,19.5432966 1.71169021,19.1738169 L1.71169021,4.96424237 C3.784882,6.51400456 7.45402096,7.54033713 11,7.54033713 C14.4279508,7.54033713 18.1740647,6.48834624 20.2934415,4.95397904 L20.2934415,19.2251335 Z M20.2934415,2.36248929 C20.2934415,3.40421686 16.3677194,5.85715171 11,5.85715171 C5.63228064,5.85715171 1.70655854,3.40934852 1.70655854,2.36248929 L1.70655854,2.31117267 C1.70655854,1.94169294 2.10169658,1.63892483 2.58920456,1.63892483 L19.4056638,1.63892483 C19.8931718,1.63892483 20.2883098,1.94169294 20.2883098,2.31117267 L20.2883098,2.36248929 L20.2934415,2.36248929 Z" id="Shape"></path>
                    <polygon id="Shape" points="8.08521549 9.97274533 9.88129749 11.8150123 7.94152893 11.8150123 7.94152893 13.5033294 10.1789339 13.5033294 10.1789339 14.421897 7.78757904 14.421897 7.78757904 16.1102141 10.1789339 16.1102141 10.1789339 18.3989358 11.867251 18.3989358 11.867251 16.1102141 14.2586059 16.1102141 14.2586059 14.421897 11.867251 14.421897 11.867251 13.5033294 14.1559727 13.5033294 14.1559727 11.8150123 12.1700191 11.8150123 14.0174178 9.96761367 12.8063453 8.81812118 11.0513166 10.5731499 9.23983964 8.81812118"></polygon>
                  </svg>
                </i>
                <span>场馆收入<span style={sessionStorage.getItem('ishaverecharge') === '1' || sessionStorage.getItem('ishaverecharge') === '2' ? { display: 'block', width: '10px', height: '10px', float: 'right', marginTop: '10px', borderRadius: '50%', background: 'red' } : { display: 'none' }}></span></span>
              </Link>
            </Menu.Item>


            <Menu.Item key="5">
              <Link to={{ pathname: '/home/stadiums', query: { name: 'sunny' } }}>
                <i className="anticon anticon-gift" >
                  <svg t="1590992204729" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="10447" width="1.5em" height="1.5em"><path d="M744.448 526.336c57.344-34.816 94.208-99.328 94.208-177.152 0-112.64-92.16-204.8-204.8-204.8-37.888 0-74.752 10.24-107.52 30.72-36.864-27.648-82.944-45.056-133.12-45.056-122.88 0-222.208 99.328-222.208 222.208 0 86.016 49.152 160.768 120.832 197.632-136.192 45.056-233.472 174.08-233.472 324.608 0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48c0-159.744 124.928-290.816 281.6-300.032h12.288c6.144 0 11.264 0 17.408-1.024 160.768 5.12 290.816 138.24 290.816 301.056 0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48c0-153.6-102.4-284.672-242.688-327.68 68.608-37.888 115.712-110.592 115.712-194.56 0-57.344-21.504-109.568-57.344-148.48 23.552-12.288 49.152-18.432 75.776-18.432 90.112 0 163.84 73.728 163.84 163.84 0 86.016-56.32 152.576-134.144 162.816h-17.408c-5.12 0-9.216 2.048-12.288 4.096-6.144 3.072-11.264 10.24-11.264 18.432 0 11.264 9.216 20.48 20.48 20.48 7.168 0 15.36 0 22.528-1.024 146.432 10.24 259.072 132.096 259.072 286.72 0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48c0-150.528-92.16-273.408-221.184-314.368z m-335.872 6.144h-26.624c-95.232-5.12-169.984-83.968-169.984-180.224 0-100.352 80.896-181.248 181.248-181.248s181.248 80.896 181.248 181.248c0 94.208-72.704 172.032-165.888 180.224z" p-id="10448"></path></svg>
                </i>
                <span>场馆信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="9" onClick={this.VipAgement}>
              <Link to="/home/myWallet">
                <i>
                  <svg width="1.3em" height="1.3em" style={{ marginRight: '0.6em' }} viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" >
                    <title>icon/pc/菜单/会员管理</title>
                    <path d="M5.19852941,5.66636029 C5.19852941,3.43106618 7.08088235,1.54871324 9.31617647,1.54871324 C11.5514706,1.54871324 13.4338235,3.43106618 13.4338235,5.66636029 C13.4338235,7.90165441 11.5514706,9.78400735 9.31617647,9.78400735 C7.08088235,9.66636029 5.19852941,7.90165441 5.19852941,5.66636029 Z M2.61029412,20.1369485 C2.25735294,20.1369485 2.02205882,20.0193015 1.78676471,19.7840074 C1.55147059,19.5487132 1.43382353,19.1957721 1.43382353,18.9604779 C1.43382353,14.8428309 4.61029412,11.4310662 8.61029412,11.078125 L9.43382353,11.078125 C10.375,10.9604779 11.6691176,10.7251838 12.375,10.1369485 L12.7279412,9.90165441 C14.0220588,8.84283088 14.8455882,7.31341912 14.8455882,5.54871324 C14.8455882,2.48988971 12.375,0.0193014706 9.31617647,0.0193014706 C6.25735294,0.136948529 3.78676471,2.60753676 3.78676471,5.66636029 C3.78676471,7.31341912 4.61029412,8.96047794 5.90441176,10.0193015 L6.25735294,10.2545956 L5.90441176,10.3722426 C2.375,11.7840074 0.0220588235,15.1957721 0.0220588235,18.9604779 C0.0220588235,19.6663603 0.257352941,20.3722426 0.727941176,20.8428309 C1.19852941,21.3134191 1.90441176,21.5487132 2.61029412,21.5487132 L9.66911765,21.5487132 C9.90441176,21.5487132 10.2573529,21.3134191 10.2573529,20.8428309 C10.2573529,20.2545956 9.90441176,20.1369485 9.66911765,20.1369485 L2.61029412,20.1369485 Z M20.375,17.078125 C19.1985294,17.1957721 18.375,18.1369485 18.375,19.4310662 C18.375,19.6663603 18.4926471,20.0193015 18.4926471,20.1369485 L17.4338235,20.7251838 L17.0808824,20.3722426 C16.6102941,20.0193015 16.2573529,19.9016544 15.7867647,19.9016544 C15.4338235,19.9016544 14.9632353,20.0193015 14.4926471,20.3722426 C14.375,20.4898897 14.1397059,20.6075368 14.1397059,20.7251838 L13.1985294,20.1369485 C13.3161765,20.0193015 13.3161765,19.6663603 13.3161765,19.4310662 C13.3161765,18.2545956 12.4926471,17.3134191 11.3161765,17.078125 C11.3161765,16.9604779 11.1985294,16.6075368 11.1985294,16.2545956 C11.1985294,16.0193015 11.3161765,15.6663603 11.3161765,15.4310662 C12.4926471,15.3134191 13.3161765,14.3722426 13.3161765,13.078125 C13.3161765,12.8428309 13.1985294,12.4898897 13.1985294,12.3722426 L14.2573529,11.7840074 L14.6102941,12.1369485 C15.0808824,12.4898897 15.4338235,12.6075368 15.7867647,12.6075368 C16.1397059,12.6075368 16.6102941,12.4898897 16.9632353,12.1369485 C17.0808824,12.0193015 17.3161765,11.9016544 17.3161765,11.7840074 L18.2573529,12.3722426 C18.1397059,12.4898897 18.1397059,12.8428309 18.1397059,13.078125 C18.1397059,14.2545956 18.9632353,15.1957721 20.1397059,15.4310662 C20.1397059,15.5487132 20.2573529,15.9016544 20.2573529,16.2545956 C20.4926471,16.6075368 20.375,16.8428309 20.375,17.078125 Z M21.4338235,15.1957721 C21.4338235,14.7251838 21.0808824,14.4898897 20.8455882,14.4898897 L20.7279412,14.4898897 C20.0220588,14.4898897 19.5514706,13.9016544 19.5514706,13.3134191 C19.5514706,13.1957721 19.6691176,12.9604779 19.6691176,12.8428309 C19.7867647,12.4898897 19.6691176,12.0193015 19.3161765,11.7840074 L17.9044118,10.9604779 L17.5514706,10.9604779 C17.3161765,10.9604779 16.9632353,11.078125 16.8455882,11.3134191 C16.7279412,11.4310662 16.2573529,11.9016544 15.9044118,11.9016544 C15.5514706,11.9016544 15.0808824,11.5487132 14.8455882,11.3134191 C14.7279412,11.1957721 14.4926471,10.9604779 14.1397059,10.9604779 C14.0220588,10.9604779 13.9044118,10.9604779 13.7867647,11.078125 L12.375,11.9016544 C12.0220588,12.1369485 11.9044118,12.6075368 12.0220588,12.9604779 C12.0220588,12.9604779 12.1397059,13.1957721 12.1397059,13.4310662 C12.1397059,13.7840074 12.0220588,14.0193015 11.7867647,14.2545956 C11.5514706,14.4898897 11.1985294,14.6075368 10.9632353,14.6075368 L10.8455882,14.6075368 C10.4926471,14.6075368 10.2573529,14.9604779 10.1397059,15.3134191 C10.1397059,15.4310662 10.0220588,15.9016544 10.0220588,16.4898897 C10.0220588,16.9604779 10.1397059,17.5487132 10.1397059,17.6663603 C10.2573529,18.0193015 10.4926471,18.3722426 10.8455882,18.3722426 L10.9632353,18.3722426 C11.6691176,18.3722426 12.1397059,18.9604779 12.1397059,19.5487132 C12.1397059,19.6663603 12.0220588,19.9016544 12.0220588,20.0193015 C11.9044118,20.3722426 12.0220588,20.8428309 12.375,21.078125 L13.7867647,21.9016544 C13.9044118,21.7840074 14.0220588,21.7840074 14.1397059,21.7840074 C14.375,21.7840074 14.7279412,21.6663603 14.8455882,21.4310662 C14.9632353,21.3134191 15.4338235,20.8428309 15.7867647,20.8428309 C16.1397059,20.8428309 16.6102941,21.1957721 16.7279412,21.4310662 C16.8455882,21.5487132 17.0808824,21.7840074 17.4338235,21.7840074 C17.5514706,21.7840074 17.6691176,21.7840074 17.7867647,21.6663603 L19.1985294,20.8428309 C19.5514706,20.6075368 19.6691176,20.1369485 19.5514706,19.7840074 C19.5514706,19.7840074 19.4338235,19.5487132 19.4338235,19.3134191 C19.4338235,18.6075368 20.0220588,18.1369485 20.6102941,18.1369485 L20.7279412,18.1369485 C21.0808824,18.1369485 21.3161765,17.7840074 21.4338235,17.4310662 C21.4338235,17.4310662 21.5514706,16.8428309 21.5514706,16.2545956 C21.5514706,15.9016544 21.4338235,15.1957721 21.4338235,15.1957721 L21.4338235,15.1957721 Z M15.9044118,17.3134191 C15.3161765,17.3134191 14.8455882,16.8428309 14.8455882,16.2545956 C14.8455882,15.6663603 15.3161765,15.1957721 15.9044118,15.1957721 C16.4926471,15.1957721 16.8455882,15.6663603 16.8455882,16.2545956 C16.8455882,16.8428309 16.375,17.3134191 15.9044118,17.3134191 Z M16.2573529,14.2545956 C14.8455882,13.9016544 13.4338235,15.1957721 13.7867647,16.8428309 C13.9044118,17.6663603 14.6102941,18.3722426 15.4338235,18.4898897 C16.9632353,18.8428309 18.2573529,17.5487132 17.9044118,16.0193015 C17.7867647,15.078125 17.0808824,14.3722426 16.2573529,14.2545956 L16.2573529,14.2545956 Z" id="形状" fill="#FFFFFF"></path>
                  </svg>
                </i>
                <span>会员管理</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="6" onClick={this.sitew}>
              <Link to="/home/systemSettings">
                <i className="anticon anticon-gift" >
                  <svg t="1590992057163" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="8504" width="1.5em" height="1.5em"><path d="M528.2 633.6c-69.9 0-126.7-56.9-126.7-126.7 0-69.9 56.9-126.7 126.7-126.7S655 436.9 655 506.8c0 69.9-56.9 126.8-126.8 126.8z m0-187.6c-33.6 0-60.9 27.3-60.9 60.9s27.3 60.9 60.9 60.9c33.6 0 60.9-27.3 60.9-60.9S561.8 446 528.2 446z" p-id="8505"></path><path d="M385.5 880.1c-4.3 0-8.7-0.8-12.8-2.6-31-13-60.5-30.1-87.8-50.9-9.2-7-14.1-18.3-12.8-29.8l15.8-145.4c0.4-3.8-1.5-7.2-5-8.6-0.1 0-0.2-0.1-0.2-0.1l-133.6-58.9c-10.5-4.6-17.9-14.5-19.4-25.9-2.1-16.5-3.2-33.6-3.2-51 0-17.2 1.1-33.9 3.2-50.9 1.5-11.5 8.8-21.3 19.4-26l133.4-58.8c3.8-1.7 5.8-5.2 5.4-9.1l-15.8-145.4c-1.2-11.5 3.6-22.8 12.8-29.8 27.3-20.7 56.8-37.8 87.8-50.9 10.7-4.5 22.9-3 32.2 3.8L523 226.5c3.2 2.4 7.2 2.4 10.4 0L651.5 140c9.3-6.8 21.6-8.3 32.2-3.8 31 13 60.5 30.1 87.8 50.9 9.2 7 14.1 18.3 12.8 29.8l-15.8 145.4c-0.4 3.9 1.6 7.4 5.4 9.1l133.4 58.8c10.6 4.7 17.9 14.5 19.4 26 2.2 17 3.2 33.6 3.2 50.9 0 17.4-1.1 34.5-3.2 51-1.5 11.4-8.8 21.2-19.4 25.9l-133.6 58.9c-0.1 0-0.2 0.1-0.2 0.1-3.4 1.5-5.4 4.9-5 8.6L784.3 797c1.2 11.5-3.6 22.8-12.8 29.8-27.3 20.7-56.8 37.8-87.8 50.9-10.7 4.5-22.9 3-32.2-3.8l-117.8-86.3c-3.3-2.3-7.6-2.3-10.9 0L405 873.9c-5.8 4-12.6 6.2-19.5 6.2z m-45.8-95.2c13.4 9.1 27.4 17.3 41.8 24.3L484.1 734c0.1-0.1 0.2-0.2 0.4-0.3 26.2-18.6 61.3-18.6 87.5 0 0.1 0.1 0.3 0.2 0.4 0.3L675 809.1c14.4-7 28.4-15.2 41.8-24.3l-13.7-126.3c-3.6-32.6 14.2-63.2 44.2-76.2l115.9-51.1c0.6-8 0.9-16.1 0.9-24.3s-0.3-16.3-0.9-24.3l-116-51.1c-0.1 0-0.2-0.1-0.3-0.1-29.8-13.4-47.4-44.1-43.9-76.4l13.7-126.3c-13.4-9.1-27.4-17.3-41.8-24.3l-102.6 75.1c-13.2 9.7-28.7 14.5-44.1 14.5-15.5 0-30.9-4.8-44.2-14.5l-102.6-75.1c-14.4 7-28.4 15.2-41.8 24.3L353.3 355c3.5 32.2-14.1 62.9-43.9 76.3-0.1 0-0.2 0.1-0.3 0.1l-116 51.1c-0.6 8-0.9 16.1-0.9 24.3s0.3 16.3 0.9 24.3L309 582.2c30 13 47.8 43.6 44.2 76.2l-13.5 126.5zM894 553.7z" p-id="8506"></path></svg>
                </i>
                <span>系统设置</span>
              </Link>
            </Menu.Item>



          </Menu>

          <Menu theme="dark" selectedKeys={[sessionStorage.getItem('path')]} onSelect={this.kood} style={this.state.flagHidden === 1 ? { marginTop: '-5px' } : { display: 'none' }}>
            <Menu.Item key="1">
              <Link to={'/home/insideView?getTheiD=' + this.state.sid + '&identification=' + this.state.at}>
                <i className="anticon anticon-gift">
                  <svg t="1591090181546" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="12894" width="1.5em" height="1.5em"><path d="M512 64 0 512l128 0 0 448 768 0L896 512l128 0L512 64zM633.984 929.984 384 929.984 384 720l249.984 0L633.984 929.984zM864 480l0 449.984-200 0 0-238.016L352 691.968l0 238.016-192 0L160 480 81.984 480 512 108.032 947.968 480 864 480z" p-id="12895"></path></svg>
                </i>
                <span>价格设置</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="21">
              <Link to={'/home/Koloko?getTheiD=' + this.state.sid + '&identification=' + this.state.at}>
                <i className="anticon anticon-gift">
                  <svg t="1591090181546" className="icon" viewBox="64 64 896 896" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="12894" width="1.5em" height="1.5em"><path d="M512 64 0 512l128 0 0 448 768 0L896 512l128 0L512 64zM633.984 929.984 384 929.984 384 720l249.984 0L633.984 929.984zM864 480l0 449.984-200 0 0-238.016L352 691.968l0 238.016-192 0L160 480 81.984 480 512 108.032 947.968 480 864 480z" p-id="12895"></path></svg>
                </i>
                <span>场地占用</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="headerTor">
            <div className="Gname">
              <img src={require("../../assets/icon_logo_Gname (2).png")} alt="logo" />

              <Select value={this.state.defaultValue} className="selectEd" onChange={this.selectEd} suffixIcon={<DownOutlined style={{ color: '#fff', fontSize: '18px' }} />}>
                {
                  this.state.selectEd.map((item, i) => (
                    <Option key={i} value={item.venueuuid}>{item.name}</Option>
                  ))
                }

              </Select>
            </div>
            <div className="Gname">
              <Select
                mode="multiple"
                className="moName"
                style={{ width: '100%' }}
                value={this.state.moName}
                onChange={this.handleChange}
                onDeselect={this.deselect}
              >
                {
                  this.state.arrPhp.map((item, i) => (
                    <Option key={i} value={item.telephone}>{item.name}</Option>
                  ))
                }

              </Select>

            </div>
            <div className="time" style={this.state.flagHidden === 1 ? { display: 'none' } : {}}>
              <div className="new">
                <div onClick={this.news}>
                  <img src={require("../../assets/icon_pc_new2.png")} style={{ cursor: 'pointer' }} alt="message" />
                  <div className="number"><span>{Number(sessionStorage.getItem('mess')) > 999 ? '999+' : sessionStorage.getItem('mess')}</span></div>
                </div>
              </div>
              <div className="lvyue">场地履约率：{this.state.gerVenueNameRate}%</div>
            </div>
          </Header>

          <div className="xian"></div>
          <Content style={{
            background: '#fff',
            height: '100%',
            overflowY: 'auto'
          }}>
            <div className={this.state.path !== '/home' ? 'homePageT' : 'homePage'} >
              <span className="titledsfgdj" style={this.state.nookod !== '' ? { opacity: '1' } : { opacity: '0' }}>{this.state.nookod}! 欢迎使用找对手场馆端</span>
              <div style={{ height: 8, background: '#F5F5F5', width: '100%' }}></div>
              <div className="divContent">
                <div onClick={this.income}>
                  <div className="left"><span>本月收入</span><span>会员卡扣款:￥{this.state.month_member_money}</span><span>钱包到账:￥{this.state.getVenueMonth_money}</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_money.png")} alt="icon" /></div>
                </div>
                <div onClick={this.daysIncome}>
                  <div className="left"><span>今日收入</span><span>会员卡扣款:￥{this.state.today_member_money}</span><span>钱包到账:￥{this.state.getVenueToday_money}</span></div>
                  <div className="right" ><img src={require("../../assets/icon_pc_money.png")} alt="icon" /></div>
                </div>
                <div onClick={this.mounthOrderTwo}>
                  <div className="left"><span style={{ marginTop: '17%' }}>本月成功预约</span><span>{this.state.getVenueMonth_count}单</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_biji.png")} alt="icon" /></div>
                </div>
                <div onClick={this.mounthOrder}>
                  <div className="left"><span style={{ marginTop: '16%' }}>今日成功预约</span><span>{this.state.getVenueToday_count}单</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_biji.png")} alt="icon" /></div>
                </div>
                <div onClick={this.lppd}>
                  <div className="left"><span style={{ marginTop: '17%' }}>场馆评分{this.state.getVenueScore}分</span>
                    <div className="xing">
                      <img src={this.state.getVenueScore >= 1 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenueScore < 1 && this.state.getVenueScore > 0 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenueScore >= 2 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenueScore < 2 && this.state.getVenueScore > 1 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenueScore >= 3 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenueScore < 3 && this.state.getVenueScore > 2 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenueScore >= 4 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenueScore < 4 && this.state.getVenueScore > 3 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                      <img src={this.state.getVenueScore >= 5 ? require('../../assets/50xing (3).png') : require('../../assets/oneXing.png') && this.state.getVenueScore < 5 && this.state.getVenueScore > 4 ? require('../../assets/50xing (1).png') : require('../../assets/oneXing.png')} alt="666" />
                    </div>
                  </div>
                  <div className="right"><img src={require("../../assets/icon_pc_xingxin.png")} alt="icon" /></div>
                </div>
              </div>
            </div>

            <Modal title="请对运营专员上一周的表现做个评价吧!" visible={this.state.isModalVisible} okText="匿名评价" onOk={this.handleOk} className="koTwoSjok" onCancel={this.handleCancel}>
              <div className="content">
                <div className="left">
                  <img src={require("../../assets/operations.png")} alt="icon" />
                </div>
                <div className="right">
                  <span>ID:{this.state.detail.promoteid}</span>
                  <span>{this.state.detail.promotename}</span>
                </div>
              </div>
              <div className="Choose">
                <div className="start">整体评分   <Rate defaultValue={5} allowClear={false} onChange={this.rate} /> {this.state.rate}分</div>
                <span className="text">基于对ta的印象点击下方标签评价吧!</span>
                {
                  this.state.SelabelTwo.map((item, i) => (
                    <div key={i} className="select" style={this.state.labelId.indexOf(item.id) !== -1 ? { background: 'rgba(216,93,39,0.12)', border: '1px solid #D85D27', color: '#D85D27' } : {}} onClick={this.select} data-id={item.id}>{item.name}</div>
                  ))
                }
              </div>
            </Modal>


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
            <Route path="/home/command" component={command} />
            <Route path="/home/appointmentList" component={appointmentList} />
            <Route path="/home/special" component={special} />
            <Route path="/home/VipAgement" component={VipAgement} />
            <Route path="/home/insideView" component={siteSettingsTwo} />
            <Route path="/home/Koloko" component={Koloko} />


          </Content>
        </Layout>
      </Layout >
    )
  }
}

export default home;