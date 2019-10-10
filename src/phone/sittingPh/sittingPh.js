import React from 'react';
import './sittingPh.css';
import {Switch,message } from 'antd';
import {VenueIsClose,getVenueIsClose } from '../../api';


class sittingPh extends React.Component {

  state = {
    flag:null,
  };


  async getVenueIsClose(data) {
    const res = await getVenueIsClose(data,sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      
      this.setState({flag:res.data.data.isclose})
    }
  }

  async VenueIsClose(data) {
    const res = await VenueIsClose(data,sessionStorage.getItem('venue_token'))
       if(res.data.code===2000){
        this.getVenueIsClose()
       }
  }
  
  componentDidMount() {
    this.getVenueIsClose()
  }
         
  onChange=(e)=>{
     this.setState({flag:e})
     if(e===false){
      this.VenueIsClose({close:0})
     }else if(e===true){
      this.VenueIsClose({close:1})
     }
    
  }
  temporaryPh=()=>{
    this.props.history.push('/homePh/temporaryPh')
  }

  untiePhonePh=()=>{
    this.props.history.push('/homePh/untiePhonePh')
  }
  resetPasswordPh=()=>{
    this.props.history.push('/homePh/resetPasswordPh')
  }

  render() {
    return (
      <div className="sittingPh">
        <div className="headTitle">设置</div>
        <div className="siteSon"><img src={require("../../assets/closeYuyue.png")} alt="icon" /><span>关闭场地预约</span><Switch className="switch" defaultChecked={this.state.flag===1?true:false} onChange={this.onChange} /></div>
        <div className="siteSon" onClick={this.temporaryPh}>
          <img src={require("../../assets/linshi.png")} alt="icon"/>
          <span>设置临时关闭预约时间</span>
          <img className="switch" style={{width:'0.44rem',height:'0.6rem',marginTop:'0.5rem'}} src={require("../../assets/right.png")} alt="arrow"/>
        </div>
        <div className="siteSon" onClick={this.untiePhonePh}>
          <img src={require("../../assets/phoneteo.png")} alt="icon"/>
          <span>解除/更换绑定手机号</span>
          <img className="switch" style={{width:'0.44rem',height:'0.6rem',marginTop:'0.5rem'}} src={require("../../assets/right.png")} alt="arrow"/>
        </div>
        <div className="siteSon" onClick={this.resetPasswordPh}>
          <img src={require("../../assets/mineSite.png")} alt="icon"/>
          <span>重置密码</span>
          <img className="switch" style={{width:'0.44rem',height:'0.6rem',marginTop:'0.5rem'}} src={require("../../assets/right.png")} alt="arrow"/>
        </div>
        
      </div>
    )
  }
}

export default sittingPh;