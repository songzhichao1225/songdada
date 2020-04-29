import React from 'react';
import './loginPh.css';
import 'antd/dist/antd.css';
import Icon from '@ant-design/icons';
class loginPh extends React.Component {

  state = {

  };

  componentDidMount() {
    let query = window.location.href
    let arr = query.split('&')
    if (arr[1]!== undefined) {
      if (localStorage.getItem('phone') === arr[1].slice(6, 17)) {

      } else {
        localStorage.clear()
        this.props.history.push('/login')
      }
    }
   if(localStorage.getItem('venue_token')){
    this.props.history.push('/homePh')
   }
  }

  login=()=>{
    this.props.history.push('/login')
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
      <div className="loginPh">
          <Icon type="close" onClick={this.close} style={{ position:'absolute', left: '5%', top: '1.5%',zIndex:'99' }} />
        <div className="banner">   
          <div className="title">成为合作场馆</div>
          <div className="titleBottom">免费引流到店，大幅提高场馆收入</div>
          <div className="loginBtn" onClick={this.login}>登录</div>
        </div>
        <div className="center">
          <img src={require("../../assets/phoneOne (1).png")} alt=""/>
        </div>
        <div className="footerBtn" onClick={this.login}>登录/注册成为合作场馆</div>

      </div>
    );
  }
}

export default loginPh;