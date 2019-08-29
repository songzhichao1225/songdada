import React from 'react';
import './registerPh.css';
import 'antd/dist/antd.css';


class registerPh extends React.Component {

  state = {

  };

  componentDidMount() {

  }

 



  render() {
    return (
      <div className="registerPh">
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

        </div>

      </div>
    );
  }
}

export default registerPh;