import React from 'react';
import './sittingPh.css';
import {Switch,message,Icon } from 'antd';
import {VenueIsClose,getVenueIsClose } from '../../api';


class sittingPh extends React.Component {

  state = {
    flag:false,
  };


  async getVenueIsClose(data) {
    const res = await getVenueIsClose(data,localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      if(res.data.data.isclose===1){
        this.setState({flag:true})
      }else{
        this.setState({flag:false})
      }
    }
  }

  async VenueIsClose(data) {
    const res = await VenueIsClose(data,localStorage.getItem('venue_token'))
       if(res.data.code===2000){
         message.info(res.data.msg)
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
  reture=()=>{
    this.props.history.goBack()
  }
  
  exitLogin=()=>{
    this.props.history.replace('/login')
    localStorage.removeItem('venue_token')
  }

  render() {
    return (
      <div className="sittingPh">
        <div className="headTitle"><Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%'}}/>设置</div>
        <div className="siteSon"><img src={require("../../assets/closeYuyue.png")} alt="icon"/><span>关闭场地预约</span><Switch className="switch" checked={this.state.flag} onChange={this.onChange} /></div>
        
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

        <div className="siteSon" onClick={this.exitLogin}>
          <svg t="1571739117706" style={{float:'left'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8015" id="mx_n_1571739117707" width="16" height="16"><path d="M1010.152 905.832c0 58.4-47.344 105.744-105.744 105.744H117.68c-58.4 0-105.736-47.344-105.736-105.744v-786.72c0-58.4 47.336-105.736 105.736-105.736h786.728c58.4 0 105.744 47.336 105.744 105.736v786.72z" fill="#4D54A3" p-id="8016"></path><path d="M512.392 212.192a49.736 49.736 0 0 0-49.728 49.736v248.688a49.736 49.736 0 0 0 49.728 49.736 49.736 49.736 0 0 0 49.728-49.736V261.928a49.744 49.744 0 0 0-49.728-49.736z m0 641.96c-175.688 0-318.648-142.96-318.648-318.648 0-98.2 44.272-189.416 121.432-250.328a37.296 37.296 0 1 1 46.216 58.576C302.28 390.4 268.376 460.288 268.376 535.504c0 134.544 109.472 244.04 244.032 244.04 134.552 0 244.024-109.488 244.024-244.04 0-75.232-33.92-145.144-93.104-191.784a37.296 37.296 0 1 1 46.184-58.6c77.232 60.888 121.528 152.152 121.528 250.384 0 175.68-142.96 318.648-318.648 318.648z m0 0" fill="#F7F8F8" p-id="8017"></path></svg>
          <span>退出登录</span>
          <img className="switch" style={{width:'0.44rem',height:'0.6rem',marginTop:'0.5rem'}} src={require("../../assets/right.png")} alt="arrow"/>
        </div>

      </div>
    )
  }
}

export default sittingPh;