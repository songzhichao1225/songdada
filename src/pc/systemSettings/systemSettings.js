import React from 'react';
import './systemSettings.css';
import 'antd/dist/antd.css';
import { _code,VenueChangePassword,VenueBindingPhone } from '../../api';
import { Input, Icon, message,Checkbox } from 'antd';





class systemSettings extends React.Component {

  state = {
    flag: false,
    flagList: true,
    flagUntie:true,
    flagListOne:true,
    text: '',
    textT: '获取验证码',
    phone: '',
    code: '',
    passWord: '',
    passWordT: '',
    corporatePhone:'',//法人手机号
    corporateCode:'',//法人验证码
    operationPhone:'',//操作员手机号
    operationCode:'',//操作员验证码
  };


  componentDidMount() {

  }

  agreement = () => {
    this.setState({ flag: !this.state.flag })
  }
  reset = () => {
    this.setState({ text: '>重置密码', flagList: false,flagListOne:false })
  }
  Untie=()=>{
    this.setState({ text: '>解除/更换绑定手机号', flagUntie: false,flagListOne:false })
  }
  resetNot = () => {
    this.setState({ flagListOne: true,flagList:true,flagUntie:true })
  }

  async nacode(data) {
    const res = await _code(data)
    console.log(res)
  }
  phone = e => {
    this.setState({ phone: e.target.value })
  }
  code = e => {
    this.setState({ code: e.target.value })
  }
  passWord = e => {
    this.setState({ passWord: e.target.value })
  }
  passWordT = e => {
    this.setState({ passWordT: e.target.value })
  }

  naCode = () => {
    if (this.state.phone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.phone, "type": 'venuesavepass' })
    } else {
      message.error('请输入手机号')
    }
  }

  naCodeOutie=()=>{
    if (this.state.phone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.phone, "type": 'venuebinding' })
    } else {
      message.error('请输入手机号')
    }
  }

  async VenueChangePassword(data) {
    const res = await VenueChangePassword(data,sessionStorage.getItem('venue_token'))
    if(res.data.code!==2000){
      message.error(res.data.msg)
    }else{
      message.success('修改成功')
      sessionStorage.removeItem('venue_token')
      sessionStorage.removeItem('uuid')
    }
  }

 


  submit = () => {
    let { phone, code, passWord, passWordT, } = this.state
    if (passWord === passWordT) {
     this.VenueChangePassword({phone:phone,code:code,pass:passWordT})
    }else{
      message.error('两次密码输入不一致')
    }
  }



  corporatePhone=e=>{
    this.setState({corporatePhone:e.target.value})
  }
  corporateCode=e=>{
    this.setState({corporateCode:e.target.value})
  }
  operationPhone=e=>{
    this.setState({operationPhone:e.target.value})
  }
  operationCode=e=>{
    this.setState({operationCode:e.target.value})
  }


  async VenueBindingPhone(data) {
    const res = await VenueBindingPhone(data,sessionStorage.getItem('venue_token'))
    if(res.data.code!==2000){
      message.error(res.data.msg)
    }else{
      message.success('修改成功')
      this.setState({ flagListOne: true,flagList:true,flagUntie:true })
    }
  }

  
   UoiteSubimt=()=>{
     let {corporatePhone,corporateCode,operationPhone,operationCode}=this.state
       this.VenueBindingPhone({legalphone:corporatePhone,legalcode:corporateCode,operatorphone:operationPhone,operatorcode:operationCode})
   }

  render() {
    return (
      <div className="systemSettings" style={{ height: parseInt(sessionStorage.getItem('height')) }}>
        <div className="title"><span style={{ cursor: 'pointer' }} onClick={this.resetNot}>系统设置</span> <span className={this.state.flagListOne === false ? 'titleSpan' : 'listNone'}>{this.state.text}</span></div>
        <div className={this.state.flagListOne === true ? 'list' : 'listNone'}>
          <ul className="ul">
            <li><Checkbox onChange={this.order}>关闭预约</Checkbox></li>
            <li>设置临时关闭预约时间</li>
          </ul>

          <ul className="ul">
            <li onClick={this.Untie}>解除/更换绑定手机号</li>
            <li onClick={this.reset}>重置密码</li>
          </ul>

          <ul className="ul">
            <li>
              <span onClick={this.agreement}>用户协议</span>
              <span className={this.state.flag === true ? 'block' : 'none'}>挑战约球的创始团队来自阿里巴巴、GOOGLE、舒适堡、格力，及全球连锁酒店顶级管理人士。一群狂热的健身&互联网信徒，乐刻运动是一个充满极客精神以追求极致的态度为都市年轻人提供健身服务的创业公司。致力于成为混乱的国内健身行业的颠覆者。</span>
            </li>
            <li>关于我们</li>
            <li>客服电话 （010-120101021）</li>
            <li>帮助中心</li>
          </ul>
        </div>

        <div className={this.state.flagList === false ? 'reset' : 'listNone'}>
          <div className="resetSon">
            <div className="inputSon">
              <span>手机号码</span>
              <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.phone} placeholder="请输入手机号" />
            </div>

            <div className="inputSonT inputSon">
              <span>验证码</span>
              <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.code} placeholder="请输入验证码" />
              <div className={this.state.textT === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCode}>{this.state.textT}</div>
              <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textT}</div>
            </div>

            <div className="inputSon">
              <span>重置密码</span>
              <Input.Password maxLength={8} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.passWord} placeholder="请输入重置密码" />
            </div>

            <div className="inputSon">
              <span>确认密码</span>
              <Input.Password maxLength={8} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.passWordT} placeholder="请输入确认密码" />
            </div>
            <div className="submit" onClick={this.submit}>确定</div>
          </div>
        </div>

        <div className={this.state.flagUntie === false ? 'Untie' : 'listNone'}>
        <div className="resetSon">
            <div className="inputSon">
              <span style={{width:145,marginLeft:-80,textAlign:'right'}}>法人手机号</span>
              <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.corporatePhone} placeholder="请输入手机号" />
            </div>

            <div className="inputSonT inputSon">
              <span style={{textAlign:'right'}}>验证码</span>
              <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.corporateCode} placeholder="请输入验证码" />
              <div className={this.state.textT === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCodeOutie}>{this.state.textT}</div>
              <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textT}</div>
            </div>
            <div className="inputSon">
              <span style={{width:145,marginLeft:-80,textAlign:'right'}}>绑定操作员新手机号</span>
              <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.operationPhone} placeholder="请输入手机号" />
            </div>
            <div className="inputSonT inputSon">
              <span style={{textAlign:'right'}}>验证码</span>
              <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.operationCode} placeholder="请输入验证码" />
              <div className={this.state.textT === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCodeOutie}>{this.state.textT}</div>
              <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textT}</div>
            </div>
            <div className="submit" onClick={this.UoiteSubimt}>确定</div>
          </div>
        </div>


      </div>
    );
  }
}

export default systemSettings;