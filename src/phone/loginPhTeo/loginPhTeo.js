import React from 'react';
import './loginPhTeo.css';
import 'antd/dist/antd.css';


class loginPhTeo extends React.Component {

  state = {

  };

  componentDidMount() {


  }
  corporatePh=()=>{
    this.props.history.push('/corporateLogin')
  }

  registerPh=()=>{
    this.props.history.push('/registerPh')
  }



  render() {
    return (
      <div className="loginPhTeo">
        <div className="loginInput">
          <div className="name">
            <input className="phone" maxLength={11} type="number" placeholder="用户名/手机号" />
          </div>
          <div className="name">
            <input className="phone" type='password' maxLength={8} placeholder="请输入密码" />
            <span>忘记密码</span>
          </div>
          <div className="loginBtn">登录</div>
          <div className="footer" style={{marginTop:'1rem'}}>
            <span onClick={this.corporatePh}>法人手机号登录</span>
            <span onClick={this.registerPh}>新用户注册</span>
          </div>
        </div>

      </div>
    );
  }
}

export default loginPhTeo;