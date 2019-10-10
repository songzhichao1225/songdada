import React from 'react';
import './loginPhTeo.css';
import 'antd/dist/antd.css';
import { _login } from '../../api';
import { message,Input,Icon } from 'antd';


class loginPhTeo extends React.Component {

  state = {
    phone:'',
    password:'',
  };

  componentDidMount() {
    

  }
  corporatePh=()=>{
    this.props.history.push('/corporateLogin')
  }

  registerPh=()=>{
    this.props.history.push('/registerPh')    
  }
  phone=e=>{
    this.setState({phone:e.target.value}) 
  }
  pssword=e=>{
    this.setState({password:e.target.value})    
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
            this.props.history.push('/qualificationPh')
          } else if (res.data.data.islegal === 0 || res.data.data.islegal === 2) {
            this.props.history.push('/resultsAuditsPh')
          } else {
            console.log(666)
            this.props.history.push('/homePh')
          }
        }
      }, 1000)
    }
  }
  
  submit=()=>{
    let {phone,password}=this.state
      this.login({username:phone,userpass:password,usercode:'',type:'1',Logintype:'mobile',venueloginuuid:'',})
  }
  

  forgetPassword=()=>{
    this.props.history.push('/forgetPasswordPh')
  }



  render() {
    return (
      <div className="loginPhTeo">
        <div className="headerTitle">用户名登录</div>
        <div className="loginInput">
          <div className="name">
            <Input className="phone" autoFocus prefix={<Icon type="user" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11}  onChange={this.phone} placeholder="用户名" />
          </div>
          <div className="name">
            <Input.Password className="phone" prefix={<Icon type="unlock" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />}  maxLength={8} onChange={this.pssword}  placeholder="请输入密码" />
            <span onClick={this.forgetPassword}>忘记密码</span>
          </div>
          <div className="loginBtn" onClick={this.submit}>登录</div>
          <div className="footer" style={{marginTop:'1rem'}}>
            <span onClick={this.corporatePh}>法人手机号登录</span>
            <span onClick={this.registerPh}>新用户注册</span>
          </div>
        </div>

      </div>
    );
  }
}

export default loginPhTeo;