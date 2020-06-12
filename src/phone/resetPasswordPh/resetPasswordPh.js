import React from 'react';
import './resetPasswordPh.css';

import {Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import { _code,VenueChangePassword } from '../../api';


class resetPasswordPh extends React.Component {

  state = {
    phone:'',
    textT:'获取验证码',
    pass:'',
    passTwo:'',
    code:'',
  };



  componentDidMount() {

  }
  phone=(e)=>{
   this.setState({phone:e.target.value})
  }

  async nacode(data) {
    const res = await _code(data)
    
    if(res.data.code===2000){
      Toast.success(res.data.msg, 1);
    }else{
      Toast.fail(res.data.msg, 1);
    }
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
      Toast.fail('请输入手机号', 1);
    }
  }
  code=e=>{
    this.setState({code:e.target.value})
  }

  pass=e=>{
    this.setState({pass:e.target.value})
  }

  passTwo=e=>{
    this.setState({passTwo:e.target.value})
  }

  

  async VenueChangePassword(data) {
    const res = await VenueChangePassword(data,localStorage.getItem('venue_token'))
    if(res.data.code===2000){
      this.props.history.push('/login')
      Toast.success('密码修改成功', 1);
    }else{
      Toast.fail(res.data.msg, 1);
    }
  }

  submit=()=>{
    let {phone,code,pass,passTwo}=this.state
    if(pass!==passTwo){
      Toast.fail('两次密码输入不一致', 1);
    }else{
     this.VenueChangePassword({phone:phone,code:code,pass:pass})
    }
  }





  reture = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="resetPasswordPh">
        <div className="headTitile"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left:'0',width:'48px',height:'48px',lineHeight:'48px' }} />重置密码</div>

        <div className="listSon">
          <Input maxLength={11} placeholder="请输入法人/操作员手机号"  onChange={this.phone} />
        </div>

        <div className="listSon">
          <Input placeholder="请输入验证码" maxLength={6} onChange={this.code}/>
          <div className={this.state.textT === '获取验证码' ? 'obtain' : 'koohidden'} onClick={this.naCode} >
            {this.state.textT}
          </div>
          <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtain'} >
            {this.state.textT}
          </div>
        </div>

        <div className="listSon">
          <Input.Password style={{border:'none',boxShadow:'none'}} placeholder="请输入新密码" onChange={this.pass} />
        </div>
        <div className="listSon">
          <Input.Password style={{border:'none',boxShadow:'none'}} placeholder="请确认密码" onChange={this.passTwo} />
        </div>
        <div className='restSubmit' onClick={this.submit}>确认</div>

      </div>
    )
  }
}

export default resetPasswordPh;