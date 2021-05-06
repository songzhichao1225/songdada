import React from 'react';
import './loginPhTeo.css';
import 'antd/dist/antd.css';

import { Toast, InputItem,NavBar, Popover } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { _login } from '../../api';
import {EllipsisOutlined} from '@ant-design/icons';

const Item = Popover.Item;
class loginPhTeo extends React.Component {

  state = {
    phone: '',
    password: '',
    eyes:false,
    flagGH:false,
  };

  componentDidMount() {
    if (localStorage.getItem('venue_token')) {
        this.props.history.push('/homePh/homePh')
    }
   
  }
  corporatePh = () => {
    this.props.history.push('/corporateLogin')
  }

  registerPh = () => {
    this.props.history.push('/registerPh')
  }
  phone = e => {
    if(e.indexOf('①')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('②')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('③')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('④')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('⑤')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('⑥')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('⑦')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('⑧')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else if(e.indexOf('⑨')!==-1){
      this.setState({phone:e.slice(0,e.length-1)})
    }else{
      this.setState({ phone: e })
    }
  }
  pssword = e => {
    this.setState({ password: e })
  }
 
  async login(data) {
    const res = await _login(data)
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      localStorage.clear()
      localStorage.setItem('uuid', res.data.data.uuid);
      localStorage.setItem('name', res.data.data.name);
      localStorage.setItem('islegal', res.data.data.islegal);
      localStorage.setItem('venue_token', res.data.data.venue_token);
      localStorage.setItem('issite', res.data.data.issite);
      localStorage.setItem('isqult', res.data.data.isqult);
      localStorage.setItem('ismethod', res.data.data.ismethod);
      localStorage.setItem('phone', res.data.data.phone);
      localStorage.setItem('legalphone', res.data.data.legalphone);
      localStorage.setItem('nickName',data.username)
      setTimeout(() => {
        if (res.data.data.venue_token) {
          if (res.data.data.issite === 0) {
            this.props.history.push('/stadiumInformationPh')
          } else if (res.data.data.isqult === 0) {
            this.props.history.push('/qualificationPh')
          } else if (res.data.data.islegal === 0 || res.data.data.islegal === 2) {
            this.props.history.push('/resultsAuditsPh')
          } else {
            this.props.history.push('/homePh/homePh')
          }
        }
      }, 1000)
    }
  }

  submit = () => {
    let { phone, password } = this.state
    if(phone===''){
      Toast.info('请输入手机号', 1);
    }else if(password===''){
      Toast.fail('请输入密码', 1);
    }if(/^[^\s]*$/.test(this.state.password)===false){
      Toast.fail('密码输入有误', 1);
    }else{
      this.login({ username: phone, userpass: password, usercode: '', type: '1', Logintype: 'mobile', venueloginuuid: '', })
    }
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

  closeWeb=()=>{
    
  if(window.location.href.indexOf('flag=1')===-1){
    this.props.history.push('/phone')
     this.setState({visible:false})
  }else{
    this.close()
  }
}

eyes=()=>{
  this.setState({
    eyes:!this.state.eyes
  })
}
  render() {
    return (
      <div className="loginPhTeo">
       <NavBar
            mode="dark"
            icon={<img style={{ width: '2rem', height: '2rem', display: 'block' }} src={require('../../assets/logoHead.png')} alt="logo" />}
            rightContent={<Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              onSelect={this.closeWeb}
              overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1')===-1?'返回官网':'关闭'}</Item>),
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
          ><span style={{ fontSize: '1rem' }}>登录/注册</span></NavBar>
        <div className="loginInput">
          <div className="name">
            <InputItem
              type='text'
              placeholder="用户名/操作员手机号"
              clear={true}
              style={{ fontSize: '0.88rem',border:'none'  }}
              onChange={this.phone}
              className="phone"
              value={this.state.phone}
            >
            </InputItem>
          </div>
          

          <div className="name">
            <InputItem
              type='password'
              placeholder="请输入密码"
              clear={false}   
              style={{ fontSize: '0.88rem',border:'none' }}
              onChange={this.pssword}  
              maxLength={15}
              className="phone"
              
            >
            </InputItem>
            <span onClick={this.forgetPassword}>忘记密码</span>
          </div>
          
          <div className="loginBtn" onClick={this.submit}>登录</div>
          <div className="footer" style={{ marginTop: '1rem' }}>  
            <span onClick={this.corporatePh}>负责人手机号登录</span>
            <span onClick={this.registerPh}>新用户注册</span>  
          </div>
        </div>
      </div>
    )
  }
}

export default loginPhTeo;