import React from 'react';
import './forgetPassword.css';
import 'antd/dist/antd.css';
import { _code, VenueSelectSiteName,VenueForgetPass } from '../../api';
import { Form, Input, Button, message,Radio } from 'antd';

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

  async VenueSelectSiteName(data) {
    const res = await VenueSelectSiteName(data)
    if (res.data.code === 2000) {
      this.setState({selectVeun:res.data.data,value:res.data.data[0].venueloginuuid})
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.phone, "type": 'venueforgetpass' })
    }
  }

  componentDidMount() {

  }




  phoneChange = e => {
    this.setState({ phone: e.target.value })
  }
  async nacode(data) {
    const res = await _code(data)
    console.log(res)

  }
  naCode = () => {
    if (this.state.phone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))) {
      this.VenueSelectSiteName({ phone: this.state.phone })
    } else {
      message.error('请输入手机号')
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
       message.info('密码修改成功')
       this.props.history.goBack()
    }else{
      message.error(res.data.msg)
    }

  }
  comfir=()=>{
    let {phone,value,code,pass,passTwo}=this.state
    console.log(phone,value,code,pass,passTwo)
    if(pass===passTwo){
      this.VenueForgetPass({phone:phone,pass:passTwo,code:code,venueloginuuid:value})
    }
  }




  render() {
    return (
      <div className="forgetPassWord">
        <div className="header">
          <div className="heCenter">
            <img className="logo" style={{ width: 173, height: 58, marginLeft: 45, marginTop: 40 }} src={require("../../assets/tiaozhanicon.png")} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>

          <div className="content">
            <span className="title">忘记密码</span>
            <Form>
              <Form.Item >
                <div className="son">
                  <span style={{ float: 'left', marginLeft: 17 }}>手机号码</span>
                  <Input style={{ float: 'left' }} maxLength={11} className="phone" onChange={this.phoneChange} />
                  <div className={this.state.textT === '获取验证码' ? 'huoBtn' : 'koohidden'} onClick={this.naCode} >
                    {this.state.textT}
                  </div>
                  <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'huoBtn'} >
                    {this.state.textT}
                  </div>
                </div>
                </Form.Item>

                <Form.Item className={this.state.selectVeun.length>0?'selectVeun':'selectVeunNone'}>
                <div > 

                  <Radio.Group className="radio" onChange={this.onChange} value={this.state.value}>
                   
                    {
                      this.state.selectVeun.map((item,i)=>(
                        <Radio key={i} value={item.venueloginuuid}>{item.name}</Radio>
                      ))
                    }
                  
                  </Radio.Group>


                </div>
                </Form.Item>
                <Form.Item>
                <div className="son">
                  <span>验证码</span>
                  <Input onChange={this.code} maxLength={6} className="phone code" />
                </div>
                </Form.Item>
                <Form.Item>
                <div className="son">
                  <span>新密码</span>
                  <Input onChange={this.pass} maxLength={8} className="phone code" />
                </div>
                </Form.Item>
                <Form.Item>
                <div className="son">
                  <span>确认密码</span>
                  <Input onChange={this.passTwo} maxLength={8} className="phone confirm" />
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