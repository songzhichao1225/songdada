import React from 'react';
import './forgetPassword.css';
import 'antd/dist/antd.css';
import { _code,VenueForgetPass } from '../../api';
import { Form, Input, Button, message } from 'antd';

class forgetPassword extends React.Component {

  state = {
    textT: '获取验证码',
    selectVeun:[],
    phone: '',
    value:'',
    code:'',
    pass:'',
    passTwo:'',
  };

  async _code(data) {
    const res = await _code(data)
    if (res.data.code === 2000) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      
    }else{
      message.error(res.data.msg)
    }
  }

  componentDidMount() {

  }




  phoneChange = e => {
    this.setState({ phone: e.target.value })
  }
 
  naCode = () => {
    if (this.state.phone === '') {
     
      message.error('请输入手机号')
    }else if((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))===false){

      message.error('请输入正确手机号')
    } else {
      this._code({ mobile: this.state.phone,type:'venueforgetpass' })
    }
  }
  onChange=e=>{
    this.setState({value:e.target.value})
  }
  code=e=>{
    this.setState({code:e.target.value})
  }
  pass=e=>{
    this.setState({pass:e.target.value})
  }
  passTwo=e=>{
    this.setState({passTwo:e.target.value})
  }
  
  async VenueForgetPass(data) {
    const res = await VenueForgetPass(data)
    if(res.data.code===2000){
       message.success('密码修改成功')
       this.props.history.goBack()
    }else{
      message.error(res.data.msg)
    }

  }
  comfir=()=>{
    let {phone,value,code,pass,passTwo}=this.state
    if(pass===passTwo){
      this.VenueForgetPass({phone:phone,pass:passTwo,code:code,venueloginuuid:value})
    }else{
      message.error('两次密码输入不一致')
    }
  }




  render() {
    return (
      <div className="forgetPassWord">
        <div className="header">
          <div className="heCenter">
            <img className="logo" style={{ width: 53, height: 53, marginLeft: 45, marginTop:13.5 }} src={require("../../assets/tiaozhanicon.png")} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>

          <div className="content">
            <span className="title">忘记密码</span>
            <Form>
              <Form.Item >
                <div className="son">
                  <span style={{ float: 'left',lineHeight:'45px' }}>手机号码</span>
                  <Input style={{ float: 'left' }}  placeholder="请输入操作员手机号" maxLength={11} className="phone" onChange={this.phoneChange} />
                 
                </div>
                </Form.Item>

                <Form.Item>
                <div className="son">
                  <span style={{float:'left'}}>验证码</span>
                  <Input onChange={this.code} style={{float:'left',width:'176px',marginLeft:'50px'}} placeholder="请输入验证码" maxLength={6} className="phone code" />
                  <div className={this.state.textT === '获取验证码' ? 'huoBtn' : 'koohidden'} onClick={this.naCode} >
                    {this.state.textT}
                  </div>
                  <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'huoBtn'} >
                    {this.state.textT}
                  </div>
                </div>
                <div className="son" style={{opacity:0,position:'absolute'}}>
                  <span>验证码</span>
                  <Input onChange={this.code}  maxLength={6} className="phone code" />
                </div>
                </Form.Item>
                <Form.Item>
                <div className="son" style={{opacity:0,position:'absolute'}}>
                  <span>验证码</span>
                  <Input.Password onChange={this.code} maxLength={6} className="phone code" />
                </div>
                <div className="son">
                  <span style={{float:'left',lineHeight:'60px'}}>新密码</span>
                  <Input.Password onChange={this.pass} maxLength={8} placeholder="请输入新密码" className="phone code" />
                </div>
                
                </Form.Item>
                <Form.Item>
                <div className="son">
                  <span style={{float:'left',lineHeight:'60px'}}>确认密码</span>
                  <Input.Password onChange={this.passTwo} maxLength={8} placeholder="请确认密码" className="phone confirm" />
                </div>
                </Form.Item>
              <Form.Item>

                <Button className="confirmBtn" onClick={this.comfir}>确定</Button>

              </Form.Item>
            </Form>



          </div>





        </div>


      </div>
    );
  }
}
export default forgetPassword;