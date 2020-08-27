import React from 'react';
import './registerPh.css';

import { Toast, InputItem, Modal, Button, NavBar, Popover,Checkbox } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {EllipsisOutlined,LeftOutlined} from '@ant-design/icons';
import { _register, _code, getPromoteName, getIsUserName } from '../../api';
const Item = Popover.Item;
class registerPh extends React.Component {

  state = {
    Id: '',//推广员Id
    name: '',//用户名
    phone: '',//手机号
    code: '',//验证码
    password: '',//密码
    passwordT: '',//确认密码
    changeRadio: false,//是否选中协议
    visible: false,
    textT: '获取验证码',
    visibleName: false,
    idName: '没有推广员？',
    qipao: true,
    eyes:false,
    eyesTwo:false,
  };

  componentDidMount() {
    if(sessionStorage.getItem('register')!==null){
      let h=JSON.parse(sessionStorage.getItem('register'))
      console.log(h.changeRadio)
      this.setState({
        Id:h.Id,
        name:h.name,
        phone:h.phone,
        code:h.code,
        password:h.password,
        passwordT:h.passwordT,
        changeRadio:h.changeRadio,
        idName:h.idName
      })
    }
  }

  changID = (e) => {
    this.setState({ Id: e })
  }



  async getIsUserName(data) {
    const res = await getIsUserName(data)
    if (res.data.code === 2000) {
      this.setState({ name: data.name })
    } else {
      Toast.fail(res.data.msg, 2);
    }
  }

  changeNameKo=e=>{
    if (e.indexOf('①') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('②') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('③') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('④') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('⑤') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('⑥') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('⑦') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('⑧') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    } else if (e.indexOf('⑨') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    }else if (e.indexOf(' ') !== -1) {
      this.setState({ name: e.slice(0, e.length - 1) })
    }else{
      this.setState({name:e})
    }
  }

  changeName = (e) => {
    this.setState({ qipao: false })
    if(e!==''){
      if (/[\u4E00-\u9FA5]/g.test(e)) {
        Toast.fail('用户名只能包含数字、字母、数字+字母', 2);
      }else if( /[^a-zA-Z0-9]/g.test(e)){
        Toast.fail('用户名只能包含数字、字母、数字+字母', 2);
      }else if(e.length<4){
        Toast.fail('用户名至少输入4位', 2);
      }else{this.getIsUserName({ name: e })}
    }else{
      Toast.fail('请输入用户名', 2);
    }
  }
  changePhone = (e) => {
    this.setState({ phone: e })
  }
  changeCode = (e) => {
    this.setState({ code: e })
  }
  changePassword = (e) => {
    this.setState({ password: e })
  }
  changePasswordT = (e) => {
    this.setState({ passwordT: e })
  }
  changeRadio = e => {
    this.setState({ changeRadio: e.target.checked })
  }

  async Ko(data) {
    const res = await _register(data)
    if (res.data.code === 2000) {
      setTimeout(() => {
        this.setState({
          visible: true,
        });
      }, 1000)
      localStorage.setItem('uuid', res.data.data.venueloginuuid);
      localStorage.setItem('venue_token', res.data.data.token);
      localStorage.setItem('name', res.data.data.name);
      sessionStorage.removeItem('register')
    } else {
      Toast.fail(res.data.msg, 1);
    }


  }

  async nacode(data) {
    const res = await _code(data)
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
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
    this.nacode({ "mobile": this.state.phone.replace(/\s*/g,""), "type": 'venueregister' })
  }
  showModal = e => {
    if(/^[^\s]*$/.test(this.state.password)===false){
      Toast.fail('密码输入有误', 1);
    }else  if(/^[^\s]*$/.test(this.state.passwordT)===false){
      Toast.fail('密码输入有误', 1);
    }else if (this.state.changeRadio !== true) {
      Toast.fail('请勾选阅读协议', 1);
    } else if (this.state.password !== this.state.passwordT) {
      Toast.fail('两次密码输入不一致', 1);
    } else {
      const { Id, name, phone, code, password } = this.state
      const data = { name: name, phone: phone.replace(/\s*/g,""), pass: password, promoteid: Id, code: code, Logintype: 'mobile' }
      this.Ko(data)
    }
  }

  async getPromoteName(data) {
    const res = await getPromoteName(data)
    if (res.data.code === 2000) {
    } else {
      this.setState({Id:''})
      Toast.fail(res.data.msg, 1);
    }
  }

  alertTwo = () => {
  
  }

