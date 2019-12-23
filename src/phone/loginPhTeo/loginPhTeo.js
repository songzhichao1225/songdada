import React from 'react';
import './loginPhTeo.css';
import 'antd/dist/antd.css';

import { Toast, InputItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { _login } from '../../api';
import { Icon } from 'antd';


class loginPhTeo extends React.Component {

  state = {
    phone: '',
    password: '',
  };

  componentDidMount() {


  }
  corporatePh = () => {
    this.props.history.push('/corporateLogin')
  }

  registerPh = () => {
    this.props.history.push('/registerPh')
  }
  phone = e => {
    this.setState({ phone: e })
  }
  pssword = e => {
    this.setState({ password: e })
  }

  async login(data) {
    const res = await _login(data)
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      localStorage.setItem('uuid', res.data.data.uuid);
      localStorage.setItem('name', res.data.data.name);
      localStorage.setItem('islegal', res.data.data.islegal);
      localStorage.setItem('venue_token', res.data.data.venue_token);
      localStorage.setItem('issite', res.data.data.issite);
      localStorage.setItem('isqult', res.data.data.isqult);
      localStorage.setItem('ismethod', res.data.data.ismethod);
      setTimeout(() => {
        if (res.data.data.venue_token) {
          if (res.data.data.issite === 0) {
            this.props.history.push('/stadiumInformationPh')
          } else if (res.data.data.isqult === 0) {
            this.props.history.push('/qualificationPh')
          } else if (res.data.data.islegal === 0 || res.data.data.islegal === 2) {
            this.props.history.push('/resultsAuditsPh')
          } else {
            this.props.history.push('/homePh')
          }
        }
      }, 1000)
    }
  }

  submit = () => {
    let { phone, password } = this.state
    this.login({ username: phone, userpass: password, usercode: '', type: '1', Logintype: 'mobile', venueloginuuid: '', })
  }


  forgetPassword = () => {
    this.props.history.push('/forgetPasswordPh')
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

  render() {
    return (
      <div className="loginPhTeo">
        <div className="headerTitle">用户名登录 <Icon type="close" onClick={this.close} style={{ position: 'absolute', right: '5%', top: '35%' }} /></div>
        <div className="loginInput">
          <div className="name">
            <InputItem
              type='text'
              placeholder="用户名"
              clear={true}
              style={{ fontSize: '0.6rem' }}
              onChange={this.phone}
              autoFocus
              className="phone"
            ><Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
            </InputItem>
          </div>
          <div className="name">

            <InputItem
              type='password'
              placeholder="密码"
              clear={true}
              style={{ fontSize: '0.6rem' }}
              onChange={this.pssword}
              maxLength={8}
              className="phone"
            ><Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />
            </InputItem>

            <span style={{ color: '#D85D27' }} onClick={this.forgetPassword}>忘记密码</span>
          </div>
          <div className="loginBtn" onClick={this.submit}>登录</div>
          <div className="footer" style={{ marginTop: '1rem' }}>
            <span onClick={this.corporatePh}>法人手机号登录</span>
            <span onClick={this.registerPh}>新用户注册</span>
          </div>
        </div>
      </div>
    );
  }
}

export default loginPhTeo;