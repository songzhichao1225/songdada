import React from 'react';
import './corporatePh.css';
import 'antd/dist/antd.css';
import { _login, VenueSelectSiteName, _code } from '../../api';
import { message, Input,Radio,Icon } from 'antd';

class corporatePh extends React.Component {

  state = {
    phone: '',//用户登录手机号
    code: '',//验证码
    pass: '',//密码
    textT: '获取验证码',
    flag: 'hidden',
    navNum: true,
    visiblePhone: false,
    selectVeun: [],
    value: '',
  };


  componentDidMount() {
    if (sessionStorage.getItem('venue_token')) {
      if (sessionStorage.getItem('issite') === '0') {
        this.props.history.push('/stadiumInformationPh')
      } else if (sessionStorage.getItem('isqult') === '0') {
        this.props.history.push('/qualification')
      } else if (sessionStorage.getItem('isqult') === '1') {
        this.props.history.push('/resultsAuditsPh')
      }
    }

  }



  phone = (e) => {
    this.setState({ phone: e.target.value })
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(e.target.value))) {
      this.setState({ visiblePhone: true })
    } else if (e.target.value === '') {
      this.setState({ visiblePhone: true })
    } else {
      this.setState({ phone: e.target.value, visiblePhone: false })
    }
  }
  code = e => {
    this.setState({ code: e.target.value })
  }
  onPassword = e => {
    this.setState({ pass: e.target.value })
  }

  async nacode(data) {
    const res = await _code(data)
    console.log(res)
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
      setTimeout(() => {
        if (res.data.data.venue_token) {
          if (res.data.data.issite === 0) {
            this.props.history.push('/stadiumInformationPh')
          } else if (res.data.data.isqult === 0) {
            this.props.history.push('/qualification')
          } else if (res.data.data.islegal === 0 || res.data.data.islegal === 2) {
            this.props.history.push('/resultsAuditsPh')
          } else {
            this.props.history.push('/homePh')
          }
        }
      }, 1000)
    }
  }
  code=e=>{
    this.setState({code:e.target.value})
  }
  password=e=>{
    this.setState({pass:e.target.value})
  }
  async VenueSelectSiteName(data) {
    const res = await VenueSelectSiteName(data)

    if (res.data.code === 2000) {
      this.setState({ selectVeun: res.data.data, value: res.data.data[0].venueloginuuid })
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.phone, "type": 'venuelogin' })
    }else{
      message.error(res.data.msg)
    }
  }

  loginPhTeo = () => {
    this.props.history.goBack();
  }
  registerPh = () => {
    this.props.history.push('/registerPh')
  }
  forgetPassword=()=>{
    this.props.history.push('/forgetPasswordPh')
  }


  naCode = () => {
    if (this.state.phone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))) {
      this.VenueSelectSiteName({ phone: this.state.phone })
    } else {
      message.error('请输入手机号')
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  onSubmit = () => {
    let data = {
      username: this.state.phone, usercode: this.state.code, userpass: this.state.pass, type: 2, Logintype: 'mobile', venueloginuuid: this.state.value
    }
    this.login(data)
  }
  render() {
    return (
      <div className="corporatePh">
        <div className="headerTitle">法人手机号登录</div>
        <div className="loginInput">
          <div className="name">
            <Input className="phone" autoFocus prefix={<Icon type="user" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11} onChange={this.phone} placeholder="法人手机号" />
          </div>
          <div className="name">
            <Input className="phone"  prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}  maxLength={8}  onChange={this.code} placeholder="手机验证码" />
            <div className={this.state.textT === '获取验证码' ? 'obtain' : 'koohidden'} onClick={this.naCode} >
              {this.state.textT}
            </div>
            <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtain'} >
              {this.state.textT}
            </div>
          </div>
          <div className={this.state.selectVeun.length>0?'name':'koohidden'}> 
          <Radio.Group className="radio" onChange={this.onChange} value={this.state.value}>

            {
              this.state.selectVeun.map((item, i) => (
                <Radio key={i} value={item.venueloginuuid}>{item.name}</Radio>
              ))
            }

          </Radio.Group>
          </div>
          <div className="name">
            <Input.Password className="phone"  prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}  onChange={this.password} type='password' maxLength={8} placeholder="请输入密码" />
            <span onClick={this.forgetPassword}>忘记密码</span>
          </div>

          <div className="loginBtn" onClick={this.onSubmit}>登录</div>
          <div className="footer" style={{ marginTop: '1rem' }}>
            <span onClick={this.loginPhTeo}>普通用户登录</span>
            <span onClick={this.registerPh}>新用户注册</span>
          </div>
        </div>
      </div>
    );
  }
}

export default corporatePh;