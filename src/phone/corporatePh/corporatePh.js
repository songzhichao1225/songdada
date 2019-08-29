import React from 'react';
import './corporatePh.css';
import 'antd/dist/antd.css';


class corporatePh extends React.Component {

  state = {

  };

  componentDidMount() {

  }

  loginPhTeo=()=>{
    this.props.history.goBack();
  }
  registerPh=()=>{
    this.props.history.push('/registerPh')
  }


  render() {
    return (
      <div className="corporatePh">
        <div className="loginInput">
          <div className="name">
            <input className="phone" maxLength={11} type="number" placeholder="法人手机号" />
          </div>
          <div className="name">
            <input className="phone" type='password' maxLength={8} placeholder="手机验证码" />
            <div className="obtain">获取验证码</div>
          </div>

          <div className="name">
            <input className="phone" type='password' maxLength={8} placeholder="请输入密码" />
            <span>忘记密码</span>
          </div>

          <div className="loginBtn">登录</div>
          <div className="footer" style={{ marginTop: '1rem' }}>
            <span onClick={this.loginPhTeo}>普通用户登录</span>
            <span onClick={this.registerPh}>新用户注册</span>
          </div>
        </div>
      </div>
    );
  }
}

export default corporatePh;