import React from 'react';
import './resultsAuditsPh.css';
import { Icon } from 'antd';
import { getIsStatus } from '../../api';

class resultsAuditsPh extends React.Component {

  state = {
    islegal:0,
    content:'',
  };

  async getIsStatus(data) {
    const res = await getIsStatus(data,localStorage.getItem('venue_token'))
   if(res.data.code===2000){
     this.setState({islegal:res.data.data.islegal,content:res.data.data.content})
   }
  }

  componentDidMount() {
   this.getIsStatus()
  }

  goback=()=>{
    this.props.history.push('./stadiumInformationPh')
  }
  homePh=()=>{
    this.props.history.push('./homePh')
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



  render() {
    return (
      <div className="resultsAuditsPh">
        <div className="title"> <span style={{ color: '#D85D27' }}>注册 ></span> <span style={{ color: '#D85D27' }}>完善信息 ></span> <span style={{ color: '#D85D27' }}>审核  ></span> <span  style={this.state.islegal===1?{color: '#D85D27' }:{color:'#9B9B9B'}}>成功</span> <Icon type="close" onClick={this.close} style={{ position: 'absolute', right: '5%', top: '35%' }} /> </div>
         <div className="boss" style={this.state.islegal===0?{display:'block'}:{display:'none'}}>
              <img className="icon" src={require("../../assets/icon_pc.png")} alt="图标"/>
              <span className="text">信息完善成功！等待审核</span>
               <span className="content">我们会在3个工作日完成审核。<br/> 审核成功后会发送短信到您绑定的手机，请注意查收。<br/>联系电话：010-88777777 </span>
         </div>
         <div className="boss" style={this.state.islegal===2?{display:'block'}:{display:'none'}}>
              <img className="icon" src={require("../../assets/no.png")} alt="图标"/>
              <span className="text">抱歉！未通过审核</span>
               <span className="content">审核未通过原因如下:<span style={{color:'#D85D27'}}>{this.state.content}</span><br/>联系电话：010-88777777 </span>
                <span onClick={this.goback} style={{color:'#D85D27',marginLeft:'1rem'}}> 返回修改信息 </span>
         </div>
         <div className="boss" style={this.state.islegal===1?{display:'block'}:{display:'none'}}>
              <img className="icon" src={require("../../assets/yes.png")} alt="图标"/>
              <span className="text">恭喜您！审核通过</span>
               <span className="content">审核成功后会发送短信到您绑定的手机上，请注意查收 </span>
               <span onClick={this.homePh} style={{color:'#D85D27',paddingLeft:'1rem'}}>点击进入场馆端首页</span>
         </div>


           
      </div>
    );
  }
}

export default resultsAuditsPh;