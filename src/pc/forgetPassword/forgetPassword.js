import React from 'react';
import './forgetPassword.css';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

class forgetPassword extends React.Component {

  state = {
    equipment: 1,//登录设备 0pc 1移动设备
  };

  componentDidMount() {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    var goUrl = 0;
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf(mobileAgents[index]) > -1) {
        goUrl = 1;
        break;
      }
    }
    if (goUrl === 1) {
      this.setState({ equipment: 1 })
    } else {
      this.setState({ equipment: 0 })
    }
  }



  render() {
    return (
      <div className="forgetPassWord">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>

          <div className="content">
            <span className="title">忘记密码</span>
            <Form>
              <Form.Item >
                <div className="son">
                  <span>手机号码</span>
                  <Input className="phone" type="number" /><Button className="huoBtn">获取验证码</Button>
                </div>
                <div className="son">
                  <span>验证码</span>
                  <Input className="phone code" />
                </div>

                <div className="son">
                  <span>新密码</span>
                  <Input className="phone code" />
                </div>
                <div className="son">
                  <span>确认密码</span>
                  <Input className="phone confirm" />
                </div>
              </Form.Item>

             <Form.Item>
              <Button className="confirmBtn">确定</Button>


             </Form.Item>
            </Form>



          </div>





        </div>


      </div>
    );
  }
}
export default forgetPassword;