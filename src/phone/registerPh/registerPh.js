import React from 'react';
import './registerPh.css';
import { Button, Input, Checkbox, Popconfirm, Icon,message,Modal } from 'antd';
import { _register, _code, getPromoteName } from '../../api';

class registerPh extends React.Component {

  state = {
    Id: '',//推广员Id
    name: '',//用户名
    phone: '',//手机号
    code: '',//验证码
    password: '',//密码
    passwordT: '',//确认密码
    changeRadio: 'false',//是否选中协议
    visible: false,
    textT: '获取验证码',
    visibleName: false,
    idName: '',
    qipao: true,
  };

  componentDidMount() {

  }



  changID = (e) => {
    this.setState({ Id: e.target.value })
  }
  changeName = (e) => {

    if (/[\u4E00-\u9FA5]/g.test(e.target.value)) {
      this.setState({ visibleName: true })
    } else if (e.target.value === '') {
      this.setState({ visibleName: true })
    } else {
      this.setState({ name: e.target.value, visibleName: false })
    }
  }
  changePhone = (e) => {
      this.setState({ phone: e.target.value })
  }
  changeCode = (e) => {
    this.setState({ code: e.target.value })
  }
  changePassword = (e) => {
    this.setState({ password: e.target.value })
  }
  changePasswordT = (e) => {
    this.setState({ passwordT: e.target.value })
  }
  changeRadio = e => {
    this.setState({ changeRadio: e.target.checked })
  }

  async Ko(data) {
    const res = await _register(data)
    console.log(res)
    if (res.data.code === 2000) {
      setTimeout(() => {
        this.setState({
          visible: true,
        });
      }, 1000)
      sessionStorage.setItem('uuid', res.data.data.venueloginuuid);
      sessionStorage.setItem('venue_token', res.data.data.token);
      sessionStorage.setItem('name', res.data.data.name);
    } else {
      message.error(res.data.msg)
    }


  }

  async nacode(data) {
    const res = await _code(data)
    if(res.data.code!==2000){
      message.error(res.data.msg)
    }else{
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
    }
  }

  naCode = () => {
      this.nacode({ "mobile": this.state.phone, "type": 'venueregister' })
  }

  showModal = e => {
   if (this.state.changeRadio !== true) {
      message.error('请勾选阅读协议')
    }else if(this.state.password!==this.state.passwordT){
        message.error('两次密码输入不一致')
    } else {
      const { Id, name, phone, code, password } = this.state
      const data = { name: name, phone: phone, pass: password, promoteid: Id, code: code, Logintype: 'mobile' }
      this.Ko(data)
    }
  }
  blurId = e => {
  
    this.getPromoteName({ promotid: e.target.value })
  }
  async getPromoteName(data) {
    const res = await getPromoteName(data)
    if (res.data.code === 2000) {
      this.setState({ idName:'推广员姓名：'+ res.data.data.promotname+'?', qipao: false })
    } else {
      this.setState({ idName:'您没有推广员？', qipao: false })
    }
  }





  render() {
    return (
      <div className="registerPh">
        <div className="title"> <span style={{ color: '#D85D27' }}>注册 ></span> <span>完善信息 ></span> <span>审核  ></span> <span>成功  ></span> </div>
        <div className="bossInput">

          <div className="input">
            <Input  onChange={this.changID} onBlur={this.blurId} autoFocus prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={6} placeholder="请填写推广员ID号，没有可不填" />
          </div>

          <div className="input">
            <Input  onBlur={this.changeName} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
          </div>

          <div className="input">
            <Input  onChange={this.changePhone} prefix={<Icon type="phone"  style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11} placeholder="请输入手机号" />
          </div>

          <div className="input">
            <Input  onChange={this.changeCode} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} className="codeInput" maxLength={6} placeholder="手机验证码" />
            <div className="codeBtn" onClick={this.state.textT==='获取验证码'?this.naCode:''} >{this.state.textT}</div>
          </div>


          <div className="input">
            <Input.Password  onChange={this.changePassword} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={8} placeholder="密码" />
          </div>
          <div className="input">
            <Input.Password  onChange={this.changePasswordT} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={8} placeholder="确认密码" />
          </div>
          <div className="input line">
            <Checkbox onChange={this.changeRadio}><span>已阅读并同意</span><span style={{ color: '#D85D27', paddingLeft: '0.5rem' }}>《用户协议》</span></Checkbox>
          </div>
          <div className="input line">
            <Popconfirm
              title={this.state.idName}
              onConfirm={this.showModal}
              okText="是"
              cancelText="否"
              disabled={this.state.qipao}
            >
              <div className="btn">注册</div>
            </Popconfirm>

          </div>

          <Modal
                title="注册结果"
                cancelText=''
                closable={false}
                footer={null}
                visible={this.state.visible}
                onOk={this.handleOk}
                width='100%'
              >
                <img className="logoRegister" src={require("../../assets/icon_pc.png")} alt="ico" />
                <span className="modelTitle">恭喜您，注册成功</span>
                <span className="modelPhone">用户名:{this.state.name}</span>
                <Button className="modelBtnPh"><a href="#/stadiumInformationPh">下一步</a></Button>
              </Modal>
        </div>
      </div>
    );
  }
}

export default registerPh;