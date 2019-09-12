import React from 'react';
import './forgetPasswordPh.css';
import { _code, VenueSelectSiteName, VenueForgetPass } from '../../api';
import {  Input, message, Radio,Icon } from 'antd';


class forgetPasswordPh extends React.Component {

  state = {
    textT: '获取验证码',
    selectVeun: [],
    phone: '',
    value: '',
    code: '',
    pass: '',
    passTwo: '',
  };

  componentDidMount() {

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
      this.nacode({ "mobile": this.state.phone, "type": 'venueforgetpass' })
    }
  }






  phoneChange = e => {
    this.setState({ phone: e.target.value })
  }
  async nacode(data) {
    const res = await _code(data)
    console.log(res)

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
  code = e => {
    this.setState({ code: e.target.value })
  }
  pass = e => {
    this.setState({ pass: e.target.value })
  }
  passTwo = e => {
    this.setState({ passTwo: e.target.value })
  }

  async VenueForgetPass(data) {
    const res = await VenueForgetPass(data)
    if (res.data.code === 2000) {
      message.info('密码修改成功')
      this.props.history.goBack()
    } else {
      message.error(res.data.msg)
    }

  }
  comfir = () => {
    let { phone, value, code, pass, passTwo } = this.state
    console.log(phone, value, code, pass, passTwo)
    if (pass === passTwo) {
      this.VenueForgetPass({ phone: phone, pass: passTwo, code: code, venueloginuuid: value })
    }
  }








  render() {
    return (
      <div className="forgetPasswordPh">
        <div className="title">忘记密码</div>
        <div className="boss">
          <div className="name">
            <Input className="phone" prefix={<Icon type="user" className="inputIcon" style={{ color: 'rgba(0,0,0,.25)' }} />}  maxLength={11}  onChange={this.phoneChange} placeholder="法人手机号" />
          </div>

          <div className="name">
            <Input className="phone" prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={8} onChange={this.code} placeholder="手机验证码" />
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
            <Input.Password className="phone" prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} className=" pass" maxLength={8}onChange={this.pass} placeholder="请输入密码" />
          </div>

          <div className="name">
            <Input.Password className="phone" prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} className=" pass" maxLength={8} onChange={this.passTwo} placeholder="请再次输入密码" />
          </div>
           <div className="btn" onClick={this.comfir}>确定</div>


        </div>

      </div>
    );
  }
}

export default forgetPasswordPh;