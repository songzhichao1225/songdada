import React from 'react';
import './loginPh.css';
import 'antd/dist/antd.css';


class loginPh extends React.Component {

  state = {

  };

  componentDidMount() {

  }

  login=()=>{
    this.props.history.push('/login')
  }



  render() {
    return (
      <div className="loginPh">
        <div className="banner">
          <div className="title">成为合作场馆</div>
          <div className="titleBottom">免费引流到店，大幅提高场馆收入</div>
          <div className="loginBtn" onClick={this.login}>登录</div>
        </div>
        <div className="center">
          <img src={require("../../assets/phoneOne (1).png")} alt=""/>
        </div>
        <div className="footer">
          <img src={require("../../assets/phoneOne (2).png")} alt=""/>
        </div>
        <div className="footerBtn" onClick={this.login}>登录/注册成为合作场馆</div>


      </div>
    );
  }
}

export default loginPh;