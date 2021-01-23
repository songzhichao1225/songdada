import React from 'react';
import './Login.css';
import 'antd/dist/antd.css';
import { _code, _login } from '../../api';
import { Form, Input, Button, message } from 'antd';
import { } from '@ant-design/icons';
class Login extends React.Component {

  state = {
    equipment: 1,//登录设备 0pc 1移动设备
    phone: '',//用户登录手机号
    code: '',//验证码
    pass: '',//密码
    textT: '获取验证码',
    flag: 'hidden',
    navNum: false,
    visiblePhone: false,
    selectVeun: [],
    value: '',
    BlurOne: 'text',
    phoneTwo:''
  };

  componentDidMount() {
   
   
  }

  phone = (e) => {
    if (e.target.value.indexOf('①') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('②') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('③') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('④') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('⑤') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('⑥') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('⑦') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('⑧') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else if (e.target.value.indexOf('⑨') !== -1) {
      this.setState({ phone: e.target.value.slice(0, e.target.value.length - 1) })
    } else {
      this.setState({ phone: e.target.value })
      if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(e.target.value))) {
        this.setState({ visiblePhone: true })
      } else if (e.target.value === '') {
        this.setState({ visiblePhone: true })
      } else {
        this.setState({ phone: e.target.value, visiblePhone: false })
      }
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
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
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
      sessionStorage.setItem('ismethod', res.data.data.ismethod);
      sessionStorage.setItem('issecondaudit', res.data.data.issecondaudit);
      sessionStorage.setItem('legalphone', res.data.data.legalphone);
      sessionStorage.setItem('phone', res.data.data.phone);
      localStorage.setItem('nickName', res.data.data.name)
      sessionStorage.removeItem('qualifData')
      sessionStorage.setItem('headerData',1)
      setTimeout(() => {
        if (res.data.data.venue_token) {
          if (res.data.data.issite === 0) {
            this.props.history.push('/perfect')
          } else if (res.data.data.isqult === 0) {
            this.props.history.push('/qualification')
          } else if (res.data.data.islegal === 0 || res.data.data.islegal === 2) {
            this.props.history.push('/statusAudits')
          } else  {
            this.props.history.push('/home')
          }
        }
      }, 1000)
    }
  }

 
  naCode = () => {
    if (this.state.phoneTwo!== '' && (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.state.phoneTwo)) && this.state.phoneTwo.length === 11) {
      this.nacode({ "mobile": this.state.phoneTwo, "type": 'venuelogin' })
    } else {
      message.error('请输入正确手机号')
    }
  }
  onChange = e => {
    this.setState({ value: e })
  }

  onSubmit = () => {
    let data = {
      username: this.state.phoneTwo, usercode: this.state.code, userpass: this.state.pass, type: 2, Logintype: 'pc', venueloginuuid: this.state.value
    }
    if(this.state.phoneTwo===''){
    message.error('请输入手机号')
    }else{
      this.login(data)
    }
  }



  onSubmitT = () => {
    let data = {
      username: this.state.phone, usercode: this.state.code, userpass: this.state.pass, type: 1, Logintype: 'pc', venueloginuuid: ''
    }
    if (data.username === '') {
      message.error('请输入用户名')
    } else if (data.userpass === '') {
      message.error('请输入密码')
    }else if(/^[^\s]*$/.test(this.state.pass)===false){
      message.error('密码输入有误')
    } else {
      this.login(data)
    }
  }
  phoneLogin = () => {
    this.setState({ navNum: true })
  }
  nameLogin = () => {
    this.setState({ navNum: false })
  }
  iphoneInput = e => { 
    if (e.target.value === '') {
      this.setState({ selectVeun: [] })
    }
    this.setState({phoneTwo:e.target.value})
  }
  textOne = () => {
    this.setState({ BlurOne: 'text' })
  }
  textOneTwo = () => {
    this.setState({ BlurOne: 'password' })
  }
  FOne = () => {
    this.setState({ BlurOne: 'password' })
  }

  render() {
    return (
      <div className="login">
        {/* <img className="img" src={require("../../assets/loginBack.png")} alt="找对手"/> */}
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 53, height: 53, marginTop: 40 }} alt="logo" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>
          <div className="content">
            <div className="left">

            </div>
            <div className="right">
              <span className="uigt">找对手场馆端</span>
              <div className="navTap">
                <div style={this.state.navNum === false ? { color: '#F5A623' } : { color: '#000' }} onClick={this.nameLogin}>操作员登录</div>
                <div onClick={this.phoneLogin} style={this.state.navNum === true ? { color: '#F5A623' } : { color: '#000' }}>负责人登录</div>
              </div>
              <div className={this.state.navNum ? 'phoneLoginT' : 'phoneLogin'}>
                <Form layout="inline"  className="form">
                  <Form.Item className="input">

                    <Input onBlur={this.phoneOne}  maxLength={11} onInput={this.iphoneInput} placeholder="负责人手机号" />

                  </Form.Item>
                  <Form.Item className="code">
                    <Input onChange={this.code} placeholder="手机验证码" />
                  </Form.Item>
                 
                    <div className={this.state.textT === '获取验证码' ? 'codeBtn' : 'koohidden'} onClick={this.naCode}>
                      {this.state.textT}
                    </div>
                    <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'codeBtn'} >
                      {this.state.textT}
                    </div>
                  
                 

                  <Form.Item className="bind">
                    <Button className="btnSubmit" onClick={this.onSubmit} htmlType="submit">
                      登录
                </Button>
                  </Form.Item>
                </Form>
              </div>



              <div className={this.state.navNum ? 'nameLogin' : 'nameLoginT'}  >
                <Form layout="inline" className="form">
                  <Form.Item className="input">
                    <Input   onChange={this.phone} value={this.state.phone}  placeholder="用户名/操作员手机号" />
                  </Form.Item>
                  
                  <Form.Item className="input" style={{marginTop:'20px'}}>
                    <Input type='password'  maxLength={15}  onChange={this.onPassword} value={this.state.pass} onPressEnter={this.onSubmitT} placeholder="密码" />
                  </Form.Item>
                  <Form.Item className="bind">
                    <Button className="btnSubmit" onClick={this.onSubmitT}>
                      登录
                </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className={this.state.navNum ? 'nameLogin' : 'checke'}>
                <a href='#/forgetPassword'><span>忘记密码</span></a>
                <a href='#/register'><span>注册</span></a>
              </div>
            </div>
          </div>



        </div>
        <div className="retrun" onClick={this.guan}><a href="http://www.zhaoduishou.com/" target="_blank" rel="noopener noreferrer">公司官网:www.zhaoduishou.com</a></div>
      </div>
    )
  }
}

export default Login;