import React from 'react';
import './statusAudits.css';
import 'antd/dist/antd.css';
import { getIsStatus } from '../../api';
import { message } from 'antd';

class statusAudits extends React.Component {


  state = {
    islegal: '',
    content: '',
  };

  async getIsStatus(data) {
    const res = await getIsStatus(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      sessionStorage.clear()
      message.error('登录超时请重新登录!')
    }else if(res.data.code===2000){
      this.setState({ content: res.data.data.content, islegal: res.data.data.islegal })
      sessionStorage.setItem('islegal',res.data.data.islegal)
      sessionStorage.setItem('isqult',res.data.data.isqult)
      sessionStorage.setItem('issite',res.data.data.issite)
    }
  
  }
  componentDidMount() {
    this.getIsStatus()
    let that=this
    window.addEventListener("popstate", function(e) { 
      that.props.history.replace('/#')
      }, false);
  }

  login = () => {
    this.props.history.replace('/#')
    sessionStorage.removeItem('venue_token')
  }

  perfect = () => {
    this.props.history.replace('/perfect')
    sessionStorage.setItem('notType', 1)
  }





  render() {
    return (
      <div className="statusAudits">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 53, height: 53, marginLeft: 45, marginTop: 13.5 }} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>
        </div>
        <div className={this.state.islegal === 0 ? 'content' : 'hidden'} >
          <div className="nav">
            <div><span>1.填写注册信息</span><img src={require("../../assets/oneline.png")} alt="5" /></div>
            <div><span>2.完善场馆信息</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
            <div><span>3.等待审核</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
            <div><span>4.审核成功</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
          </div>
          <div className="imgtitle">
            <img className="img" src={require("../../assets/icon_pc.png")} alt="" />
            <span className="titleText">信息完善成功！等待审核</span>
            <div className="footer">
              <span>我们会在3个工作日完成审核。</span>
              <span>审核成功后会发送短信到您绑定的手机号，请注意查收。</span>
              <span>联系电话：010-80895077</span>

            </div>
          </div>
        </div>

        <div className={this.state.islegal === 1 ? 'content' : 'hidden'} >
          <div className="nav">
            <div><span>1.填写注册信息</span><img src={require("../../assets/oneline.png")} alt="5" /></div>
            <div><span>2.完善场馆信息</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
            <div><span>3.等待审核</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
            <div><span style={this.state.islegal === 1?{color:'#fff'}:{}}>4.审核成功</span><img src={this.state.islegal === 1 ? require("../../assets/lineThree.png"):require("../../assets/twoline.png")} alt="5" /></div>
          </div>
          <div className="imgtitle">
            <img className="img" src={require("../../assets/icon_pc_statusT.png")} alt="" />
            <span className="titleText">恭喜您！审核成功</span>
            <span className="nowKo">您的用户名：{sessionStorage.getItem('name')}，可以用操作人员手机号登录，也可以用法人手机号登录</span>
            <a href="#/home" className="a">首次进入场馆端首页>></a>
          </div>
        </div>


        <div className={this.state.islegal === 2 ? 'content' : 'hidden'} >
          <div className="nav">
            <div><span>1.填写注册信息</span><img src={require("../../assets/oneline.png")} alt="5" /></div>
            <div><span>2.完善场馆信息</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
            <div><span>3.等待审核</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
            <div><span style={{color:'#fff'}}>4.审核结果</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
          </div>
          <div className="imgtitle">
            <img className="img" src={require("../../assets/icon_pc_statusR.png")} alt="" />
            <span className="titleText">抱歉！未通过审核</span>
            <div className="footer">
              <span>审核未通过原因如下：</span>
              <span>您的<span style={{ color: '#F5A623' }}>{this.state.content}</span>未通过审核，请返回修改</span>
              <span>联系电话：010-80895077</span>
              <span style={{ fontSize: '14px', color: '#F5A623', cursor: 'pointer' }} onClick={this.perfect}> 返回修改信息 </span>
              <span style={{ fontSize: '14px', color: '#F5A623', cursor: 'pointer' }} onClick={this.login}>返回重新登录</span>
            </div>
          </div>
        </div>



      </div>
    );
  }
}

export default statusAudits;