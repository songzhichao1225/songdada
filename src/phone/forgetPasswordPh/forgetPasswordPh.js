import React from 'react';
import './forgetPasswordPh.css';

import { Toast, InputItem, NavBar, Popover } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { _code, VenueForgetPass } from '../../api';
import { Radio } from 'antd';
import {LeftOutlined,EllipsisOutlined} from '@ant-design/icons';
const Item = Popover.Item;

class forgetPasswordPh extends React.Component {

  state = {
    textT: '获取验证码',
    selectVeun: [],
    phone: '',
    value: '',
    code: '',
    pass: '',
    passTwo: '',
  }

  componentDidMount() {

  }






  phoneChange = e => {
    this.setState({ phone: e.replace(/\s*/g,"") })
  }
  async nacode(data) {
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
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }
  naCode = () => {
    if (this.state.phone !== ''&&(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.state.phone))) {
      this.nacode({ "mobile": this.state.phone, "type": 'venueforgetpass' })
    } else {
      Toast.fail('请输入手机号', 1)
    }
  } 
  onChange = e => {
    this.setState({ value: e })
  }
  code = e => {
    this.setState({ code: e })
  }
  pass = e => {
    this.setState({ pass: e })
  }
  passTwo = e => {
    this.setState({ passTwo: e })
  }

  async VenueForgetPass(data) {
    const res = await VenueForgetPass(data)
    if (res.data.code === 2000) {
      Toast.success('密码修改成功', 1)
      this.props.history.goBack()
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }
  comfir = () => {
    let { phone, value, code, pass, passTwo } = this.state
    if(phone===''){
      Toast.fail('请输入操作员手机号', 1)
    }else if(code===''){
      Toast.fail('请输入验证码', 1)
    }else if(pass===''){
      Toast.fail('请输入密码', 1)
    }else if(passTwo===''){
      Toast.fail('请确认密码', 1)
    }else if(/^[^\s]*$/.test(this.state.pass)===false){
      Toast.fail('密码输入有误', 1)
      }else if(/^[^\s]*$/.test(this.state.passTwo)===false){
        Toast.fail('密码输入有误', 1)
      }else if (pass === passTwo) {
      this.VenueForgetPass({ phone: phone, pass: passTwo, code: code, venueloginuuid: value })
    }
  }

 
 
  reture = () => { 
    this.props.history.goBack()
  }


  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')                        
      this.setState({ visible: false })
    } else {
      this.close()
    }
  }


  render() {
    return (
      <div className="forgetPasswordPh">
        <NavBar
          mode="dark"
          icon={<LeftOutlined  onTouchStart={this.reture} />}
          rightContent={<Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            onSelect={this.closeWeb}
            overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1') === -1 ? '返回官网' : '关闭'}</Item>),
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
        ><span style={{ fontSize: '1rem' }}>忘记密码</span></NavBar>
        <div className="boss">
          <div className="name">

            <InputItem
              type='phone'
              placeholder="操作员手机号"
              clear={true}
              style={{ fontSize: '0.8rem' }}
              onChange={this.phoneChange}
              autoFocus
              className="phone"
            >
            </InputItem>
          </div>

          <div className="name">

            <InputItem
              type='number'
              placeholder="手机验证码"
              clear={true}
              style={{ fontSize: '0.8rem' }}
              onChange={this.code}
              className="phone"
              maxLength={6}
            >
            </InputItem>
            <div className={this.state.textT === '获取验证码' ? 'obtain' : 'koohidden'} onTouchStart={this.naCode} >
              {this.state.textT}
            </div>
            <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtain'} >
              {this.state.textT}
            </div>
          </div>

          <div className={this.state.selectVeun.length > 0 ? 'name' : 'koohidden'}>
            <Radio.Group className="radio" onChange={this.onChange} value={this.state.value}>

              {
                this.state.selectVeun.map((item, i) => (
                  <Radio key={i} value={item.venueloginuuid}>{item.name}</Radio>
                ))
              }

            </Radio.Group>
          </div>

          <div className="name" style={{opacity:'0',position:'absolute',zIndex:-9}}>
            <InputItem type='text'></InputItem>
          </div>

          <div className="name" style={{opacity:'0',position:'absolute',zIndex:-9}}>
            <InputItem type='password'></InputItem>
          </div>



          <div className="name">
            <InputItem
              type='password'
              placeholder="请输入密码"
              clear={true}
              style={{ fontSize: '0.8rem' }}
              onChange={this.pass}
              className="phone"
              maxLength={15}
            >
            </InputItem>
          </div>

          <div className="name">
            <InputItem
              type='password'
              placeholder="请确认密码"
              clear={true}
              style={{ fontSize: '0.8rem' }}
              onChange={this.passTwo}
              className="phone"
              maxLength={15}
            >
            </InputItem>
          </div>
          <div className="btn" onTouchStart={this.comfir}>确定</div>



        </div>
      </div>
    );
  }
}

export default forgetPasswordPh;