  IdBuler=()=>{
    if(this.state.Id!==''){
      this.getPromoteName({promotid:this.state.Id})
    }
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

  reture = () => {
    this.props.history.goBack()
  }

  closeWeb=()=>{
  if(window.location.href.indexOf('flag=1')===-1){
    this.props.history.push('/phone')
     this.setState({visible:false})
  }else{
    this.close()
  }
}
eyes=()=>{
  this.setState({eyes:!this.state.eyes})
}
eyesTwo=()=>{
  this.setState({eyesTwo:!this.state.eyesTwo})
}
Agreement=()=>{
  setTimeout(()=>{
    let {Id,name,phone,code,password,passwordT,changeRadio,idName}=this.state
    let data={
      Id:Id,
      name:name,
      phone:phone,
      code:code,
      password:password,
      passwordT:passwordT,
      changeRadio:changeRadio,
      idName:idName
    }
    let h=JSON.stringify(data)
    sessionStorage.setItem('register',h)
    this.props.history.push('/Agreement')
  },1000)
}

  render() {
    return (
      <div className="registerPh">
          <NavBar
            mode="dark"
            icon={<LeftOutlined onClick={this.reture} />}
            rightContent={<Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              onSelect={this.closeWeb}
              overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1')===-1?'返回官网':'关闭'}</Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
            
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
              }}
              >
              <EllipsisOutlined />
              </div>
            </Popover>}
          ><span style={{ fontSize: '1rem' }}>新用户注册</span></NavBar>
        <div className="bossInput">
          <div className="input">
            <InputItem
              type='number'
              placeholder="请填写推广员ID号，没有可不填"
              clear={false}
              style={{ fontSize: '0.8rem' }}
              maxLength={6} 
              value={this.state.Id}
              onChange={this.changID}
              onBlur={this.IdBuler}
              autoFocus
            >
              {/* <CreditCardOutlined style={{ color: 'rgba(0,0,0,.25)' }} /> */}
            </InputItem>
          </div>

          <div className="input">
            <InputItem
              type='text'
              placeholder="用户名只能包含数字、字母、数字+字母"
              clear={false}
              style={{ fontSize: '0.8rem'}}
              value={this.state.name}
              onChange={this.changeNameKo}
              onBlur={this.changeName}
              maxLength={15}
            >
            </InputItem>
          </div>

          <div className="input">
            <InputItem
              type='phone'
              placeholder="操作员手机号"
              clear={false}
              style={{ fontSize: '0.8rem' }}
              onChange={this.changePhone}
              value={this.state.phone}
            >
            </InputItem>
          </div>

          <div className="input">
            <InputItem
              type='number'
              placeholder="手机验证码"
              clear={true}
              style={{ fontSize: '0.8rem' }}
              className="codeInput"
              maxLength={6}
              onChange={this.changeCode}
              value={this.state.code}
            >
              {/* <Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} /> */}
            </InputItem>
            <div className="codeBtn" onClick={this.state.textT === '获取验证码' ? this.naCode : ''} >{this.state.textT}</div>
          </div>

          <div className="input" style={{opacity:'0',position:'absolute',zIndex:'-1'}}>
            <InputItem type='text'></InputItem>
          </div>
          <div className="input" style={{opacity:'0',position:'absolute',zIndex:'-1'}}>
            <InputItem type='password'></InputItem>
          </div>


          <div className="input" >
            <InputItem
              type={this.state.eyes===true?'text':'password'}
              placeholder="密码"
              clear={true}
              style={{ fontSize: '0.8rem' }}
              onChange={this.changePassword}
              value={this.state.password}
              maxLength={15}
            >
               
            </InputItem>
            <span style={{display:'block',width:'15%',float:'right',marginTop:'0.7rem'}} onClick={this.eyes}><img src={require('../../assets/eyes.png')} style={this.state.eyes===true?{width:'1.13rem',height:'0.81rem',marginLeft:'1rem'}:{display:'none'}} alt="eyes"/> <img src={require('../../assets/eyesTwo.png')} style={this.state.eyes===true?{display:'none'}:{width:'1.13rem',height:'0.81rem',marginLeft:'1rem'}} alt="eyes"/></span>
          </div>
          <div className="input">
            <InputItem
              type={this.state.eyesTwo===true?'text':'password'}
              placeholder="确认密码"
              clear={true}
              style={{ fontSize: '0.8rem' }}
              onChange={this.changePasswordT}
              value={this.state.passwordT}
              maxLength={15}
            >
            </InputItem>
            <span style={{display:'block',width:'15%',float:'right',marginTop:'0.7rem'}} onClick={this.eyesTwo}><img src={require('../../assets/eyes.png')} style={this.state.eyesTwo===true?{width:'1.13rem',height:'0.81rem',marginLeft:'1rem'}:{display:'none'}} alt="eyes"/> <img src={require('../../assets/eyesTwo.png')} style={this.state.eyesTwo===true?{display:'none'}:{width:'1.13rem',height:'0.81rem',marginLeft:'1rem'}} alt="eyes"/></span>
          </div>
          <div className="input line">
            <Checkbox onChange={this.changeRadio} checked={this.state.changeRadio}><span style={{ fontSize: '0.9rem',paddingLeft:'1rem', }}>已阅读并同意</span></Checkbox><span onClick={this.Agreement} style={{ color: '#D85D27', paddingLeft: '0.5rem', fontSize: '0.9rem' }}>《场馆入驻协议》</span>
          </div>
          <div className="input line">
            <Button
              className="btn"
              onClick={this.showModal}
            >
              注册
             </Button>

          </div>
          <Modal
            title="注册结果"
            cancelText=''
            closable={false}
            visible={this.state.visible}
            transparent
            maskClosable={false}
            footer={[{ text: '下一步', onPress: () => { this.props.history.push('/stadiumInformationPh') } }]}
            width='100%'
          >
            <img className="logoRegister" src={require("../../assets/icon_pc.png")} alt="ico" />
            <span className="modelTitlePh">恭喜您，注册成功</span>
            <span className="modelPhonePh">用户名:{this.state.name}</span>
          </Modal>
        </div>
      </div>
    );
  }
}

export default registerPh;