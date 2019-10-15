import React from 'react';
import './statusAudits.css';
import 'antd/dist/antd.css';
import { getIsStatus} from '../../api';
import {message} from 'antd';

class statusAudits extends React.Component {
  

state = {
  islegal:'',
};

async getIsStatus(data) {
  const res = await getIsStatus(data,sessionStorage.getItem('venue_token'))
   if(res.data.code===4001){
    this.props.history.push('/')
    message.error('登陆超时请重新登陆！')
  } 
  this.setState({islegal:res.data.data.islegal})

}
componentDidMount() {
this.getIsStatus()

}





render() {
return (
<div className="statusAudits">
  <div className="header">
    <div className="heCenter">
      <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 173, height: 58, marginLeft: 45, marginTop: 40 }} alt="6666" />
      <span className="title">北京甲乙电子商务有限公司</span>
    </div>
  </div>
  <div className={this.state.islegal===0?'content':'hidden'} >
    <div className="nav">
      <div>1.填写注册信息</div>
      <div>2.完善场馆信息</div>
      <div>3.等待审核</div>
      <div>4.审核成功</div>
    </div>
    <div className="imgtitle">
      <img className="img" src={require("../../assets/icon_pc.png")} alt="" />
      <span className="titleText">信息完善成功！等待审核</span>
      <div className="footer">
        <span>我们会在3个工作日完成审核。</span>
        <span>审核成功后会发送短信到您绑定的手机，请注意查收。</span>
        <span>联系电话：010-89781234</span>

      </div>
    </div>
  </div>

  <div className={this.state.islegal===1?'content':'hidden'} >
    <div className="nav">
      <div>1.填写注册信息</div>
      <div>2.完善场馆信息</div>
      <div>3.等待审核</div>
      <div className={this.state.islegal===1?'imgFour':''}>4.审核成功</div>
    </div>
    <div className="imgtitle">
      <img className="img" src={require("../../assets/icon_pc_statusT.png")} alt="" />
      <span className="titleText">恭喜您！审核成功</span>
       <span className="nowKo">您的用户名：{sessionStorage.getItem('name')}，也可以用操作人员手机登录</span>
       <a href="#/home" className="a">首次进入场馆端首页>></a>
    </div>
  </div>


  <div className={this.state.islegal===2?'content':'hidden'} >
    <div className="nav">
      <div>1.填写注册信息</div>
      <div>2.完善场馆信息</div>
      <div>3.等待审核</div>
      <div>4.审核成功</div>
    </div>
    <div className="imgtitle">
      <img className="img" src={require("../../assets/icon_pc_statusR.png")} alt="" />
      <span className="titleText">抱歉！未通过审核</span>
      <div className="footer">
        <span>审核未通过原因如下：</span>
        <span>您的{}、{}未通过审核，请修改</span>
        <span>联系电话：010-89781234</span>
        <a href="#/qualification" className="at"> 返回修改信息 </a>
      </div>
    </div>
  </div>



</div>
);
}
}

export default statusAudits;