import React from 'react';
import './resetPasswordPh.css';
import {Input,Icon } from 'antd';
import { } from '../../api';


class resetPasswordPh extends React.Component {

  state = {
   
  };


 
  componentDidMount() {
   
  }
          
  
  reture=()=>{
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="resetPasswordPh">
       <div className="headTitile"><Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%'}}/>重置密码</div>
       
       <div className="listSon">
        <Input maxLength={11} placeholder="请输入法人/操作员手机号"/>
       </div>

       <div className="listSon">
        <Input  placeholder="请输入验证码"/><span>获取验证码</span>
       </div>

       <div className="listSon">
        <Input placeholder="请输入新密码"/>
       </div>
       <div className="listSon">
        <Input  placeholder="请确认密码"/>
       </div>

      </div>
    )
  }
}

export default resetPasswordPh;