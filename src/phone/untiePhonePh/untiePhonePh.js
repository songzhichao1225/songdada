import React from 'react';
import './untiePhonePh.css';

import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { _code, VenueBindingPhone, gerVenueName } from '../../api';


class untiePhonePh extends React.Component {

  state = {
    textT: '获取验证码',
    textTwo: '获取验证码',
    phone: localStorage.getItem('legalphone'),
    phoneTwo: '',
    codeOne: '',
    codeTwo: '',
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, localStorage.getItem('venue_token'))
    if(res.data.code===2000) {
      localStorage.setItem('phone', res.data.data.phone)
      localStorage.setItem('legalphone',res.data.data.legalphone)
    }
  }


  componentDidMount() {
    this.gerVenueName()
  }

  phone = (e) => {
    this.setState({ phone: localStorage.getItem('legalphone') })
  }
  phoneTwo = e => {
    this.setState({ phoneTwo: e.target.value })
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

  async nacodeTwo(data) {
    const res = await _code(data)
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textTwo: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textTwo: '获取验证码' })
        }
      }, 1000)
    }
  }

  nacodeOne = () => {
    this.nacode({ "mobile": this.state.phone, "type": 'venuebindingfr', uuid: localStorage.getItem('uuid') })
  }
  nacodeTwoT = () => {
    this.nacodeTwo({ "mobile": this.state.phoneTwo, "type": 'venuebindingczy' })
  }
  codeOne = e => {
    this.setState({ codeOne: e.target.value })
  }
  codeTwo = e => {
    this.setState({ codeTwo: e.target.value })
  }

  async VenueBindingPhone(data) {
    const res = await VenueBindingPhone(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1)
      this.props.history.goBack()
    } else {
      Toast.fail(res.data.msg, 1)
    }


  }


  submit = () => {
    let { phone, phoneTwo, codeOne, codeTwo } = this.state
    this.VenueBindingPhone({ legalphone: phone, legalcode: codeOne, operatorphone: phoneTwo, operatorcode: codeTwo })
  }

  reture = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="untiePhonePh">
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />解除绑定手机号</div>
        <div className="listSon">
          <Input maxLength={11} onChange={this.phone} value={localStorage.getItem('legalphone')} disabled={true} placeholder="请输入法人手机号" />
        </div>
        <div className="listSon">
          <Input maxLength={11} placeholder="请输入验证码" onChange={this.codeOne} /><span onClick={this.state.textT === '获取验证码' ? this.nacodeOne : this.ko}>{this.state.textT}</span>
        </div>
        <div className="listSon">
          <div style={{ paddingLeft: '0.5rem' }}>操作员手机号：{localStorage.getItem('phone')}</div>
        </div>
        <div className="listSon">
          <Input maxLength={11} onChange={this.phoneTwo} placeholder="请输入操作员新手机号" />
        </div>

        <div className="listSon">
          <Input maxLength={11} placeholder="请输入验证码" onChange={this.codeTwo} /><span onClick={this.state.textTwo === '获取验证码' ? this.nacodeTwoT : this.ko}>{this.state.textTwo}</span>
        </div>
        <div className="btn" onClick={this.submit}>提交</div>
      </div>
    )
  }
}

export default untiePhonePh;