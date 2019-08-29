import React from 'react';
import './forgetPassword.css';
import 'antd/dist/antd.css';
import { _code,VenueSelectSiteName} from '../../api';
import { Form, Input, Button,message } from 'antd';

class forgetPassword extends React.Component {

  state = {
    equipment: 1,//登录设备 0pc 1移动设备
    phone:'',
    textT:'获取验证码',
  };

  async VenueSelectSiteName(data) {
    const res = await VenueSelectSiteName(data)
    console.log(res)
    let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.phone, "type": 'venuesavepass' })

  }

  componentDidMount() {
   
  }

 


  phoneChange=e=>{
    this.setState({phone:e.target.value})
  }
  async nacode(data) {
    const res = await _code(data)
    console.log(res)

  }
  naCode = () => {
    if (this.state.phone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))) {
      this.VenueSelectSiteName({phone:this.state.phone})
    } else {
      message.error('请输入手机号')
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
                  <span style={{float:'left',marginLeft:17}}>手机号码</span>
                  <Input style={{float:'left'}} className="phone" onChange={this.phoneChange} />
                  <div  className={this.state.textT === '获取验证码' ? 'huoBtn' : 'koohidden'}  onClick={this.naCode} >
                      {this.state.textT}
                    </div>
                    <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'huoBtn'} onClick={this.naCode}>
                      {this.state.textT}
                    </div>
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