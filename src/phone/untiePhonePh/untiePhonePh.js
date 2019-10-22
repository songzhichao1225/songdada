import React from 'react';
import './untiePhonePh.css';
import {Input,message,Icon } from 'antd';
import { _code,VenueBindingPhone} from '../../api';


class untiePhonePh extends React.Component {

  state = {
    textT:'获取验证码',
    textTwo:'获取验证码',
    phone:'',
    phoneTwo:'',
    codeOne:'',
    codeTwo:'',
  };

  
  componentDidMount() {
 
  }

  phone=(e)=>{
   this.setState({phone:e.target.value})
  }
  phoneTwo=e=>{
    this.setState({phoneTwo:e.target.value})
  }

  async nacode(data) {
    const res = await _code(data)
    if(res.data.code!==2000){
       message.error(res.data.msg)
    }else{
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

  async nacodeTwo(data) {
    const res = await _code(data)
    if(res.data.code!==2000){
       message.error(res.data.msg)
    }else{
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textTwo: num-- })
        if (num === -1) { 
          clearInterval(timer)
          this.setState({ textTwo: '获取验证码' })
        }
      }, 1000)
    }
  }
 
  nacodeOne=()=>{
    this.nacode({ "mobile": this.state.phone, "type": 'venuebinding' })
  }
  nacodeTwo=()=>{
    this.nacodeTwo({ "mobile": this.state.phoneTwo, "type": 'venuebinding' })
  }
  codeOne=e=>{
    this.setState({codeOne:e.target.value})
  }
  codeTwo=e=>{
    this.setState({codeTwo:e.target.value})
  }
  
  async VenueBindingPhone(data) {
    const res = await VenueBindingPhone(data,localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      message.info(res.data.msg)
      this.props.history.goBack()
    }
  }


  submit=()=>{
  
    let {phone,phoneTwo,codeOne,codeTwo}=this.state
    this.VenueBindingPhone({legalphone:phone,legalcode:codeOne,operatorphone:phoneTwo,operatorcode:codeTwo})

  }
        
  reture=()=>{
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="untiePhonePh">
        <div className="headTitle"><Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%'}}/>解除绑定手机号</div>
         <div className="listSon">
           <Input maxLength={11} onChange={this.phone} placeholder="请输入法人手机号" />
         </div>
         <div className="listSon">
           <Input maxLength={11} placeholder="请输入验证码" onChange={this.codeOne} /><span onClick={this.state.textT==='获取验证码'?this.nacodeOne:this.ko}>{this.state.textT}</span>
         </div>

         <div className="listSon">
           <Input maxLength={11} onChange={this.phoneTwo} placeholder="请输入操作员手机号" />
         </div>

         <div className="listSon">
           <Input maxLength={11} placeholder="请输入验证码" onChange={this.codeTwo} /><span onClick={this.state.textTwo==='获取验证码'?this.nacodeTwo:this.ko}>{this.state.textTwo}</span>
         </div>
         <div className="btn" onClick={this.submit}>提交</div>
      </div>
    )
  }
}

export default untiePhonePh;