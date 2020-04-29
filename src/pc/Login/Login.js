import React from 'react';
import './Login.css';
import 'antd/dist/antd.css';
import { _code, _login, VenueSelectSiteName } from '../../api';
import { Form, Input, Button, message, Popover, Radio } from 'antd';
import Icon from '@ant-design/icons';
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
  };

  componentDidMount() {
    if (sessionStorage.getItem('venue_token')) {
      if (sessionStorage.getItem('issite') === '0') {
        this.props.history.push('/perfect')
      } else if (sessionStorage.getItem('isqult') === '0') {
        this.props.history.push('/qualification')
      } else if (sessionStorage.getItem('isqult') === '1') {
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
      sessionStorage.setItem('issportid', res.data.data.issportid);

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

  async VenueSelectSiteName(data) {
    const res = await VenueSelectSiteName(data)
    if (res.data.code === 2000) {
      this.setState({ selectVeun: res.data.data, value: res.data.data[0].venueloginuuid })
      this.nacode({ "mobile": this.state.phone, "type": 'venuelogin' })
    } else {
      this.nacode({ "mobile": this.state.phone, "type": 'venuelogin' })
    }
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
      username: this.state.phone, usercode: this.state.code, userpass: this.state.pass, type: 2, Logintype: 'pc', venueloginuuid: this.state.value
    }
    this.login(data)                                                  
  }



  onSubmitT = () => {
    let data = {
      username: this.state.phone, usercode: this.state.code, userpass: this.state.pass, type: 1, Logintype: 'pc', venueloginuuid: ''
    }
    this.login(data)
  }
  phoneLogin = () => {
    this.setState({ navNum: true })
  }
  nameLogin = () => {
    this.setState({ navNum: false })
  }
  guan=()=>{
   
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
                <div style={this.state.navNum === false ? { color: '#F5A623' } : { color: '#000' }} onClick={this.nameLogin}>普通登录</div>
                <div onClick={this.phoneLogin} style={this.state.navNum === true ? { color: '#F5A623' } : { color: '#000' }}>法人登录</div>
              </div>
              <div className={this.state.navNum ? 'phoneLoginT' : 'phoneLogin'}>
                <Form layout="inline" onSubmit={this.handleSubmit} className="form">
                  <Form.Item className="input">
                    <Popover
                      content='请输入正确的手机号'
                      visible={this.state.visiblePhone}
                    >
                      <Input onBlur={this.phone} maxLength={11} prefix={<Icon type="user" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="法人手机号" />
                    </Popover>
                  </Form.Item>
                  <Form.Item className="code">
                    <Input onChange={this.code} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机验证码" />
                  </Form.Item>
                  <Form.Item className="bind">
                    <div className={this.state.textT === '获取验证码' ? 'codeBtn' : 'koohidden'} onClick={this.naCode} >
                      {this.state.textT}
                    </div>
                    <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'codeBtn'} >
                      {this.state.textT}
                    </div>
                  </Form.Item>   
                 
                  <Form.Item style={{marginTop:'10px'}}  className={this.state.selectVeun.length > 0 ? 'input' : 'selectVeunNone'}>
                    <Radio.Group className="radio" onChange={this.onChange} value={this.state.value}>

                      {
                        this.state.selectVeun.map((item, i) => (
                          <Radio key={i} value={item.venueloginuuid}>{item.name}</Radio>
                        ))
                      }
                
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item className="input" >
                    <Input.Password maxLength={8} onChange={this.onPassword} onPressEnter={this.onSubmit} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
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
                    <Input onChange={this.phone} prefix={<Icon type="user" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/操作员手机号" />
                  </Form.Item>
                  <Form.Item className="input" style={{marginTop:20}}>
                    <Input.Password maxLength={8} onChange={this.onPassword} onPressEnter={this.onSubmitT} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
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
       <div className="retrun" onClick={this.guan}><a href="http://www.zhaoduishou.com/" target="_blank" rel="noopener noreferrer">公司官网:www.zhaoduishou.com</a></div>
      </div>
    );
  }
}

export default Login;