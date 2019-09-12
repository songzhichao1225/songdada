import React from 'react';
import './resultsAuditsPh.css';
import {  } from 'antd';


class resultsAuditsPh extends React.Component {

  state = {

  };

  componentDidMount() {

  }





  render() {
    return (
      <div className="resultsAuditsPh">
        <div className="title"> <span style={{ color: '#D85D27' }}>注册 ></span> <span style={{ color: '#D85D27' }}>完善信息 ></span> <span style={{ color: '#D85D27' }}>审核  ></span> <span>成功  ></span> </div>
         <div className="boss">
              <img className="icon" src={require("../../assets/icon_pc.png")} alt="图标"/>
              <span className="text">信息完善成功！等待审核</span>
               <span className="content">我们会在3个工作日完成审核。<br/> 审核成功后会发送短信到您绑定的手机，请注意查收。<br/>联系电话：010-88777777 </span>
         </div>


         <div className="boss">
              <img className="icon" src={require("../../assets/icon_pc.png")} alt="图标"/>
              <span className="text">抱歉！未通过审核</span>
               <span className="content">审核未通过原因如下:<br/> 您的身份证照片、银行卡号未通过审核，请修改<br/>联系电话：010-88777777 </span>
                
         </div>


           
      </div>
    );
  }
}

export default resultsAuditsPh;