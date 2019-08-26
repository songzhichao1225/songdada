import React from 'react';
import './Login.css';
import 'antd/dist/antd.css';
import { _code, _login } from '../../api';
import { Form, Icon, Input, Button, message, Popover } from 'antd';

class Login extends React.Component {

  state = {
    equipment: 1,//登录设备 0pc 1移动设备
    phone: '',//用户登录手机号
    code: '',//验证码
    pass: '',//密码
    textT: '获取验证码',
    flag: 'hidden',
    navNum: true,
    visiblePhone: false,
  };

  componentDidMount() {
    if (sessionStorage.getItem('venue_token')) {
      if (sessionStorage.getItem('issite') === '0') {
        this.props.history.push('/perfect')
      } else if (sessionStorage.getItem('isqult') === '0') {
        this.props.history.push('/qualification')
      } else if (sessionStorage.getItem('isqult') === '1') {
        console.log('转审核')
        this.props.history.push('/statusAudits')
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
  naCode = () => {
    console.log(6666)
    if (this.state.phone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.phone, "type": 'venuelogin' })
    } else {
      message.error('请输入手机号')
    }
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
            this.props.history.push('/perfect')
          } else if (res.data.data.isqult === 0) {
            this.props.history.push('/qualification')
          } else if (res.data.data.islegal === 0 || res.data.data.islegal === 2) {

            this.props.history.push('/statusAudits')
          } else {
            this.props.history.push('/home')
          }
        }
      }, 1000)
    }

  }


  onSubmit = () => {
    let data = {
      username: this.state.phone, usercode: this.state.code, userpass: this.state.pass, type: 2, Logintype: 'pc'
    }
    this.login(data)
  }


  onSubmitT = () => {
    let data = {
      username: this.state.phone, usercode: this.state.code, userpass: this.state.pass, type: 1, Logintype: 'pc'
    }
    this.login(data)
  }
  phoneLogin = () => {
    this.setState({ navNum: true })
  }
  nameLogin = () => {
    this.setState({ navNum: false })
  }

  render() {
    return (
      <div className="login">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} alt="logo" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>
          <div className="content">
            <div className="left">
              <span>Welcome!</span>
              <span>挑战场地管理端</span>
            </div>
            <div className="right">
              <div className="navTap"><div onClick={this.phoneLogin}>手机号登录</div><div onClick={this.nameLogin}>用户名登录</div></div>
              <div className={this.state.navNum ? 'phoneLoginT' : 'phoneLogin'}>
                <Form layout="inline" onSubmit={this.handleSubmit} className="form">
                  <Form.Item className="input">
                    <Popover
                      content='请输入正确的手机号'
                      visible={this.state.visiblePhone}
                    >
                      <Input onBlur={this.phone} maxLength={11} prefix={<Icon type="user" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机/法人手机" />
                    </Popover>
                  </Form.Item>
                  <Form.Item className="code">
                    <Input onChange={this.code} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机验证码" />
                  </Form.Item>
                  <Form.Item className="bind">
                    <div className={this.state.textT === '获取验证码' ? 'codeBtn' : 'koohidden'}  onClick={this.naCode} >
                      {this.state.textT}
                    </div>
                    <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'codeBtn'} onClick={this.naCode}>
                      {this.state.textT}
                    </div>
                  </Form.Item>
                  <Form.Item className="input" >
                    <Input.Password onChange={this.onPassword} onPressEnter={this.noHuiche} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                  </Form.Item>
                  <Form.Item className="bind">
                    <Button className="btnSubmit" onClick={this.onSubmit} htmlType="submit">
                      登录
                </Button>
                  </Form.Item>
                </Form>
              </div>


              <div className={this.state.navNum ? 'nameLogin' : 'nameLoginT'}  >
                <Form layout="inline" onSubmit={this.handleSubmit} className="form">
                  <Form.Item className="input">
                    <Input onChange={this.phone} prefix={<Icon type="user" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                  </Form.Item>
                  <Form.Item className="input" >
                    <Input.Password onChange={this.onPassword} onPressEnter={this.noHuiche} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                  </Form.Item>
                  <Form.Item className="bind">
                    <Button className="btnSubmit" onClick={this.onSubmitT} >
                      登录
                </Button>
                  </Form.Item>
                </Form>
              </div>

              <div className="checke">
                <a href='#/forgetPassword'><span>忘记密码?</span></a>
                <a href='#/register'><span>注册</span></a>
              </div>

            </div>
          </div>


        </div>

      </div>
    );
  }
}

export default Login;